import createConnection from '../../Database'
import Factory from '../../Database/factory'
import { Connection, getConnection } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs'

import test from 'japa'
import app from '../../server'
import request from 'supertest'
import { RunesReforgedDTO } from '@jlenon7/zedjs/dist/models-dto/data-dragon/runes-reforged.dto'

let connection: Connection
const factory = new Factory()

interface IRune extends RunesReforgedDTO {
  name?: string
}

test.group('> 2️⃣  Runes', group => {
  group.before(async () => {
    connection = await createConnection('test-connection')
    await connection.runMigrations()
  })

  group.beforeEach(async () => {
    await connection.query('DELETE FROM runes')
    await connection.query('DELETE FROM trees')
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

    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data[0])
  }).timeout(7000)

  test('B) it should update all runes', async assert => {
    const api = new LolApi()
    const data: IRune[] = await api.DataDragon.getRunesReforged()

    for (const tree in data) {
      const treeObj = data[tree]

      const newTree = await factory.Tree({
        id_api: treeObj.id,
        key: treeObj.key,
        icon: treeObj.icon,
        name: treeObj.name,
      })

      const slots: any = treeObj.slots

      slots.map(async (slot: any) => {
        slot.runes.map(async (rune: any) => {
          await factory.Rune({
            id_api: rune.id,
            key: rune.key,
            name: rune.name,
            icon: rune.icon,
            longDesc: rune.longDesc,
            shortDesc: rune.shortDesc,
            tree: newTree,
          })
        })
      })
    }

    const response = await request(app).put(
      `${process.env.APP_PREFIX}/runes/script/all`,
    )

    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data[0])
  }).timeout(7000)
})
