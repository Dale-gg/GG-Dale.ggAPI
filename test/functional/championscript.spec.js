const { test, trait } = use('Test/Suite')('Champions');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should store all the league of legends champions', async ({
  assert,
  client,
}) => {
  const response = await client.post('/champions/storeAll').end();

  response.assertStatus(200);

  assert.exists();
  assert.equal();
});
