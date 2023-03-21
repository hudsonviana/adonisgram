import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async signup({ request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        name: schema.string([
          rules.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s´`^~]+$/),
          rules.maxLength(50),
          rules.trim(),
        ]),
        email: schema.string({}, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
          rules.maxLength(50),
        ]),
        username: schema.string({}, [rules.maxLength(25)]),
        password: schema.string({}, [rules.minLength(6), rules.maxLength(15)]),
      }),
      messages: {
        email: 'Email inválido.',
        required: 'O campo {{ field }} é obrigatório.',
        minLength: 'Necessário pelo menos {{ options.minLength }} caracteres.',
        maxLength: 'Permitido no máximo {{ options.maxLength }} caracteres.',
        'email.unique': 'Email já cadastrado.',
        'name.regex': 'Inseridos caracteres inválidos para um nome.',
      },
    })

    const user = new User()
    user.name = req.name
    user.email = req.email
    user.username = req.username
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
    } catch (error) {
      return response.badRequest('Credenciais inválidas.')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}
