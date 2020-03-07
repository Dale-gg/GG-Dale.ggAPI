const { test, trait } = use('Test/Suite')('Champions');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should store one of the league of legends champions', async ({
  assert,
  client,
}) => {
  const championName = 'Zed';
  const gamePatch = '10.5.1';
  const language = 'pt_BR';

  const response = await client
    .post('/champions/storeAll')
    .send({ gamePatch, language, championName })
    .end();

    console.log(response.body)
  response.assertStatus(200);

  assert.exists(response.body.champion);
  //assert.equal(response.body.champion);
});
