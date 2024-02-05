/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import RegistersController from 'App/Controllers/Http/RegistersController'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.get('/user/profile', 'ProfilesController.getprofile').middleware('auth')
Route.post('/user/profile', 'ProfilesController.createprofile').middleware('auth')
Route.put('/user/profile', 'ProfilesController.updateProfile').middleware('auth')
Route.delete('/user/profile', 'ProfilesController.deleteProfile').middleware('auth')
Route.post('/logout', 'RegistersController.logout').middleware('auth')
Route.post('/signup', 'RegistersController.index')
Route.post('/login', 'RegistersController.login')
