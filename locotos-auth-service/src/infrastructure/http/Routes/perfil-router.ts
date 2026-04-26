import { Router } from 'express'

const perfilRouter: Router = Router()

perfilRouter.get('/prueba', (req, res) => {
  console.log('estamos en la api de perfiles')
})

export default perfilRouter
