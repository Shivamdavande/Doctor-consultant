// routes/auth.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../modal/Doctor');
const Patient = require('../modal/Patient');
const passport = require('passport');

// 🔐 Function to Generate JWT Token
const signToken = (id, type) => {
    return jwt.sign(
        { id, type },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};


// =======================
// 🩺 DOCTOR REGISTER
// =======================
router.post(
    '/doctor/register',
    [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Valid email is required').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    validate,
    async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if doctor already exists
            const exists = await Doctor.findOne({ email });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Doctor with this email already exists',
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create doctor
            const doctor = await Doctor.create({
                name,
                email,
                password: hashedPassword,
                isVerified: true,
            });

            // Generate token
            const token = signToken(doctor._id, 'doctor');

            res.status(201).json({
                success: true,
                message: 'Doctor registered successfully',
                token,
                user: {
                    id: doctor._id,
                    name: doctor.name,
                    email: doctor.email,
                    type: 'doctor',
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Doctor registration failed',
                error: error.message,
            });
        }
    }
);


// =======================
// 🩺 DOCTOR LOGIN
// =======================
router.post(
    '/doctor/login',
    [
        body('email', 'Valid email is required').isEmail(),
        body('password', 'Password is required').notEmpty(),
    ],
    validate,
    async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find doctor
            const doctor = await Doctor.findOne({ email });
            if (!doctor) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            // Generate token
            const token = signToken(doctor._id, 'doctor');

            res.status(200).json({
                success: true,
                message: 'Doctor login successful',
                token,
                user: {
                    id: doctor._id,
                    name: doctor.name,
                    email: doctor.email,
                    type: 'doctor',
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Doctor login failed',
                error: error.message,
            });
        }
    }
);


// =======================
// 👤 PATIENT REGISTER
// =======================
router.post(
    '/patient/register',
    [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Valid email is required').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    validate,
    async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if patient already exists
            const exists = await Patient.findOne({ email });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Patient with this email already exists',
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create patient
            const patient = await Patient.create({
                name,
                email,
                password: hashedPassword,
                isVerified: true,
            });

            // Generate token
            const token = signToken(patient._id, 'patient');

            res.status(201).json({
                success: true,
                message: 'Patient registered successfully',
                token,
                user: {
                    id: patient._id,
                    name: patient.name,
                    email: patient.email,
                    type: 'patient',
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Patient registration failed',
                error: error.message,
            });
        }
    }
);


// =======================
// 👤 PATIENT LOGIN
// =======================
router.post(
    '/patient/login',
    [
        body('email', 'Valid email is required').isEmail(),
        body('password', 'Password is required').notEmpty(),
    ],
    validate,
    async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find patient
            const patient = await Patient.findOne({ email });
            if (!patient) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, patient.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            // Generate token
            const token = signToken(patient._id, 'patient');

            res.status(200).json({
                success: true,
                message: 'Patient login successful',
                token,
                user: {
                    id: patient._id,
                    name: patient.name,
                    email: patient.email,
                    type: 'patient',
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Patient login failed',
                error: error.message,
            });
        }
    }
);


// =======================
// 🌐 GOOGLE AUTH
// =======================

// Redirect to Google
router.get('/google', (req, res, next) => {
    const userType = req.query.state || 'patient';

    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: userType,
        prompt: 'select_account',
    })(req, res, next);
});

// Google Callback
router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/api/auth/failure',
    }),
    async (req, res) => {
        try {
            const { user, type } = req.user;

            const token = signToken(user._id, type);

            const frontendUrl =
                process.env.FRONTEND_URL || 'http://localhost:5173';

            const redirectUrl = `${frontendUrl}/auth-success?token=${token}&type=${type}&user=${encodeURIComponent(
                JSON.stringify({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profileImage: user.profileImage,
                })
            )}`;

            res.redirect(redirectUrl);
        } catch (error) {
            const frontendUrl =
                process.env.FRONTEND_URL || 'http://localhost:5173';

            res.redirect(
                `${frontendUrl}/auth/error?message=${encodeURIComponent(
                    error.message
                )}`
            );
        }
    }
);

// Auth Failure Route
router.get('/failure', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Google authentication failed',
    });
});

module.exports = router;