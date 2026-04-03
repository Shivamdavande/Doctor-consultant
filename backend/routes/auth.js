
const router = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../modal/Doctor');
const Patient = require('../modal/Patient');



const router = express.Router();

const SignToken = (id, type) => {
    jwt.sign({ id, type }, process.env.JWT_SECRET, { expiresIn: '7d' })
}


router.post('/doctor/register',
    [
        body('name').notEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    validate,
    async (req, res) => {
        try {
            const exists = await Doctor.findOne({ email: req.body, email })
            if (exists) {
                return res.badRequest("Doctor with this email already exists")
            }
            const hashed = await bcrypt.hash(req.body.password, 10);

            const doctor = await Doctor.create({
                ...req.body,
                password: hashed,
                 isVerified: true
            })

            const token = SignToken(doctor._id, 'doctor');

            res.created({ token, user: { id: doc._id, type: 'doctor' } }, 'Doctor registered successfully')
        } catch (error) {
            res.serverError('Register failedr', [error.message])
        }
    }
)



router.post('/doctor/login',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    validate,
    async (req, res) => {
        try {
            const doc = await Doctor.findOne({ email: req.body, email })
            if (!doc || !doc.password) {
                return res.unauthorized("Invalid credentials")
            }
            const match = await bcrypt.compare(req.body.password, doc.password);
            if (!match) {
                return res.unauthorized("Invalid credentials")
            }
            const token = SignToken(doctor._id, 'doctor');

            res.created({ token, user: { id: doctor._id, type: 'doctor' } }, 'Doctor login successfully')
        } catch (error) {
            res.serverError('Login failed', [error.message])
        }
    }
)



router.post('/patient/register',
    [
        body('name').notEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    validate,
    async (req, res) => {
        try {
            const exists = await Patient.findOne({ email: req.body, email })
            if (exists) {
                return res.badRequest("patient with this email already exists")
            }
            const hashed = await bcrypt.hash(req.body.password, 10);

            const doctor = await Patient.create({
                ...req.body,
                password: hashed,
                 isVerified: true
            })

            const token = SignToken(patient._id, 'patient');

            res.created({ token, user: { id: patient._id, type: 'patient' } }, 'patient registered successfully')
        } catch (error) {
            res.serverError('Register failedr', [error.message])
        }
    }
)



router.post('/patient/login', 
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    validate,
    async (req, res) => {
        try {
            const patient = await Patient.findOne({email: req.body,email})
            if (!patient || !patient.password) {
                return res.unauthorized("Invalid credentials")
            }
            const match = await bcrypt.compare(req.body.password, patient.password);
            if (!match) {
                return res.unauthorized("Invalid credentials")
            }
            const token = SignToken(patient._id, 'patient');

            res.created({token, user: {id:patient._id, type:'patient'}},'patient login successfully')
        } catch (error) {
            res.serverError('Login failed', [error.message])
        }
    }
 )