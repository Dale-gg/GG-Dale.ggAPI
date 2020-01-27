const { Router } = require('express');
const UserController = require('../controller/UserController');
const SearchController = require('../controller/SearchController');
const RiotController = require('../controller/RiotController');

const routes = Router();


// CRUD User
routes.get('/', UserController.index);
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/user/:id', UserController.destroy);

// Search User
routes.get('/search', SearchController.index);

// Riot API Usage
routes.get('/invocador', RiotController.index);

module.exports = routes;