const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('./src/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret (In production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-in-production';

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { usersCollection } = await connectToDatabase();
        const { username, email, password, fullName } = req.body;

        // Input validation
        if (!username || !email || !password || !fullName) {
            return res.status(400).json({ 
                message: 'All fields are required: username, email, password, fullName' 
            });
        }

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: 'User with this email or username already exists' 
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = {
            username,
            email,
            password: hashedPassword,
            fullName,
            createdAt: new Date(),
            lastLogin: null
        };

        const result = await usersCollection.insertOne(newUser);

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: result.insertedId, 
                username, 
                email 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: result.insertedId,
                username,
                email,
                fullName
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { usersCollection } = await connectToDatabase();
        const { username, password } = req.body;

        // Input validation
        if (!username || !password) {
            return res.status(400).json({ 
                message: 'Username and password are required' 
            });
        }

        // Find user (allow login with username or email)
        const user = await usersCollection.findOne({ 
            $or: [{ username }, { email: username }] 
        });

        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid username or password' 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                message: 'Invalid username or password' 
            });
        }

        // Update last login
        await usersCollection.updateOne(
            { _id: user._id },
            { $set: { lastLogin: new Date() } }
        );

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id, 
                username: user.username, 
                email: user.email 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                lastLogin: user.lastLogin
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Get User Profile (Protected Route)
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const { usersCollection } = await connectToDatabase();
        const user = await usersCollection.findOne(
            { _id: req.user.userId },
            { projection: { password: 0 } } // Exclude password
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
});

// Get all users (Protected Route - for testing)
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const { usersCollection } = await connectToDatabase();
        const users = await usersCollection.find(
            {}, 
            { projection: { password: 0 } }
        ).toArray();

        res.json({ users });
    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({ message: 'Server error fetching users' });
    }
});

// Logout (Client-side token removal, but we can blacklist tokens if needed)
app.post('/api/logout', authenticateToken, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// === EXISTING ROUTES (Keep for backward compatibility) ===

// Get all data from MongoDB
app.get('/data', async (req, res) => {
    try {
        const { collection } = await connectToDatabase();
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Insert sample data into MongoDB
// app.post('/insert-sample', async (req, res) => {
//     try {
//         const { collection } = await connectToDatabase();
        
//         // Sample data for students
//         const sampleData = [
//             { name: 'John Doe', age: 20, course: 'Computer Science', grade: 'A' },
//             { name: 'Jane Smith', age: 19, course: 'Mathematics', grade: 'B+' },
//             { name: 'Bob Johnson', age: 21, course: 'Physics', grade: 'A-' },
//             { name: 'Alice Brown', age: 20, course: 'Chemistry', grade: 'B' }
//         ];

//         const result = await collection.insertMany(sampleData);
//         res.json({ 
//             message: 'Sample data inserted successfully!', 
//             insertedCount: result.insertedCount,
//             insertedIds: result.insertedIds 
//         });
//     } catch (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// Test route
// app.get('/api/test', (req, res) => {
//     res.json({ 
//         message: 'Authentication API is working!',
//         timestamp: new Date().toISOString()
//     });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Authentication Server running on port ${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    console.log('📋 Available endpoints:');
    console.log('   POST /api/register - User registration');
    console.log('   POST /api/login - User login');
    console.log('   GET  /api/profile - User profile (protected)');
    console.log('   GET  /api/users - All users (protected)');
    console.log('   POST /api/logout - User logout');
    
});