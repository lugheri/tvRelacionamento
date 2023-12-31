import axios from "axios";
import { urlBase } from "../utils/baseUrl";


const api = axios.create({
  baseURL: urlBase,
  headers:{
    Authorization: localStorage.getItem('Token')
  }
})

export default api;