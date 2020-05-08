// Database stuffs
import createConnection from '../../database'
import { Connection, getRepository, getConnection } from 'typeorm'

// Japa for testing supertest to make requests
import test from 'japa'
import request from 'supertest'

// Models
import Summoner from '../../Models/Summoner'

// Import app to run and make requests
import app from '../../app'

let connection: Connection

 // Run this test with the command:
 //  ts-node src/__tests__/functional/Summoner.spec.ts
 // Or run all tests with node japaFile.js

test.group('Summoner Tests', (group) => {
  group.before(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
  });

  group.beforeEach(async () => {
    await connection.query('DELETE FROM summoners');
  });

  group.after(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  const region = 'br1'
  const summoner = 'iLenon7'

  test('create ilenon7', async (assert) => {
    const response = await request(app).post(`/gg/v1/summoners?region=${region}&summonerName=${summoner}`)

    assert.exists(response.body.summoner)
  })
})


