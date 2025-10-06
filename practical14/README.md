# Job Portal Resume Upload

A secure Express.js application for uploading resumes with strict file validation.

## Features

- **Secure File Upload**: Only accepts PDF files up to 2MB
- **Real-time Validation**: Client and server-side validation
- **Drag & Drop Interface**: Modern, user-friendly upload interface
- **Resume Management**: View and download uploaded resumes
- **Error Handling**: Comprehensive error messages for different scenarios

## Security Features

- File type validation (PDF only)
- File size limit (2MB maximum)
- Unique filename generation to prevent conflicts
- Server-side validation to prevent bypassing client restrictions

## Installation

1. Navigate to the task-14 directory:
   ```bash
   cd task-14
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and visit: `http://localhost:3000`

## API Endpoints

- `GET /` - Main upload interface
- `POST /upload-resume` - Upload resume file
- `GET /resumes` - List all uploaded resumes
- `GET /download/:filename` - Download specific resume
- `GET /health` - Health check endpoint

## File Validation Rules

- **File Type**: Only PDF files (.pdf) are accepted
- **File Size**: Maximum 2MB (2,097,152 bytes)
- **File Storage**: Files are stored in the `uploads/` directory with timestamped names

## Error Handling

The application handles various error scenarios:

- Invalid file type (non-PDF files)
- Files exceeding size limit
- Missing file uploads
- Server errors
- File not found errors

## Usage

1. **Upload Resume**: 
   - Click "Choose File" or drag & drop a PDF file
   - File must be under 2MB
   - Only PDF format accepted

2. **View Uploaded Resumes**:
   - See list of all uploaded resumes
   - View file size and upload date
   - Download resumes directly

3. **Error Messages**:
   - Clear feedback for validation errors
   - Success confirmation on successful uploads

## Technologies Used

- **Backend**: Express.js, Multer for file uploads
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **File Handling**: Node.js fs module
- **Validation**: Custom file filters and size limits

## Development

For development with auto-restart:
```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.