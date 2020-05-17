import createConnection from '../../Database'
// import Factory from '../../Database/factory'
import { Connection, getConnection } from 'typeorm'
// import { LolApi } from '@jlenon7/zedjs'

import test from 'japa'
import app from '../../server'
import request from 'supertest'

let connection: Connection
// const factory = new Factory()

// const key = 238

test.group('> [2] Runes', group => {
  group.before(async () => {
    connection = await createConnection('test-connection')
    await connection.runMigrations()
  })

  group.beforeEach(async () => {
    await connection.query('DELETE FROM runes')
  })

  group.after(async () => {
    await connection.dropDatabase()
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })

  test('A) it should store all runes', async assert => {
    const response = await request(app).post(
      `${process.env.APP_PREFIX}/runes/script/all`,
    )

    assert.exists(response.body.data[0])
  }).timeout(10000)

  // test('B) it should update all runes', async assert => {
  //   const api = new LolApi()
  //   const data = await api.DataDragon.getRunesReforged()

  //   const promises = []
  //   for (const runes in data) {
  //     promises.push(factory.Champion(data[champion]))
  //   }
  //   await Promise.all(promises)

  //   const response = await request(app).put(
  //     `${process.env.APP_PREFIX}/champions/script/all`,
  //   )

  //   assert.exists(response.body.data[0])
  // }).timeout(10000)
})
