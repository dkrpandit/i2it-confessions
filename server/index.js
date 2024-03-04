require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./utils/db");
const router = require("./router/auth-router");


app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;

connection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})