const { test, trait } = use('Test/Suite')('Champions');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should get all the champions of db', async ({ assert, client }) => {
  await Factory.model('App/Models/Champion').createMany(10);

  const response = await client.get('/champions/index').end();

  response.assertStatus(200);

  assert.exists(response.body.champions);
});

test('it should store one of the league of legends champions', async ({
  assert,
  client,
}) => {
  const championName = 'Zed';
  const gamePatch = '10.5.1';
  const language = 'pt_BR';

  const response = await client
    .post('/champions/store')
    .send({ gamePatch, language, championName })
    .end();

  response.assertStatus(200);

  assert.exists(response.body.champion);
  assert.equal(response.body.champion.name, championName);
});
