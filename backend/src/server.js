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
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: ["http://localhost:5173", "http://3.107.189.77"]  // Added your public IP
  }))
} else {
  // In production, allow your domain
  app.use(cors({
    origin: ["http://3.107.189.77", "https://3.107.189.77", "http://localhost:5173"]  // Add your domain here
  }))
}

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
