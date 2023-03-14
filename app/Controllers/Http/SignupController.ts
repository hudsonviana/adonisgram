import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SignupController {
  public async index({ request }: HttpContextContract) {
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
    console.log(req)
    return request.all()
  }
}
