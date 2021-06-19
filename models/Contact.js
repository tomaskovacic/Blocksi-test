const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstname: {
        type: String
    }, lastname: {
        type: String
    },number: {
        unique: true,
        type: String
    },
    userId: {
        type: String
    },
})

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;