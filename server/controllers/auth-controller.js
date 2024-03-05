const user = require("../models/user-model");
const nodemailer = require('nodemailer');

const register = async (req, res) => {
    try {
        const data = req.body;
        const isUserExist = await user.findOne({ email: data.email });
        console.log(data);
        if (isUserExist) {
            res.status(400).json({ message: "email is already exist" });
        } else {
            const createUser = await user.create({
                name: data.name,
                email: data.email,
                password: data.password,
                isVerified: data.isOtpVerify
            });
            res.status(201).json({
                msg: "Registration successful",
                token: await createUser.generateToken(),
                userID: createUser._id.toString(),
            });
        }
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        // const generateOTP = () => {
        //     const digits = '0123456789';
        //     let otp = '';

        //     for (let i = 0; i < 6; i++) {
        //         const randomIndex = Math.floor(Math.random() * digits.length);
        //         otp += digits.charAt(randomIndex);
        //     }

        //     return otp;
        // }
        // const otp1 = generateOTP();
        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'dharmendra763297@gmail.com',
        //         pass: 'yrothzlkanaffqhf'
        //     }
        // });

        // let mailOptions = {
        //     from: 'dharmendra763297@gmail.com',
        //     to: data.email,
        //     subject: 'Admin Panel',
        //     text: `Your OTP is: ${otp1}`
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Mail sent successfully")
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
        res.status(201).json({ message: data });
    } catch (error) {
        res.status(500).json({ message: "errors in verify otp" });
    }
}

const sendOtp = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const generateOTP = () => {
            const digits = '0123456789';
            let otp = '';

            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * digits.length);
                otp += digits.charAt(randomIndex);
            }

            return otp;
        }
        const otp1 = generateOTP();
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dharmendra763297@gmail.com',
                pass: 'xmhnaaodrnlnrcym'
            }
        });

        let mailOptions = {
            from: 'dharmendra763297@gmail.com',
            to: data.email,
            subject: 'Welcome to the I2IT confession Page',
            text: `Your OTP is: ${otp1}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.status(201).json({ otp: otp1 })
            }
        });
    } catch (error) {
        console.log("Error in sending otp: ");
        res.status(500).json({ message: "Error in sending otp:" });
    }
}
module.exports = { register, verifyOtp, sendOtp };