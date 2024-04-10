const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    messageSendAt: {
        type: Date,
        default: Date.now
    }
});

const confession = mongoose.model('Confession', confessionSchema);

module.exports = confession;
