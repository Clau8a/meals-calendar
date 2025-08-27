import express from 'express'
//@ts-ignore
import mealsRouter from './routes/mealsRoutes'

const app = express()
const PORT = 3001

app.use(express.json())

app.use('/meals', mealsRouter)

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error listening: ', err)
    return
  }
  console.log(`listening at port :${PORT}`)
})
