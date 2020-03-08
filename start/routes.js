/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('files/:file', 'FileController.show');

// Riot API
Route.group(() => {
  Route.get('/summoner', 'SummonerController.show');
}).middleware('summoner');

Route.get('/summoner/store', 'SummonerController.store');

// User
Route.get('/users', 'UserController.index');
Route.post('/user', 'UserController.store').validator('User');

// Auth
Route.post('/confirm', 'Auth/ConfirmUserController.store').validator('Confirm');
Route.post('/sessions', 'Auth/SessionController.store').validator('Session');
Route.post('/forgot', 'Auth/ForgotPasswordController.store').validator(
  'Forgot'
);
Route.post('/reset', 'Auth/ResetPasswordController.store').validator('Reset');
Route.put('/user/:id', 'UserController.restore');

// Champion
Route.get('/champions/index', 'ChampionController.index');
Route.post('/champions/store', 'ChampionController.store');
Route.get('/champions/:championName/show', 'ChampionController.show');
Route.put('/champions/:championName/update', 'ChampionController.update');

// Champion Script
Route.post(
  '/champions/:language/:version/storeAll',
  'ChampionController.storeAll'
);
Route.put(
  '/champions/:language/:version/updateAll',
  'ChampionController.updateAll'
);

// JWT Middleware
Route.group(() => {
  Route.put('/profile', 'Auth/ProfileController.update').validator('Profile');
  Route.delete('/user/:id', 'UserController.destroy');
}).middleware('auth');
