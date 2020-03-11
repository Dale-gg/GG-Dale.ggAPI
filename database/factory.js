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
    champion_id: data.champid || faker.integer(),
    champion_key: faker.integer(),
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
    matchlist_id: data.id || faker.string(),
    season_id: faker.integer(),
    queue_id: faker.string(),
    game_id: faker.integer(),
    platform_id: faker.string(),
    game_mode: faker.string(),
    map_id: faker.integer(),
    game_type: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Participant', (faker, i, data = {}) => {
  return {
    team_id: faker.integer(),
    game_id: faker.integer(),
    champion_id: data.champion_id || faker.integer(),
    champion_key: faker.integer(),
    account_id: faker.string(),
    summoner_id: faker.string(),
    match_dto_id: data.id || faker.integer(),
    highest_achieved_season_tier: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/ParticipantDto', (faker, i, data = {}) => {
  return {
    participant_id: data.id || faker.integer(),
    perk0: faker.integer(),
    perk1: faker.integer(),
    perk2: faker.integer(),
    perk3: faker.integer(),
    perk4: faker.integer(),
    perk5: faker.integer(),
    item0: faker.integer(),
    item1: faker.integer(),
    item2: faker.integer(),
    item3: faker.integer(),
    item4: faker.integer(),
    item5: faker.integer(),
    kills: faker.integer(),
    deaths: faker.integer(),
    assists: faker.integer(),
    win: true,
    double_kills: faker.integer(),
    triple_kills: faker.integer(),
    quadra_kills: faker.integer(),
    penta_kills: faker.integer(),
    champ_level: faker.integer(),
    ...data,
  };
});

Factory.blueprint('App/Models/Champion', (faker, i, data = {}) => {
  return {
    key: data.key || faker.integer(),
    name: data.name || faker.string(),
    title: faker.string(),
    tags: faker.string(),
    version: data.version || faker.string(),
    image_full_url: faker.string(),
    image_loading_url: faker.string(),
    image_splash_url: faker.string(),
    image_sprite_url: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Spell', (faker, i, data = {}) => {
  return {
    name: data.name || faker.string(),
    key: faker.integer(),
    spell_dd: data.spell_dd || faker.string(),
    description: faker.string(),
    group: faker.string(),
    modes: faker.string(),
    image_full_url: faker.string(),
    image_sprite_url: faker.string(),
    ...data,
  };
});
