const { test, trait } = use('Test/Suite')('Runes');

const { LolApi } = use('@jlenon7/zedjs');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should get all the runes of db', async ({ assert, client }) => {
  await Factory.model('App/Models/Rune').createMany(10);

  const response = await client.get('/runes/index').end();

  response.assertStatus(200);

  assert.exists(response.body.runes);
});

test('it should store all of the league of legends runes', async ({
  assert,
  client,
}) => {
  const language = 'pt_BR';
  const version = '10.5.1';

  const response = await client
    .post(`/runes/${language}/${version}/storeAll`)
    .end();

  response.assertStatus(200);

  assert.exists(response.body.runes);
});
