import { createPool } from 'mysql2/promise'
import { MySQLUserRepository } from './database/mysql-user.repository.js'
import { RegisterUser } from '../application/use-cases/auth/register-user.js'
import { UserController } from './http/Controllers/user-controller.js'
import { connectionConfig } from './database/mysql-config.js'
import { LoginUser } from '../application/use-cases/auth/login-user.js'

const pool = createPool({
  ...connectionConfig
})

// Repository
const userRepository = new MySQLUserRepository(pool)

// Use-case
const registerUser = new RegisterUser(userRepository)
const loginUser = new LoginUser(userRepository)

// Controller
const userController = new UserController(registerUser, loginUser)

export { userController }
