const user = require("../models/user-model");

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


module.exports = register;