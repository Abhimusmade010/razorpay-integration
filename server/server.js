import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// import routes from './routes/routes.js'
import routes from './routes/routes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
// Middleware
app.use(cors())
app.use(express.json())

// Routes
// app.use('/api/payment', routes)
app.use('/api/payment', routes)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
