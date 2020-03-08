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
  const tier = 'GOLD';

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summonerName}`)
    .end();

  response.assertStatus(200);

  assert.equal(response.body.summoner[0].summoner_name, summonerName);
  assert.equal(response.body.summoner[0].tiers[0].tier, tier);
}).timeout(30000);

test('it should get some summoner and save it with flex and solo tier', async ({
  assert,
  client,
}) => {
  const summonerName = 'RNS Hylen';
  const tierSolo = 'DIAMOND';
  const tierFlex = 'DIAMOND';
  const region = 'br1';

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summonerName}`)
    .end();

  response.assertStatus(200);

  assert.equal(response.body.summoner[0].summoner_name, summonerName);
  assert.equal(response.body.summoner[0].tiers[0].tier, tierSolo);
  assert.equal(response.body.summoner[0].tiers[1].tier, tierFlex);
}).timeout(30000);

test('it should get ten matchs from the summoner', async ({
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

  assert.equal(response.body.summoner[0].summoner_name, summonerName);
  assert.equal(response.body.summoner[0].tiers[0].tier, tierSolo);
  assert.exists(response.body.summoner[0].matchs);
  assert.exists(response.body.summoner[0].matchs[0].matchdto);
}).timeout(30000);

test('it should enter in the show and bring a summoner with his tier and matchs', async ({
  assert,
  client,
}) => {
  const summonerName = 'iLenon7';
  const region = 'br1';

  const summoner = await Factory.model('App/Models/Summoner').create({
    summoner_name: summonerName,
    region,
  });

  const summonerTier = await Factory.model('App/Models/Tier').make({
    summoner_id: summoner.id,
  });

  await summoner.tiers().save(summonerTier);

  const summonerMatchlist = await Factory.model('App/Models/Matchlist').make({
    summoner_id: summoner.id,
  });

  const summonerMatchDto = await Factory.model('App/Models/MatchDto').make({
    matchlist_id: summonerMatchlist.id,
  });

  const participant = await Factory.model('App/Models/Participant').make({
    match_dto_id: summonerMatchDto.id,
  });

  const participantDto = await Factory.model('App/Models/ParticipantDto').make({
    participant_id: participant.id,
  });

  await Factory.model('App/Models/Champion').create({
    name: 'Zed',
  });

  await summoner.matchs().save(summonerMatchlist);
  await summonerMatchlist.matchdto().save(summonerMatchDto);
  await summonerMatchDto.participants().save(participant);
  await participant.participantdto().save(participantDto);

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summoner.summoner_name}`)
    .end();

  response.assertStatus(200);

  assert.exists(response.body.summoner);
  assert.exists(response.body.summoner[0].tiers);
  assert.exists(response.body.summoner[0].matchs);
  assert.exists(response.body.summoner[0].matchs[0].matchdto);
  assert.exists(response.body.summoner[0].matchs[0].matchdto.participants);
  assert.exists(
    response.body.summoner[0].matchs[0].matchdto.participants[0].participantdto
  );
  assert.equal(response.body.summoner[0].summoner_name, summonerName);
  assert.equal(response.body.summoner[0].matchs[0].champion, 'Zed');
});

test('it should not get some summoner', async ({ assert, client }) => {
  const summonerName = 'jainzidaleincomodantemermaunnn';
  const region = 'br1';

  const response = await client
    .get(`/summoner/?region=${region}&summonerName=${summonerName}`)
    .end();

  response.assertStatus(404);

  assert.equal(response.body.data, null);
});
