/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { test, trait } = use('Test/Suite')('Champions');

const { LolApi } = use('@jlenon7/zedjs');

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

  const response = await client.put(`/champions/${championName}`).end();

  response.assertStatus(200);

  assert.exists(response.body.champion);
  assert.equal(response.body.champion.name, championName);
}).timeout(30000);

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

  response.assertStatus(404);
}).timeout(30000);

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
}).timeout(30000);

test('it should store all of the league of legends champions', async ({
  assert,
  client,
}) => {
  const response = await client.post(`/champions`).end();

  response.assertStatus(200);

  assert.exists(response.body.champions);
}).timeout(30000);

test('it should update all of the league of legends champions', async ({
  assert,
  client,
}) => {
  const api = new LolApi();

  const { data } = await api.DataDragon.getChampion();

  const promises = [];
  for (const champion in data) {
    promises.push(
      Factory.model('App/Models/Champion').create({
        name: data[champion].name,
      })
    );
  }
  await Promise.all(promises);

  const response = await client.put(`/champions`).end();

  response.assertStatus(200);

  assert.exists(response.body.champions[0]);
}).timeout(30000);
