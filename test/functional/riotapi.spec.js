const { test, trait } = use('Test/Suite')('RiotAPI');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should get some summoner and save it in the database', async ({
  assert,
  client,
}) => {
  const summonerName = 'iLenon7';
  const region = 'br1';

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summonerName}`)
    .end();

  response.assertStatus(200);

  assert.equal(response.body.summonerAPI.name, summonerName);
}).timeout(30000);

test('it should get the solo/duo tier of the summoner and save it', async ({
  assert,
  client,
}) => {
  const summonerName = 'iLenon7';
  const tierSolo = 'GOLD';
  const region = 'br1';

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summonerName}`)
    .end();

  response.assertStatus(200);

  assert.equal(response.body.summonerAPI.name, summonerName);
  assert.equal(response.body.tierSolo.tier, tierSolo);
}).timeout(30000);

test('it should get the flex tier of the summoner and save it', async ({
  assert,
  client,
}) => {
  const summonerName = 'RNS Hylen';
  const tierFlex = 'DIAMOND';
  const region = 'br1';

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summonerName}`)
    .end();

  response.assertStatus(200);

  assert.equal(response.body.summonerAPI.name, summonerName);
  assert.equal(response.body.tierFlex.tier, tierFlex);
}).timeout(30000);

test('it should get ten matchs from the summoner', async ({
  assert,
  client,
}) => {
  const summonerName = 'iLenon7';
  const region = 'br1';

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summonerName}`)
    .end();

  response.assertStatus(200);

  assert.equal(response.body.summoner[0].summoner_name, summonerName);
  assert.equal(response.body.summoner[0].tiers[0].tier, tierSolo);
  assert.exists(response.body.summoner[0].matchs);
}).timeout(30000);

test('it should enter in the show() method instead of store()', async ({
  assert,
  client,
}) => {
  const summonerName = 'iLenon7';
  const region = 'br1';

  const summoner = await Factory.model('App/Models/Summoner').create({
    summonerName,
    region,
  });

  const summonerTier = await Factory.model('App/Models/Tier').make({
    summoner_id: summoner.id,
  });

  const summonerMatchlist = await Factory.model('App/Models/Matchlist').make({
    summoner_id: summoner.id,
  });

  await summoner.tiers().save(summonerTier);
  await summoner.matchs().save(summonerMatchlist);

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summoner.summonerName}`)
    .end();

  response.assertStatus(200);

  assert.equal(response.body.summoner[0].summonerName, summonerName);
  assert.exists(response.body.summoner);
  assert.exists(response.body.summoner[0].tiers);
  assert.exists(response.body.summoner[0].matchs);
  assert.equal(response.body.summoner[0].summoner_name, summonerName);
});

// test('it should not get some summoner', async ({ assert, client }) => {
//   const summonerName = 'jainzidaleincomodantemermaunnn';
//   const region = 'br1';

//   const response = await client
//     .get(`/summoner/${region}/${summonerName}`)
//     .end();

//   response.assertStatus(404);

//   assert.equal(response.body.data, null);
// }).timeout(10000);
