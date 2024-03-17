require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./utils/db");
const router = require("./router/auth-router");

const errorMiddleware = require("./middleware/error-middleware");

// handling cors polices
const corsOptions = {
    origin: "",
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(router);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

connection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
