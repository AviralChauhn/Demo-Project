import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').references('users.id')
      table.string('name').notNullable()
      table.string('email address').notNullable()
      table.string('gender')
      table.date('date of Birth')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
