import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async signup({ request, response }: HttpContextContract) {
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

    user?.sendVerificationEmail()
    return response.redirect('/')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(3)]),
      }),
      messages: {
        required: 'Campo obrigatório.',
        email: 'Informe um email válido.',
        minLength: 'Necessário no mínimo {{ options.minLength }} caracteres.',
      },
    })

    const email = req.email
    const password = req.password

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/profile')
      // return { status: 'usuário logado' }
    } catch (error) {
      return response.badRequest('Credenciais inválidas.')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}
