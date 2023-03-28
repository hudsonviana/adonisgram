import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import Post from 'App/Models/Post'

export default class PostsController {
  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        caption: schema.string(),
        image: schema.file({
          size: '2MB',
          extnames: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
        }),
      }),
      messages: {
        required: 'Campo obrigatório.',
        'file.size': 'O tamanho do arquivo não deve exceder {{ options.size }}',
        'file.extname':
          'Extensão de arquivo inválida. Apenas {{ options.extnames }} são permitidos',
      },
    })

    const user = auth.user!

    const imageName = new Date().getTime().toString() + `.${req.image.extname}`
    await req.image.move(Application.publicPath('images'), {
      name: imageName,
    })

    const post = new Post()
    post.image = `images/${imageName}`
    post.caption = req.caption
    post.userId = user.id
    await post.save()
    return response.redirect(`/${user.username}`)
  }

  // public async xxx({}: HttpContextContract) {}
}
