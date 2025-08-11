import express from 'express'
import * as noteController from "../controllers/noteControllers.js"
import rateLimiter from '../middleware/rateLimiter.js'

const noteRoute = express.Router()

noteRoute.get("/", noteController.getNote)
noteRoute.get("/:id", noteController.getNoteById)
noteRoute.post("/", rateLimiter, noteController.createNote)
noteRoute.put("/:id", rateLimiter, noteController.updateNote)
noteRoute.delete("/:id", noteController.deleteNote)

export default noteRoute