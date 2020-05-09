import createConnection from '../../database'
import Factory from '../../Database/Factory'
import { Connection, getConnection } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs'

import test from 'japa'
import app from '../../app'
import request from 'supertest'

let connection: Connection
const factory = new Factory()

const region = 'br1'
const summonerName = 'iLenon7'

test.group('Summoner', (group) => {
  group.before(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
  });

  group.beforeEach(async () => {
    await connection.query('DELETE FROM champions');
    await connection.query('DELETE FROM summoners');
  });

  group.after(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  test('A) it should create a summoner', async (assert) => {
    const api = new LolApi()
    const { data } = await api.DataDragon.getChampion()

    const promises = [];
    for (const champion in data) {
      promises.push(
        factory.Champion(data[champion])
      )
    }
    await Promise.all(promises)

    const response = await request(app).post(`${process.env.APP_PREFIX}/summoners?region=${region}&summonerName=${summonerName}`)
console.log(response)
    assert.exists(response.body.summoner)
  }).timeout(30000)
})


