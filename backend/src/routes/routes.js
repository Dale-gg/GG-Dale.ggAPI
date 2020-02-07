const { Router } = require('express');
const UserController = require('../controller/Auth/UserController');
const RegisterController = require('../controller/Auth/RegisterController');
const ConfirmationController = require('../controller/Auth/ConfirmationController');
const LoginController = require('../controller/Auth/LoginController');
const SearchController = require('../controller/SearchController');
const RiotController = require('../controller/RiotController');
const ForgetController = require('../controller/Auth/ForgetController');

const routes = Router();


// CRUD User
routes.get('/', UserController.index);
routes.get('/users', UserController.index);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

// Auth User
routes.post('/users', RegisterController.register);
routes.post('/login', LoginController.login);

// Forget Token
routes.post('/recover-password', ForgetController.recover);
routes.put('/reset-pass/:email', UserController.resetPass);

// Resend Token
routes.post('/resend', ConfirmationController.resend);

// Confirmations
routes.get('/confirmation/:email/:token', ConfirmationController.confirmation);
routes.get('/forget-token/:email/:token', ForgetController.confirmToken);

// Search User
routes.get('/search', SearchController.index);

// Riot API Usage
routes.get('/invocador', RiotController.index);

module.exports = routes;