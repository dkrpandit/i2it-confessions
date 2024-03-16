const user = require("../models/user-model");
const confession = require("../models/confession-model");
const nodemailer = require('nodemailer');

const register = async (req, res) => {
    try {
        const data = req.body;

        // Check for both email and username uniqueness in a single query
        const existingUser = await user.findOne({
            $or: [{ email: data.email }, { username: data.username }]
        });

        if (existingUser) {
            const isEmailConflict = existingUser.email === data.email;
            const message = isEmailConflict
                ? "Email is already in use"
                : "Username is already taken";
            res.status(400).json({ message });
        } else {
            const createUser = await user.create({
                username: data.username,
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
        // console.log(data);
        const confessionMessage = await confession.create({
            name: data.name,
            branch: data.branch,
            year: data.year,
            message: data.confession
        });

        res.status(201).json({
            message: "Successfully posted your confession",
        });
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getConfessions = async (req, res) => {
    try {
        const response = await confession.find();
        console.log(response);
        if (!response) {
            return res.status(404).json({ message: "errors to load confessions" })
        }
        return res.status(200).json( response )
    } catch (error) {
        console.log(`errors ${error}`);
    }
}

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

const login = async (req, res) => {
    try {
        const data = req.body;
        const userExist = await user.findOne({ email: data.email });
        // console.log(!userExist);

        if (!userExist) {
            return res.status(400).json({ message: "invalid credential" });
        }
        // const isPasswordValid = await bcrypt.compare(data.password, userExist.password);
        const isPasswordValid = await userExist.comparePassword(data.password);

        if (isPasswordValid) {
            res.status(200).json({
                message: "login successful",
                token: await userExist.generateToken(),
                userID: userExist._id.toString()
            });
        } else {
            res.status(400).json({ message: "invalid credential" })
        }
    } catch (error) {
        res.status(400).json({ message: "page not found" });
        // next(error);
    }
}
module.exports = { register, verifyOtp, sendOtp, confessionMessage,login ,getConfessions};