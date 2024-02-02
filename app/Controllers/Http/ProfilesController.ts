import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class ProfilesController {
  public async getprofile({ params }: HttpContextContract) {
    return Profile.all()
  }
  public async getUsers({ params }: HttpContextContract) {
    return User.all()
  }
}
