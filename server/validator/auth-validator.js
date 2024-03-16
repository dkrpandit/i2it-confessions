const { z } = require("zod");

const signupSchema = z.object({
    username: z
        .string({ reportError: "Username is required" })
        .trim()
        .min(3, { message: "Username should be at least 3 characters long" })
        .max(15, { message: "Username should be less than 15 characters long" })
        .refine((username) => !username.includes(' '), {
            message: "Username cannot contain spaces"
        }),
    email: z
        .string({ reportError: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email should be at least 3 characters long" })
        .max(100, { message: "Email should be less than 40 characters long" }),
    password: z
        .string({ reportError: "Password is required" })
        .min(5, { message: "Password should be at least 5 characters long" })
        .max(25, { message: "Password should be less than 25 characters long" })
        .refine((password) => !password.includes(' '), {
            message: "Password cannot contain spaces"
        }),
});

module.exports = signupSchema;