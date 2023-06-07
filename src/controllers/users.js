const { hashPassword, comparePassword } = require("../helpers/users");
const { User } = require("../models/user");
const jwt = require('jsonwebtoken');


//Generate Token
exports.generateToken = (req, res) => {
    try {
        const token = jwt.sign('hello', process.env.JWT_KEY);
        res.status(200).json({ maasage: 'Token has been Created!😊', token })
    } catch (error) {
        console.log(error)
    }
}


//User Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.json({ massage: 'name is required' })
        }
        if (!email) {
            return res.json({ massage: 'email is required' })
        }
        if (!password) {
            return res.json({ massage: 'password is required' })
        }
        if (password.length < 6) {
            return res.json({ massage: 'Password must be at least 6 characters' })
        }

        const exitingEmail = await User.findOne({ email });

        if (exitingEmail) {
            return res.json({ massage: 'Email is taken' })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY, {
            expiresIn: '24h',
        });

        res.status(201).json({
            status: 'success',
            massage: `Hello ${name}! Your account has been Created!😊😊😊`,
            Data: newUser,
            token
        })

    } catch (error) {
        res.json({ massage: error.massage, massage: '😒' })
        console.log(error)
    }
};


//User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.json({ massage: 'Email is required' })
        }
        if (!password) {
            return res.json({ massage: 'password is required' })
        }
        if (password.length < 6) {
            return res.json({ massage: 'Password must be at least 6 characters' })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ massage: 'User not found' })
        };

        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.json({ massage: 'Invalid Email Or Password' })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: '24h',
        });

        res.status(200).json({ status: 'success', massage: 'Login Success', token })

    } catch (error) {
        res.status(200).json({ massage: error.massage })
        console.log(Error)
    }
};









