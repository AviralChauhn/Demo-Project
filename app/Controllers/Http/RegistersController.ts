import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Schema from '@ioc:Adonis/Lucid/Schema'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class RegistersController {
  public async index({ request }: HttpContextContract) {
    const validations = schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [
        rules.minLength(8),
        rules.maxLength(16),
        rules.regex(/^[a-zA-Z0-9]+$/),
      ]),
    })
    const data = request.validate({ schema: validations })
    return data
    // User.create({})
  }
}
