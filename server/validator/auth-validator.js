const { z } = require("zod");


// Creating an object Schema for registration form
const signupSchema = z.object({
    username: z
        .string({ reportError: "Username is required" })
        .trim()
        .min(3, { message: "Username should be at least 3 characters long" })
        .max(15, { message: "Username should be less than 15 characters long" }),
    email: z
        .string({ reportError: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email should be at least 3 characters long" })
        .max(30, { message: "Email should be less than 30 characters long" }),
    phone: z
        .string({ reportError: "Phone is required" })
        .trim()
        .min(10, { message: "Phone number should be at least 10 characters long" })
        .max(20, { message: "Phone number should be less than 20 characters long" }),
    password: z
        .string({ reportError: "Password is required" })
        .min(5, { message: "Password should be at least 5 characters long" })
        .max(25, { message: "Password should be less than 25 characters long" }),
});

module.exports = signupSchema;