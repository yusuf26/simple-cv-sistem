// Import contact model
CV = require('../models/cvModel');
var dateFormat = require("dateformat");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER_NAME,
    pass: process.env.GMAIL_USER_PASSWORD
  }
});

// Handle index actions
// Handle create contact actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Data retrieved successfully",
            data: contacts
        });
    });
};

exports.new = function (req, res) {
    var cv_data = new CV();
    cv_data.first_name = req.body.first_name;
    cv_data.last_name = req.body.last_name;
    cv_data.email = req.body.email;
    cv_data.gender = req.body.gender;
    cv_data.mobile_phone = req.body.mobile_phone;
    cv_data.birth_date = req.body.birth_date;
    cv_data.position = req.body.position;
    cv_data.expected_salary = req.body.expected_salary;
    cv_data.previous_salary = req.body.previous_salary;
    cv_data.location = req.body.location;
    cv_data.refferal_by = req.body.refferal_by;

// save the contact and check for errors
    cv_data.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New Data created!',
            data: cv_data
        });
    });
    var new_date = dateFormat(cv_data.birth_date, "dd mmmm yyyy");
    var dataCV =    '<h3>New Candidate Added</h3>'+
                    '<table width="100%" border="1" cellpadding="2">'+
                        '<tr>'+
                            '<th width="40%">First Name</th><td>'+cv_data.first_name+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>last Name</th><td>'+cv_data.last_name+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Gender</th><td>'+cv_data.gender+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Email</th><td>'+cv_data.email+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Mobile Phone</th><td>'+cv_data.mobile_phone+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Birth Date</th><td>'+new_date+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Position</th><td>'+cv_data.position+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Expected Salary</th><td>'+cv_data.expected_salary+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Previous Salary</th><td>'+cv_data.previous_salary+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Location</th><td>'+cv_data.location+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Refferal By</th><td>'+cv_data.refferal_by+'</td>'+
                        '</tr>'+
                    '</table>'
    

    if(process.env.GMAIL_USER_NAME !== ''){
        var mailOptions = {
            from: 'cupjul@gmail.com',
            to: 'hamdadiyusuf@gmail.com',
            subject: 'New Candidate Added',
            html: dataCV
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
    
};