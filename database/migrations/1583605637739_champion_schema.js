'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChampionSchema extends Schema {
  up () {
    this.create('champions', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('champions')
  }
}

module.exports = ChampionSchema
