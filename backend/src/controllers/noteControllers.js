import Note from "../models/note.js"

export async function getNote(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error getNote controller", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({_id:req.params.id})
    if (!note) return res.status(404).json({ message: "Note not found!" })

    res.status(200).json(note)
  } catch (error) {
    console.error("Error getNoteById controller", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export async function createNote(req, res) {
  const { title, content } = req.body
  try {
    const newNote = new Note({ title, content })
    await newNote.save()
    res.status(201).json({ message: "Success create note" })
  } catch (error) {
    console.error("Can't make createNote request", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export async function updateNote(req, res) {
  const { title, content } = req.body

  try {
    const getNote = await Note.findByIdAndUpdate(req.params.id, { title, content })
    if (!getNote) return res.status(404).json({ message: "Note not found" })

    res.status(201).json({ message: "Success update note" })

  } catch (error) {
    console.error("Can't update note request", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if (!deleteNote) return res.status(404).json({ message: "Note is not found!" })

    res.status(200).json({ message: "Success deleting note..." })
  } catch (error) {
    console.error("Can't delete note", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}