import bcrypt from 'bcryptjs'

import type { Usuario, UsuarioBasic } from '../../domain/entities/Usuario.js'
import type { IUserRepository } from '../../domain/repositories/user.repository.js'
import { mapUsusarioToUsuarioBasic } from '../mappers/usuario.mappers.js'

export class RegisterUser {
  constructor (private readonly userRepository: IUserRepository) {}

  async execute (data: Usuario): Promise<UsuarioBasic | null> {
    const existing = await this.userRepository.findByEmail(data.correo)
    if (existing != null) throw new Error('el correo ya esta registrado')

    // todo: implementar bcrypt para el password_hash del usuario
    //

    // bcrypt
    const password = await bcrypt.hash(data.password_hash, 10)

    const usuario = await this.userRepository.save({ ...data, password_hash: password })
    if (usuario == null) return null
    return mapUsusarioToUsuarioBasic(usuario)
  }
}
