const { test, trait } = use('Test/Suite')('Runes');

const { LolApi } = use('@jlenon7/zedjs');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should get all the runes of db', async ({ assert, client }) => {
  const tree = await Factory.model('App/Models/Tree').create();
  const rune = await Factory.model('App/Models/Rune').create();

  await tree.runes().save(rune);

  const response = await client.get('/runes/index').end();

  response.assertStatus(200);

  assert.exists(response.body.runes);
});

test('it should store all of the league of legends runes', async ({
  assert,
  client,
}) => {
  const response = await client.post(`/runes/storeAll`).end();

  response.assertStatus(200);

  assert.exists(response.body.runes);
});
