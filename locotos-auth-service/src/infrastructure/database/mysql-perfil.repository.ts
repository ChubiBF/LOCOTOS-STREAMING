import type { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import type { IperfilRepository } from '../../domain/repositories/perfil.repository.js'
import type { Perfil, PerfilToRegister } from '../../domain/entities/Perfil.js'
import { mapPerfilResultToPerfil, mapRowToPerfilList } from '../../application/mappers/perfil.mappers.js'

export class MySQLPerfilRepository implements IperfilRepository {
  constructor (private readonly db: Pool) {}

  async save (perfil: Partial <PerfilToRegister>): Promise<Perfil | null> {
    try {
      const query = 'INSERT INTO Perfil (id_usuario, nombre, avatar_url, id_clasificacion_maxima, idioma_preferido, modo_oscuro) VALUES (?,?,?,?,?,?)'

      const values = [
        perfil.id_usuario ?? null,
        perfil.nombre ?? null,
        perfil.avatar_url ?? null,
        perfil.id_clasificacion_maxima ?? null,
        perfil.idioma_preferido ?? null,
        perfil.modo_oscuro ?? null
      ]

      const [result] = await this.db.execute<ResultSetHeader>(query, values)
      if (result.affectedRows === 0) return null
      const newPerfil = mapPerfilResultToPerfil({ id_perfil: result.insertId, ...perfil, fecha_creacion: new Date().toISOString() })
      return newPerfil
    } catch (e) {
      console.log({ e })
      return null
    }
  }

  async findByUsuarioId (usuarioId: number): Promise<Perfil[]> {
    if (usuarioId <= 0) return []
    try {
      const query = `SELECT id_perfil, id_usuario, nombre, avatar_url, id_clasificacion_minima, idioma_preferido, modo_oscuro, fecha_creacion
     FROM Perfil WHERE id_usuario = ? `

      const [rows] = await this.db.execute<RowDataPacket[]>(query, [usuarioId])

      if (rows.length === 0 || rows[0] === undefined) return []

      const PerfilList = mapRowToPerfilList(rows)
      return PerfilList
    } catch {
      return []
    }
  }

  async delete (id: number): Promise<boolean> {
    if (id <= 0) return false
    try {
      const query = 'DELETE FROM Perfil WHERE id_perfil = ?'
      const [result] = await this.db.execute<ResultSetHeader>(query, [id])

      if (result.affectedRows > 0) return true
    } catch {
      return false
    }
    return false
  }
}
