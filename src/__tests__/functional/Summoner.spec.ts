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

const endpoints = {
  GET: `${process.env.APP_PREFIX}/summoners?region=${region}&summonerName=${summonerName}`,
  POST: `${process.env.APP_PREFIX}/summoners?region=${region}&summonerName=${summonerName}`,
}

test.group('> 3️⃣  Summoners', group => {
  group.before(async () => {
    connection = await createConnection('test-connection')
    await connection.runMigrations()
  })

  group.beforeEach(async () => {
    await connection.query('DELETE FROM champions')
    await connection.query('DELETE FROM tiers')
    //  TODO find a way to test tier observer
    // await connection.query('DELETE FROM summoners')
    await connection.query('DELETE FROM matchlists')
    await connection.query('DELETE FROM matchs')
  })

  group.after(async () => {
    await connection.dropDatabase()
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })

  test('A) it should store a summoner', async assert => {
    const response = await request(app).post(
      `${process.env.APP_PREFIX}/summoners?region=${region}&summonerName=${summonerName}`,
    )

    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data.summoner_name)
    assert.equal(response.body.data.summoner_name, 'iLenon7')
  }).timeout(7000)

  test('B) it should show a summoner', async assert => {
    await factory.Summoner({ summoner_name: 'iLenon7', region: 'br1' })

    const response = await request(app).get(
      `${process.env.APP_PREFIX}/summoners?region=${region}&summonerName=${summonerName}`,
    )

    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data.summoner_name)
    assert.equal(response.body.data.summoner_name, 'iLenon7')
  }).timeout(7000)

  test('C) it should update a summoner', async assert => {
    const summoner = await factory.Summoner({
      summoner_name: 'iLenon7',
      region: 'br1',
    })

    const response = await request(app).put(
      `${process.env.APP_PREFIX}/summoners/${summoner.id}`,
    )

    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data.summoner_name)
    assert.equal(response.body.data.summoner_name, 'iLenon7')
  }).timeout(7000)

  test('D) it should store a summoner with his tiers', async assert => {
    await request(app).post(`${endpoints.POST}&withTiers=true`)

    const response = await request(app).get(endpoints.GET)

    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data.summoner_name)
    assert.equal(response.body.data.summoner_name, 'iLenon7')
    assert.exists(response.body.data.tiers)
  })

  test('E) it should store a summoner with his matchs', async assert => {
    const api = new LolApi()
    const { data } = await api.DataDragon.getChampion()

    const promises = []
    for (const champion in data) {
      promises.push(factory.Champion(data[champion]))
    }
    await Promise.all(promises)

    await request(app).post(`${endpoints.POST}&withMatchs=true`)

    const response = await request(app).get(endpoints.GET)

    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data.summoner_name)
    assert.equal(response.body.data.summoner_name, 'iLenon7')
    assert.exists(response.body.data.matchs)
  }).timeout(10000)
})
