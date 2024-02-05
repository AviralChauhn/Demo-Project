import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Profile extends BaseModel {
  @column()
  public user_id: number
  @column({ isPrimary: true })
  public id: number

  @column({ notNullable: true })
  public name: string

  @column({ columnName: 'mobile_number' })
  public mobileNumber: string

  @column()
  public gender: string

  @column({ columnName: 'date_of_birth' })
  public dateOfBirth: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
