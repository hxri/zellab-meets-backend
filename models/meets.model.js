const mongoose = require('mongoose');

const MeetSchema = mongoose.Schema({
    title: String,
    content: String,
    room: String,
    start: String,
    end: String,
    host: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Meet', MeetSchema);