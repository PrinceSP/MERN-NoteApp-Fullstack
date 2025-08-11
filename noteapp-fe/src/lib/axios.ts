import axios from "axios"

const base_url = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"

const api = axios.create({
  baseURL: base_url
})

export default api