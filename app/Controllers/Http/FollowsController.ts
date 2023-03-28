import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following'

export default class FollowsController {
  public async store({ response, params, auth }: HttpContextContract) {
    const follow = new Following()
    follow.userId = auth.user!.id
    follow.followingId = params.userid
    await follow.save()

    return response.redirect().back()
  }
}
