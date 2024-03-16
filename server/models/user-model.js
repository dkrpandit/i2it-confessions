const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
})

/**
 * hash the password before saving to the database
 * @param {function} next - a function to call after the password is hashed
 */
userSchema.pre("save", async function (next) {

    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const setRound = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(user.password, setRound)
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// compare password 
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);

}

// carate jwt
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email,
            isVerified: this.isVerified
        },
            process.env.JWT_SECRETE_KEY,
            {
                expiresIn: "30d"
            }
        )
    } catch (error) {
        next(error);
    }
}

const user = new mongoose.model("USER", userSchema);
module.exports = user;