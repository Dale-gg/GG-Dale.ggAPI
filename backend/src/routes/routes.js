const { Router } = require('express');
const UserController = require('../controller/Auth/UserController');
const RegisterController = require('../controller/Auth/RegisterController');
const ConfirmationController = require('../controller/Auth/ConfirmationController');
const LoginController = require('../controller/Auth/LoginController');
const SearchController = require('../controller/SearchController');
const RiotController = require('../controller/RiotController');

const routes = Router();


// CRUD User
routes.get('/', UserController.index);
routes.get('/users', UserController.index);
routes.post('/users', RegisterController.register);
routes.put('/users', UserController.update);
routes.delete('/user/:id', UserController.destroy);

// Auth User
routes.post('/login', LoginController.login);

// Search User
routes.get('/search', SearchController.index);

// Riot API Usage
routes.get('/invocador', RiotController.index);

// Token
routes.get('/confirmation/:email/:token', ConfirmationController.confirmation);
//app.post('/resend', UserController.resendTokenPost);

module.exports = routes;