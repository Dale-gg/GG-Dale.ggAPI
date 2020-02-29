const { test, trait } = use('Test/Suite')('User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Helpers = use('Helpers');
const Hash = use('Hash');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should be able to confirm the user', async ({ client }) => {
  const email = 'lenonsec7@gmail.com';
  const type = 'confirmaccount';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make({ type });

  await user.tokens().save(userToken);

  const response = await client
    .post('/confirm')
    .send({
      token: userToken.token,
    })
    .end();

  response.assertStatus(204);
});

test('it should be able to soft delete an User', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    name: 'João Lenon',
    email: 'lenonsec7@gmail.com',
    password: '123456',
  });

  const response = await client
    .delete(`/user/${user.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
});

test('it should be able to soft restore an User', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create({
    name: 'João Lenon',
    email: 'lenonsec7@gmail.com',
    password: '123456',
    deleted: true,
    status: false,
  });

  const response = await client.put(`/user/${user.id}`).end();

  response.assertStatus(200);

  await user.reload();

  assert.equal(user.deleted, false);
});

test('it should be able to update profile', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    name: 'Diego',
    password: '123123',
  });

  const response = await client
    .put('/profile')
    .loginVia(user, 'jwt')
    .field('name', 'Jorge')
    .field('password', '123456')
    .field('password_confirmation', '123456')
    .attach('avatar', Helpers.tmpPath('test/avatar.jpeg'))
    .end();

  response.assertStatus(200);

  assert.equal(response.body.user.name, 'Jorge');
  assert.exists(response.body.user.avatar);

  await user.reload();

  assert.isTrue(await Hash.verify('123456', user.password));
});
