const { z } = require("zod");

const postSchema = z.object({
    name: z
        .string({ reportError: "Name is required" })
        .min(3, { message: "Name should be at least 3 characters long" })
        .max(15, { message: "Name should be less than 15 characters long" }),
    branch: z
        .string({ reportError: "branch is required" }),
    year: z
        .string({ reportError: "Password is required" }),
    confession: z
        .string({ reportError: "confession is required" })
        .min(50, { message: "confessions should be at least 50 characters long" })
        .max(1001, { message: "Email should be less than 1001 characters long" }),
});

module.exports = postSchema;