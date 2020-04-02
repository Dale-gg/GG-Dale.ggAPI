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
Route.get('/summoner/update', 'SummonerController.update');

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
Route.get('/champions', 'ChampionController.index');
Route.post('/champions', 'ChampionController.storeAll');
Route.put('/champions', 'ChampionController.updateAll');
Route.get('/champions/:championName', 'ChampionController.show');
Route.put('/champions/:championName', 'ChampionController.update');

// Spells
Route.get('/spells/index', 'SpellController.index');
Route.get('/spells/:spellName/show', 'SpellController.show');

// Spell Script
Route.post('/spells/:language/:version/storeAll', 'SpellController.storeAll');
Route.put('/spells/:language/:version/updateAll', 'SpellController.updateAll');

// Runes
Route.get('/runes/index', 'RuneController.index');
Route.post('/runes/storeAll', 'RuneController.storeAll');

// Welcome
Route.get('/', ({ response }) => {
  response.json({
    type: 'Dale.gg',
    msg: 'Welcome to Dale.gg DevAPI at Heroku!',
    Withlove: {
      contributor1: {
        nickname: 'jlenon7',
        repo: 'https://github.com/jlenon7',
      },
      contributor2: {
        nickname: 'Adryell',
        repo: 'https://github.com/Adryell',
      },
    },
  });
});

// JWT Middleware
Route.group(() => {
  Route.put('/profile', 'Auth/ProfileController.update').validator('Profile');
  Route.delete('/user/:id', 'UserController.destroy');
}).middleware('auth');
