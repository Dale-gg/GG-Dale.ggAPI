import createConnection from '../../Database'
import Factory from '../../Database/factory'
import { Connection, getConnection } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs'

import test from 'japa'
import app from '../../server'
import request from 'supertest'

let connection: Connection
const factory = new Factory()

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

  test('B) it should update all runes', async assert => {
    const api = new LolApi()
    const data: any = await api.DataDragon.getRunesReforged()

    for (const tree in data) {
      const treeObj = data[tree]

      const newTree = await factory.Tree({
        id_api: treeObj.id,
        key: treeObj.key,
        icon: treeObj.icon,
        name: treeObj.name,
      })

      const slots = treeObj.slots
      for (const slot in slots) {
        for (const runeObj of slots[slot].runes) {
          await factory.Rune({
            id_api: runeObj.id,
            key: runeObj.key,
            name: runeObj.name,
            icon: runeObj.icon,
            longDesc: runeObj.longDesc,
            shortDesc: runeObj.shortDesc,
            tree: newTree,
          })
        }
      }
    }

    const response = await request(app).put(
      `${process.env.APP_PREFIX}/runes/script/all`,
    )

    assert.exists(response.body.data[0])
  }).timeout(10000)
})
