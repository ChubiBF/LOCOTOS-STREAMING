import { transporter } from './email-config.js'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = path.dirname(fileURLToPath(import.meta.url))

export class EmailService {
  private async getTemplate (templateName: string, replacements: Record<string, string>): Promise<string> {
    const filePath = path.join(_dirname, 'email-templates', `${templateName}.html`)
    let content = await fs.readFile(filePath, 'utf-8')

    Object.entries(replacements).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}`, 'g'), value)
    })

    return content
  }

  async sendVerificationEmail (to: string, nombre: string, codigo: string): Promise<void> {
    const html = await this.getTemplate('verification', { nombre, codigo })
    if (process.env.EMAIL_USER === undefined) return
    await transporter.sendMail({
      from: `Locotos Streaming <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Verificar Correo para registro',
      html
    })
  }

  async sendPasswordResetEmail (to: string, nombre: string, enlace: string): Promise<void> {
    const html = await this.getTemplate('password-reset', { nombre, enlace_reset: enlace })
    if (process.env.EMAIL_USER === undefined) return
    await transporter.sendMail({
      from: `"Seguridad de los locotos" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Reestablecer nueva contrasena',
      html
    })
  }

  async sendWelcomeEmail (to: string, nombre: string, enlace: string): Promise<void> {
    const html = await this.getTemplate('welcome', { nombre, enlace_app: enlace })
    if (process.env.EMAIL_USER === undefined) return
    await transporter.sendMail({
      from: `"Bienvenida de los locotos" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Bienvenida a Locotos Streaming',
      html
    })
  }
}
