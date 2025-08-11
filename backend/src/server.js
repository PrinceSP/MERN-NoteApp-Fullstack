import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import noteRoute from './routes/noteRoute.js'
import userRoute from './routes/userRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000  // Changed from 5009 to 5000
const HOST = '0.0.0.0'  // Added host binding

//middleware
app.use(cors({ origin: '*' }));

app.use(express.json())

app.use("/api/notes", noteRoute)
app.use("/api/user", userRoute)

app.use("/", (_, res) => {
  res.status(200).send(`Listening on http://${HOST}:${PORT}`)
})

connectDB().then(() => {
  app.listen(PORT, HOST, () => {  // Added HOST parameter
    console.log(`Listening on http://${HOST}:${PORT}`)
  })
})
