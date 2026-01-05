const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.schema');

dotenv.config();

const seedAdmin = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username: 'admin' });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Username: admin');
            console.log('To reset password, delete the user from database first.');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            username: 'admin',
            password: 'admin123', // Default password - change this after first login
            role: 'admin',
        });

        console.log('✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  Please change the password after first login!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();

