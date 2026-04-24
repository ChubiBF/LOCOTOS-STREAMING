import express from 'express'

const PORT = process.env.PORT ?? 3000

const app = express()

app.get('/', (req, res) => {
  console.log('primera')
  res.send('<h1> HOLA BOLA</h1>')
})

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: http://localhost:${PORT}`)
})
