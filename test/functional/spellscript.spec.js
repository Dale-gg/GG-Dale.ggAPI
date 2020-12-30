/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { test, trait } = use('Test/Suite')('Spells');

const getAllSpells = require('../../app/Utils/RiotAPI/getAllSpells');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should get all the spells of db', async ({ assert, client }) => {
  await Factory.model('App/Models/Spell').createMany(10);

  const response = await client.get('/spells/index').end();

  response.assertStatus(200);

  assert.exists(response.body.spells);
});

test('it should show one of the league of legends spells', async ({
  assert,
  client,
}) => {
  await Factory.model('App/Models/Spell').create({
    name: 'Flash',
  });

  const spellName = 'Flash';

  const response = await client.get(`/spells/${spellName}/show`).end();

  response.assertStatus(200);

  assert.exists(response.body.spell);
  assert.equal(response.body.spell.name, spellName);
}).timeout(30000);

test('it should store all of the league of legends spells', async ({
  assert,
  client,
}) => {
  const language = 'pt_BR';
  const version = '10.5.1';

  const response = await client
    .post(`/spells/${language}/${version}/storeAll`)
    .end();

  response.assertStatus(200);

  assert.exists(response.body.spells);
}).timeout(30000);

test('it should update all of the league of legends spells', async ({
  assert,
  client,
}) => {
  const language1 = 'pt_BR';
  const version1 = '9.24.1';

  const spellsAPI = await getAllSpells(version1, language1);

  const promises = [];
  for (const spell in spellsAPI) {
    promises.push(
      Factory.model('App/Models/Spell').create({
        name: spellsAPI[spell].name,
      })
    );
  }
  await Promise.all(promises);

  const language = 'pt_BR';
  const version = '10.5.1';

  const response = await client
    .put(`/spells/${language}/${version}/updateAll`)
    .end();

  response.assertStatus(200);

  assert.exists(response.body.spells[0]);
}).timeout(30000);
