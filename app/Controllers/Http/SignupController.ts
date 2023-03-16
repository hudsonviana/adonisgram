import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class SignupController {
  public async index({ request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.confirmed()]),
      }),
      messages: {
        required: 'O campo {{ field }} é obrigatório.',
        'email.unique': 'Email não disponível.',
      },
    })

    const user = new User()
    user.name = req.name
    user.email = req.email
    user.password = req.password
    await user.save()

    return response.redirect('/')
  }
}
