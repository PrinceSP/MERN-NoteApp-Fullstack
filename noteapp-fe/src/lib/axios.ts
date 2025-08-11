import axios from "axios"

const base_url = import.meta.env.MODE === "development" ? "http://3.107.189.77:5000/api" : "/api"

const api = axios.create({
  baseURL: base_url
})

export default api