import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Navbar from "../components/navbar"
import Notes from "../components/notes"
import api from "../lib/axios"
import NotesNotFound from "../components/notesNoteFound"

interface NoteData {
  title: string
  content: string
  _id: string
  createdAt: string
}

const Home = () => {
  const [notes, setNotes] = useState<NoteData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${api}/notes`);

      let fetchedNotes: NoteData[] = [];

      if (Array.isArray(res.data)) {
        fetchedNotes = res.data;
      } else if (res.data && Array.isArray(res.data.notes)) {
        fetchedNotes = res.data.notes;
      }

      setNotes(fetchedNotes);

    } catch (error) {
      if (error instanceof TypeError) {
        toast.error('Network error occurred')
      } else {
        toast.error('Failed to load notes')
      }
      setNotes([]);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <p className="text-center text-primary py-10">Loading notes...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(notes) && notes.length > 0 ? (notes || []).map(item =>
            <Notes key={item._id} item={item} setNotes={setNotes} />
          ) :
            <NotesNotFound />}
        </div>
      </div>
    </div>
  )
}

export default Home