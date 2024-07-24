require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/userModel');
const {generateToken} = require('../jwtToken')

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const signToken = (user) => {
  try {
    const { _id, name, email } = user;
    return jwt.sign({ _id, name, email }, process.env.JWT_SECRETKEY, { expiresIn: '7d' });
  } catch (err) {
    console.log(err);
    return null;
  }
};


const registerUser = async (req, res) => {
    try {
        const { firstName,lastName, email, password,confirmPassword } = req.body;

        if(!mailformat.test(email)) {
            return res.status(400).json({ msg: 'Invalid email' });
        }

        const user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
    
        const newUser = new User({ firstName,lastName, email, password: bcrypt.hashSync(password),confirmPassword: bcrypt.hashSync(confirmPassword)});
        await newUser.save();
        const token = generateToken(newUser);
        res.status(201).json({ token, msg: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, msg: 'User logged in successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    registerUser,
    loginUser
}