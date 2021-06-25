// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var cvSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_phone: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    expected_salary: {
        type: String,
        required: true
    },
    previous_salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    refferal_by: {
        type: String,
        required: true
    },

});
// Export Contact model
var Contact = module.exports = mongoose.model('cv', cvSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}