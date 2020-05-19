import createConnection from '../../Database'
import Factory from '../../Database/factory'
import { Connection, getConnection } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs'

import test from 'japa'
import app from '../../server'
import request from 'supertest'

let connection: Connection
const factory = new Factory()

const key = 238

test.group('> [1] Champions', group => {
  group.before(async () => {
    connection = await createConnection('test-connection')
    await connection.runMigrations()
  })

  group.beforeEach(async () => {
    await connection.query('DELETE FROM champions')
  })

  group.after(async () => {
    await connection.dropDatabase()
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })

  test('A) it should store a champion', async assert => {
    const response = await request(app)
      .post(`${process.env.APP_PREFIX}/champions`)
      .send({
        key,
      })

    assert.equal(response.body.status, 'success')
    assert.equal(response.body.data.name, 'Zed')
    assert.exists(response.body.data.name)
  }).timeout(5000)

  test('B) it should update a champion', async assert => {
    const api = new LolApi()
    const data = await api.DataDragon.getChampion(key)

    await factory.Champion(data)

    const response = await request(app).put(
      `${process.env.APP_PREFIX}/champions/${key}`,
    )

    assert.equal(response.body.status, 'success')
    assert.equal(response.body.data.name, 'Zed')
    assert.exists(response.body.data.name)
  }).timeout(5000)

  // test('C) it should store all champions', async assert => {
  //   const response = await request(app).post(
  //     `${process.env.APP_PREFIX}/champions/script/all`,
  //   )

  //   assert.exists(response.body.data[0])
  // }).timeout(10000)

  // test('D) it should update all champions', async assert => {
  //   const api = new LolApi()
  //   const { data } = await api.DataDragon.getChampion()

  //   const promises = []
  //   for (const champion in data) {
  //     promises.push(factory.Champion(data[champion]))
  //   }
  //   await Promise.all(promises)

  //   const response = await request(app).put(
  //     `${process.env.APP_PREFIX}/champions/script/all`,
  //   )

  //   assert.exists(response.body.data[0])
  // }).timeout(10000)
})
