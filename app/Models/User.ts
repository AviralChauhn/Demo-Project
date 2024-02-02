import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ unique: true, notNullable: true }) // Define unique and not nullable
  public email: string

  @column({ notNullable: true }) // Define not nullable
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>
}
