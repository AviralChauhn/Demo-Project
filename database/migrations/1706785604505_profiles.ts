import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').references('users.id')
      table.string('name').notNullable()
      table.string('mobile_number').notNullable().unique()
      table.string('gender')
      table.date('date_of_birth')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
