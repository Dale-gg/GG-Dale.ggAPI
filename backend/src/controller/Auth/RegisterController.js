//const axios = require('axios');
const User = require('../../models/User');
const Token = require('../../models/Token');
const passEncode = require('../../utils/passEncode');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
require('dotenv').config({path: ".env"});

module.exports = { 
    async register(request, response) {
        const { name, email, password, password_confirm, avatar_url } = request.body;

        findUser = await User.findOne({email});

        if (findUser) {
            return response.status(400).send({ msg: 'O email que você tentou cadastrar já existe!' });
        } else {
            if (password == password_confirm) {           
                const passEncoded = passEncode(password);
        
                user = await User.create({
                    name,
                    email,
                    password: passEncoded,
                    avatar_url
                });

                // Create a verification token for this user
                var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

                token.save(function (err) {
                    if (err) { return response.status(500).json({ msg: err.message }); }
                });
                // Send the email
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
                    to: user.email, 
                    subject: 'Token de verificação da conta', 
                    html: "<p><b>Olá</b>, Por favor, verifique sua conta clicando nesse link: <b>http://"+request.headers.host+"/confirmation/"+user.email+"/"+token.token+"</b></p>"
                    //text: 'Olá,\n\n' + 'Por favor, verifique sua conta clicando nesse link: \nhttp:\/\/' + request.headers.host + '\/confirmation\/' + token.token + '.\n' 
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { 
                        return response.status(500).json({ msg: err.message }); 
                    }
                    response.status(200).json({ msg: 'Um email de verificação foi enviado para: ' + user.email});
                });

                //return response.json(user);
            } else {
                console.log('Senhas não batem!');
                return response.json('Senhas não batem!');
            }
        }
    }
}