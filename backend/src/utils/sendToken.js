const Token = require('../models/Token');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
require('dotenv').config({path: ".env"});

module.exports =  function sendToken(email, entry, token, host) {
    if (entry == 'register') {
        var subj  = 'Token de verificação da conta';
        var msg   = 'verifique sua conta';
        var route = 'confirmation';

    } else if (entry == 'forget') {
        var subj  = 'Token de recuperação da senha';
        var msg   = 'recupere sua senha';
        var route = 'forget-token';
    }
    var transporter = nodemailer.createTransport({ 
        host: "smtp.gmail.com", 
        port: 465,
        auth: { 
            user: process.env.SENDGRID_USERNAME, 
            pass: process.env.SENDGRID_PASSWORD
        }, 
    });
    var mailOptions = { 
        from: process.env.APP_NAME, 
        to: email, 
        subject: subj, 
        html: "<p><b>Olá</b>, Por favor, "+msg+" clicando nesse link: <b>http://"+host+"/"+route+"/"+email+"/"+token+"</b></p>"
    };
    
    transporter.sendMail(mailOptions, function (err) {
        if (err) { 
            console.log(err);
        } else {
            console.log('Envio realizado');
        }
    });
}