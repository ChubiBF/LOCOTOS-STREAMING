import type { Usuario } from '../entities/Usuario.js'

export interface IUserRepository {
  save: (user: Usuario) => Promise<Usuario | null>
  findByEmail: (email: string) => Promise<Usuario | null>
  findById: (id: number) => Promise<Usuario | null>
}
