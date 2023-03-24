import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
}).middleware('guest')

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
}).middleware('guest')

Route.get('/verify-email/:email', 'EmailVerifiesController.confirm').as(
  'verifyEmail'
)

Route.post('/verify-email', 'EmailVerifiesController.index').middleware('auth')
Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')

Route.get('/accounts/edit', 'ProfilesController.edit').middleware('auth')
Route.post('/accounts/edit', 'ProfilesController.update').middleware('auth')
Route.get('/:username', 'ProfilesController.index').middleware('auth')
