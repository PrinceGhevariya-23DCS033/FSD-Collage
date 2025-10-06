const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from public directory
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const timestamp = Date.now();
        const originalName = file.originalname.replace(/\s+/g, '_'); // Replace spaces with underscores
        cb(null, `resume_${timestamp}_${originalName}`);
    }
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
    // Check file extension
    if (file.mimetype === 'application/pdf' && path.extname(file.originalname).toLowerCase() === '.pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

// Configure multer with file size limit (2MB = 2 * 1024 * 1024 bytes)
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    },
    fileFilter: fileFilter
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Resume upload endpoint
app.post('/upload-resume', (req, res) => {
    const uploadSingle = upload.single('resume');
    
    uploadSingle(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err.message);
            
            // Handle different types of errors
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({
                        success: false,
                        message: 'File too large! Resume must be under 2MB.',
                        error: 'FILE_TOO_LARGE'
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'Upload error: ' + err.message,
                    error: 'UPLOAD_ERROR'
                });
            }
            
            // Custom file filter error
            if (err.message === 'Only PDF files are allowed!') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid file type! Only PDF files are accepted.',
                    error: 'INVALID_FILE_TYPE'
                });
            }
            
            // Generic error
            return res.status(500).json({
                success: false,
                message: 'Server error during file upload.',
                error: 'SERVER_ERROR'
            });
        }
        
        // No file uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded! Please select a resume to upload.',
                error: 'NO_FILE'
            });
        }
        
        // Successful upload
        res.json({
            success: true,
            message: 'Resume uploaded successfully!',
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: (req.file.size / 1024 / 1024).toFixed(2) + ' MB',
                uploadDate: new Date().toISOString()
            }
        });
    });
});

// Get list of uploaded resumes
app.get('/resumes', (req, res) => {
    try {
        const files = fs.readdirSync(uploadsDir);
        const resumeFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        
        const resumeList = resumeFiles.map(file => {
            const filePath = path.join(uploadsDir, file);
            const stats = fs.statSync(filePath);
            
            return {
                filename: file,
                size: (stats.size / 1024 / 1024).toFixed(2) + ' MB',
                uploadDate: stats.mtime.toISOString()
            };
        });
        
        res.json({
            success: true,
            count: resumeList.length,
            resumes: resumeList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving resume list.',
            error: 'SERVER_ERROR'
        });
    }
});

// Download resume endpoint
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            success: false,
            message: 'Resume not found.',
            error: 'FILE_NOT_FOUND'
        });
    }
    
    // Send file for download
    res.download(filePath, (err) => {
        if (err) {
            console.error('Download error:', err);
            res.status(500).json({
                success: false,
                message: 'Error downloading file.',
                error: 'DOWNLOAD_ERROR'
            });
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Job Portal Resume Upload Service is running!',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error.',
        error: 'SERVER_ERROR'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found.',
        error: 'NOT_FOUND'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Job Portal Resume Upload Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
    console.log(`📋 Accepted file types: PDF only`);
    console.log(`📏 Maximum file size: 2MB`);
});

module.exports = app;