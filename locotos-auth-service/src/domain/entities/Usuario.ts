import { estadoUsuario, tipoUsuario } from '../../types.js'

export interface UsuarioBasic {
  id_usuario: number
  nombre: string
  correo: string
  tipo_usuario: tipoUsuario
  estado: estadoUsuario
  fecha_registro: string
}

export interface Usuario extends UsuarioBasic {
  password_hash: string
}
