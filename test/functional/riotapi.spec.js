const { test, trait } = use('Test/Suite')('RiotAPI');

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should get some summoner', async ({ assert, client }) => {
  const summonerName = 'iLenon7';
  const region = 'br1';

  const response = await client
    .get(`/summoner/${region}/${summonerName}`)
    .end();

  response.assertStatus(200);

  assert.equal(response.body.data.name, summonerName);
});

test('it should not get some summoner', async ({ assert, client }) => {
  const summonerName = 'jainzidaleincomodantemermaunnn';
  const region = 'br1';

  const response = await client
    .get(`/summoner/${region}/${summonerName}`)
    .end();

  response.assertStatus(404);

  assert.equal(response.body.data, null);
});
