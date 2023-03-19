import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailVerifiesController {
  public async index({ auth, response }: HttpContextContract) {
    auth.user?.sendVerificationEmail()
    return response.redirect().back()
  }
}
