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
    account_id: faker.string(),
    summoner_id: faker.string(),
    puuid: faker.string(),
    summoner_name: faker.name(),
    region: faker.string(),
    revision_date: faker.date(),
    ...data,
  };
});

Factory.blueprint('App/Models/Tier', (faker, i, data = {}) => {
  return {
    summoner_id: data.id || faker.string(),
    league_id: faker.string(),
    queue_type: faker.string(),
    tier: faker.string(),
    rank: faker.string(),
    pdl: 50,
    winrate: faker.string(),
    wins: faker.integer(),
    losses: faker.integer(),
    inactive: false,
    veteran: false,
    hot_streak: false,
    fresh_blood: false,
    season: faker.string(),
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

Factory.blueprint('App/Models/MatchDto', (faker, i, data = {}) => {
  return {
    season_id: faker.integer(),
    queue_id: faker.string(),
    game_id: data.gameId || faker.integer(),
    platform_id: faker.string(),
    game_mode: faker.string(),
    map_id: faker.integer(),
    game_type: faker.string(),
  };
});
