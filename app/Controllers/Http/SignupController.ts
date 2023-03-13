import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignupController {
  public async index({ request }: HttpContextContract) {
    return request.all()
  }
}
