const nodemailer = require("nodemailer");
require('dotenv').config({path: ".env"});

// Serviço para enviar email
module.exports =  function sendEmail(email, token, host) {  
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
        subject: 'Token de verificação da conta', 
        html: "<p><b>Olá</b>, Por favor, verifique sua conta clicando nesse link: <b>http://"+host+"/confirmation/"+email+"/"+token+"</b></p>"
    };
    
    transporter.sendMail(mailOptions, function (err) {
        if (err) { 
            console.log(err);
        } else {
            console.log('Envio realizado');
        }
    });
}