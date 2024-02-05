import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Schema from '@ioc:Adonis/Lucid/Schema'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class RegistersController {
  public async index({ request, response }: HttpContextContract) {
    const validations = schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [
        rules.minLength(8),
        rules.maxLength(16),
        rules.regex(/^[a-zA-Z0-9]+$/),
      ]),
    })
    const data = await request.validate({ schema: validations })
    const user = await User.create(data)
    const responseData = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    response.created(responseData)
  }
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.attempt(email, password)

    return token.toJSON()
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    response.send({ message: 'user logged out successfully!!!' })
  }
}
