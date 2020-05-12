import createConnection from '../../Database'
import Factory from '../../Database/factory'
import { Connection, getConnection } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs'

import test from 'japa'
import app from '../../server'
import request from 'supertest'

let connection: Connection
const factory = new Factory()

const region = 'br1'
const summonerName = 'iLenon7'

test.group('1 - Summoner', group => {
  group.before(async () => {
    connection = await createConnection('test-connection')
    await connection.runMigrations()
  })

  group.beforeEach(async () => {
    await connection.query('DELETE FROM summoners')
    await connection.query('DELETE FROM champions')
  })

  group.after(async () => {
    await connection.dropDatabase()
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })

  test('A) it should store a summoner', async assert => {
    const api = new LolApi()
    const { data } = await api.DataDragon.getChampion()

    const promises = []
    for (const champion in data) {
      promises.push(factory.Champion(data[champion]))
    }
    await Promise.all(promises)

    const response = await request(app).post(
      `${process.env.APP_PREFIX}/summoners?region=${region}&summonerName=${summonerName}`,
    )

    assert.exists(response.body.data.summoner_name)
  }).timeout(30000)

  test('B) it should show a summoner', async assert => {
    const api = new LolApi()
    const { data } = await api.DataDragon.getChampion()

    const promises = []
    for (const champion in data) {
      promises.push(factory.Champion(data[champion]))
    }
    await Promise.all(promises)

    await factory.Summoner({ summoner_name: 'iLenon7', region: 'br1' })

    const response = await request(app).get(
      `${process.env.APP_PREFIX}/summoners?region=${region}&summonerName=${summonerName}`,
    )

    assert.exists(response.body.data.summoner_name)
  }).timeout(30000)
})
