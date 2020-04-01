/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { test, trait } = use('Test/Suite')('Champions');

const getAllChampions = require('../../app/Utils/RiotAPI/getAllChampions');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should get all the champions of db', async ({ assert, client }) => {
  await Factory.model('App/Models/Champion').createMany(10);

  const response = await client.get('/champions').end();

  response.assertStatus(200);

  assert.exists(response.body.champions);
});

test('it should update one of the league of legends champions', async ({
  assert,
  client,
}) => {
  await Factory.model('App/Models/Champion').create({
    name: 'Zed',
    version: '9.24.1',
  });

  const championName = 'Zed';
  const gamePatch = '10.5.1';
  const language = 'pt_BR';

  const response = await client
    .put(`/champions/${championName}`)
    .send({ gamePatch, language })
    .end();

  response.assertStatus(200);

  assert.exists(response.body.champion);
  assert.equal(response.body.champion.name, championName);
  assert.equal(response.body.champion.version, gamePatch);
});

test('it should not update one of the league of legends champions', async ({
  assert,
  client,
}) => {
  await Factory.model('App/Models/Champion').create({
    name: 'Zed',
    version: '9.24.1',
  });

  const championName = 'Zeed';

  const response = await client.put(`/champions/${championName}`).end();

  response.assertStatus(200);

  assert.exists(response.body.champion);
  assert.equal(response.body.champion.name, championName);
});

test('it should show one of the league of legends champions', async ({
  assert,
  client,
}) => {
  await Factory.model('App/Models/Champion').create({
    name: 'Zed',
  });

  const championName = 'Zed';

  const response = await client.get(`/champions/${championName}`).end();

  response.assertStatus(200);

  assert.exists(response.body.champion);
  assert.equal(response.body.champion.name, championName);
});

test('it should store all of the league of legends champions', async ({
  assert,
  client,
}) => {
  const response = await client.post(`/champions`).end();

  response.assertStatus(200);

  assert.exists(response.body.champions);
}).timeout(99999);

test('it should update all of the league of legends champions', async ({
  assert,
  client,
}) => {
  const language1 = 'pt_BR';
  const version1 = '9.24.1';

  const championsAPI = await getAllChampions(version1, language1);

  const promises = [];
  for (const champion in championsAPI) {
    promises.push(
      Factory.model('App/Models/Champion').create({
        name: championsAPI[champion].name,
      })
    );
  }
  await Promise.all(promises);

  const response = await client.put(`/champions`).end();

  response.assertStatus(200);

  assert.exists(response.body.champions[0]);
}).timeout(99999);
