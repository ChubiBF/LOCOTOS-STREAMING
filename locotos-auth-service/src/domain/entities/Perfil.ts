export interface Perfil {
  id_perfil: number
  id_usuario: number
  nombre: string
  avatar_url: string
  id_clasificacion_maxima: number
  idioma_preferido: string
  modo_oscuro: boolean
  fecha_creacion: string
}

export interface PerfilToRegister extends Omit<Perfil, 'id_perfil' | 'fecha_creacion'> {}
