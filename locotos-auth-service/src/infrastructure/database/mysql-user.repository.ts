import { IUserRepository } from '../../domain/repositories/user.repository.js'
import { Usuario } from '../../domain/entities/Usuario.js'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { mapRowToUsuario } from '../../application/mappers/usuario.mappers.js'

export class MySQLUserRepository implements IUserRepository {
  constructor (private readonly db: Pool) {}

  async save (user: Usuario): Promise<Usuario | null> {
    const query = 'INSERT INTO Usuario (nombre, correo, password_hash, tipo_usuario) VALUES (?, ?, ?, ?)'

    const [result] = await this.db.execute(query, [user.nombre, user.correo, user.password_hash, user.tipo_usuario])

    const insertResult = result as any
    if (insertResult.affectedRows === 0) return null

    return {
      ...user,
      id_usuario: insertResult.insertId
    }
  }

  async findByEmail (email: string): Promise<Usuario | null> {
    const query = 'SELECT id_usuario, nombre, correo, password_hash, tipo_usuario, estado, fecha_registro FROM Usuario WHERE correo = ?'

    const [rows] = await this.db.execute<RowDataPacket[]>(query, [email])

    if (rows.length === 0) return null
    return mapRowToUsuario(rows[0])
  }

  async findById (id: number): Promise<Usuario | null> {
    const query = 'SELECT id_usuario, nombre, correo, password_hash, tipo_usuario, estado, fecha_registro FROM Usuario WHERE id_usuario = ?'

    const [rows] = await this.db.execute<RowDataPacket[]>(query, [id])

    if (rows.length === 0) return null
    return mapRowToUsuario(rows[0])
  }
}
