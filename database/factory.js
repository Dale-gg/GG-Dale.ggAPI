/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
  return {
    type: data.type || 'refreshtoken',
    token: faker.string({ lenght: 20 }),
    ...data,
  };
});

Factory.blueprint('App/Models/Summoner', (faker, i, data = {}) => {
  return {
    accountId: faker.string(),
    summonerId: faker.string(),
    puuid: faker.string(),
    summonerName: faker.name(),
    region: faker.string(),
    revisionDate: faker.date(),
    ...data,
  };
});

Factory.blueprint('App/Models/Matchlist', (faker, i, data = {}) => {
  return {
    summoner_id: data.id || faker.string(),
    lane: faker.string(),
    game_id: faker.string(),
    platform_id: faker.string(),
    queue: faker.integer(),
    role: faker.string(),
    season: faker.integer(),
    ...data,
  };
});
