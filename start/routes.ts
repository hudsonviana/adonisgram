import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
})

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
})

Route.group(() => {
  Route.get('/profile', async ({ view }) => {
    return view.render('profile')
  })
}).middleware('auth')

Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')
