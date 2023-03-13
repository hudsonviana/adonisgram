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

Route.post('/signup', 'SignupController.index')
