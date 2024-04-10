const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("connection is successfully")
    } catch (error) {
        console.error("connection is failed")
        process.exit(0);
    }
}

module.exports = connectDB;