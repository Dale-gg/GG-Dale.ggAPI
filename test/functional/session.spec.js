const { test, trait } = use('Test/Suite')('Session');

const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should return JWT token when session created', async ({
  assert,
  client,
}) => {
  const sessionPayload = {
    email: 'lenonsec7@gmail.com',
    password: '123456',
  };

  await Factory.model('App/Models/User').create({
    name: 'João Lenon',
    email: 'lenonsec7@gmail.com',
    password: '123456',
  });

  const response = await client
    .post('/sessions')
    .send(sessionPayload)
    .end();

  response.assertStatus(200);
  assert.exists(response.body.token);
});