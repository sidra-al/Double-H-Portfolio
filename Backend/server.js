const express = require('express');
const app = express();
const projectRoutes = require('./Routes/project.route');
const authRoutes = require('./Routes/auth.route');
const partnersRoutes = require('./Routes/partners.route');
const heroRoutes = require('./Routes/hero.route');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');

// CORS Configuration - Production safe
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman, or server-to-server)
        if (!origin) return callback(null, true);
        
        // Normalize origin (remove trailing slash and protocol variations)
        const normalizedOrigin = origin.replace(/\/$/, '').toLowerCase();
        
        // Allowed origins - only domain names, no paths
        const allowedOrigins = [
            'https://double-h-portfolio-tvgh.vercel.app',
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000'
        ];
        
        // Normalize allowed origins
        const normalizedAllowed = allowedOrigins.map(o => o.replace(/\/$/, '').toLowerCase());
        
        // Check if exact match
        const isExactMatch = normalizedAllowed.includes(normalizedOrigin);
        
        // Also allow any Vercel preview/deployment URLs (for preview deployments)
        const isVercelDomain = normalizedOrigin.includes('vercel.app') || 
                               normalizedOrigin.includes('vercel-dashboards.vercel.app');
        
        if (isExactMatch || isVercelDomain) {
            callback(null, true);
        } else {
            // Log for debugging
            if (process.env.NODE_ENV === 'development') {
                console.log('CORS: Allowing origin in development:', normalizedOrigin);
                callback(null, true);
            } else {
                console.warn('CORS: Blocked origin:', normalizedOrigin);
                callback(new Error(`CORS: Origin ${normalizedOrigin} not allowed`));
            }
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
    maxAge: 86400 // 24 hours
};

// Handle preflight OPTIONS requests explicitly BEFORE other middleware
app.options('*', cors(corsOptions));

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Body parsing middleware with increased limits for file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware to normalize URLs (remove double slashes)
app.use((req, res, next) => {
    // Fix double slashes in URL path
    if (req.url.includes('//')) {
        req.url = req.url.replace(/\/+/g, '/');
    }
    next();
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes - Ensure no double slashes
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/partners', partnersRoutes);
app.use('/api/v1/hero', heroRoutes);

// Catch-all for undefined routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        path: req.path,
        method: req.method
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Double H Portfolio API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/api/v1/health',
            projects: '/api/v1/projects',
            partners: '/api/v1/partners',
            hero: '/api/v1/hero',
            auth: '/api/v1/auth'
        }
    });
});

// Global error handler (must be after all routes)
app.use((err, req, res, next) => {
    // CORS errors
    if (err.message && err.message.includes('CORS')) {
        console.error('CORS Error:', {
            origin: req.headers.origin,
            method: req.method,
            url: req.url,
            message: err.message
        });
        return res.status(403).json({
            success: false,
            message: 'CORS: Origin not allowed',
            origin: req.headers.origin,
            allowedOrigins: [
                'https://double-h-portfolio-tvgh.vercel.app',
                '*.vercel.app (preview deployments)'
            ]
        });
    }
    
    // Other errors
    console.error('Server Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        url: req.url,
        method: req.method
    });
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Connect to database
connectDB();

// Start server only if not in Vercel serverless environment
if (process.env.VERCEL !== '1') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// Export app for Vercel serverless
module.exports = app;
