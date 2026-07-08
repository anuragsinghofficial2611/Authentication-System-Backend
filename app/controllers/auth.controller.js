const express = require('express')
const router = express.Router();
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        //receive data 
        const { name, email, password } = req.body;

        //check all data provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //checking if user already exist in database
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(409).json({
                message: "User already exist"
            })
        }

        //hashing password
        const hashedpassword = await bcrypt.hash(password, 10);

        //save user in database
        const user = await userModel.create({
            name,
            email,
            password: hashedpassword
        });

        res.status(201).json({
            data: user
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    } finally {

    }
}

const login = async (req, res) => {
    try {

        const { email,password } = req.body;
        if(!email || !password) return res.status(400).json({message: "email and password are required"})
        const user = await userModel.findOne({email});

        if (user) {
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(401).json({message:"Invalid Password"});

            const token = jwt.sign({
                id: user._id,
                email: user.email   
            },process.env.JWT_SECRET);
            res.status(200).json({
                success: true,
                token,
                user
            });
            
            


        } else {
            return res.status(404).json({
                message: "user not found"
            })
        }
    } catch(error) {
        return res.status(500).json({
            message: "Error Occured in server"
        })
    }
}

module.exports = { register,login }
