import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class EmailVerifiesController {
  public async index({ auth, response, session }: HttpContextContract) {
    auth.user?.sendVerificationEmail(session)
    return response.redirect().back()
  }

  public async confirm({ response, params, session }: HttpContextContract) {
    const { userid, token } = params
    const user = await User.findOrFail(userid)
    const sessionToken = session.get(`token-${userid}`)
    if (sessionToken === token) {
      user.email_verified_at = DateTime.local()
      await user.save()
      session.forget(`token-${userid}`)
      response.redirect('/profile')
    } else {
      return 'Token inválido'
    }
  }
}
