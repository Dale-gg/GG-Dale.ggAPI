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

// User
Route.get('/users', 'UserController.index');
Route.post('/user', 'UserController.store').validator('User');

// Auth
Route.post('/confirm', 'ConfirmUserController.store').validator('Confirm');
Route.post('/sessions', 'SessionController.store').validator('Session');
Route.post('/forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.post('/reset', 'ResetPasswordController.store').validator('Reset');

// JWT Middleware
Route.group(() => {
    Route.put('/profile', 'ProfileController.update').validator('Profile');
    Route.delete('/user/:id', 'UserController.delete');
    Route.put('/user/:id', 'UserController.restore');
}).middleware('auth');