const user = require("../models/user-model");
const confession = require("../models/confession-model");
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

const confessionMessage = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const confessionMessage = await confession.create({
            name: data.name,
            branch: data.branch,
            year: data.year,
            message: data.confession
        });

        res.status(201).json({
            msg: "Successfully posted your confession",
            confession: confessionMessage  // Optionally include the created confession in the response
        });
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const verifyOtp = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        res.status(201).json({ message: data });
    } catch (error) {
        res.status(500).json({ message: "errors in verify otp" });
    }
}

const sendOtp = async (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
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
                pass: 'jsbxgzmoufgszzok'
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
                res.status(500).json({ message: "Error sending mail" });
            } else {
                res.status(201).json({
                    otp: otp1,
                    message: "OTP sent successfully",
                })
            }
        });
    } catch (error) {
        console.log("Error in sending otp: ");
        res.status(500).json({ message: "Error in sending otp:" });
    }
}
module.exports = { register, verifyOtp, sendOtp, confessionMessage };