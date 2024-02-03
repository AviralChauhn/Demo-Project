import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
// import { formatDate } from '@ioc:Adonis/Core/Helpers'

export default class ProfilesController {
  public async getprofile({ auth, response }: HttpContextContract) {
    try {
      const userId = auth.user?.id
      const profile = await Profile.findByOrFail('user_id', userId)
      const formattedProfile = {
        ...profile.serialize(),
        dateOfBirth: DateTime.fromJSDate(profile.dateOfBirth).toFormat('yyyy-MM-dd'),
      }
      const responseData = {
        email: auth.user?.email,
        name: formattedProfile.name,
        gender: formattedProfile.gender,
        dateOfBirth: formattedProfile.dateOfBirth,
      }
      return response.ok(responseData)
    } catch (err) {
      return response.notFound({ message: 'Profile Not Found' })
    }
  }

  public async createprofile({ request, response, auth }: HttpContextContract) {
    const validations = schema.create({
      name: schema.string({}, [rules.minLength(3), rules.maxLength(30)]),
      mobileNumber: schema.string({}, [rules.regex(/^[0-9]{10}$/)]),
      gender: schema.enum(['MALE', 'FEMALE']),
      dateOfBirth: schema.date({ format: 'yyyy-MM-dd' }),
    })

    const data = await request.validate({ schema: validations })
    const userId = auth.user?.id
    const existingProfile = await Profile.query().where('user_id', userId).first()
    if (existingProfile) {
      return response.badRequest({ message: 'User already has a profile.' })
    }
    const profile = await Profile.create({ ...data, user_id: userId })
    response.created('profile created')
  }
  public async updateProfile({ request, response, auth }: HttpContextContract) {
    const validations = schema.create({
      name: schema.string.optional({}, [rules.minLength(3), rules.maxLength(30)]),
      mobileNumber: schema.string.optional({}, [rules.regex(/^[0-9]{10}$/)]),
      gender: schema.enum.optional(['MALE', 'FEMALE']),
      dateOfBirth: schema.date.optional({ format: 'yyyy-mm-dd' }),
    })
    const data = await request.validate({ schema: validations })
    const userId = auth.user?.id
    const existingProfile = await Profile.query().where('user_id', userId).first()
    if (!existingProfile) {
      return response.badRequest({ message: 'Profile not found!!' })
    }
    await existingProfile.merge(data).save()
    response.send('Profile Updated!!!!')
  }
  public async deleteProfile({ request, response, auth }: HttpContextContract) {
    const userId = auth.user?.id
    const validation = schema.create({
      mobileNumber: schema.string({}, [rules.regex(/^[0-9]{10}$/)]),
    })
    const { mobileNumber } = await request.validate({ schema: validation }).catch((error) => {
      return response.status(400).send('Validation failed')
    })
    const profile = await Profile.query().where('mobile_number', mobileNumber).first()
    if (!profile) {
      return response.status(404).send('Profile not found')
    }
    const user = await User.findBy('id', userId)
    if (!user) {
      return response.status(404).send('User not found')
    }
    await profile.delete()
    await user.delete()
    return response.send('User and Profile Deleted')
  }
}
