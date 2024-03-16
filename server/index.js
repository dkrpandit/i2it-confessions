require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const connection = require("./utils/db");
const router = require("./router/auth-router");

const errorMiddleware = require("./middleware/error-middleware")

app.use(express.json());
app.use(router);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

// handling cors polices
const corsOptions = {
    origin: "https://i2it-confessions-6dhi.vercel.app",
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    Credential: true
}
app.use(cors(corsOptions))

connection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})