import axios from "axios";

const api = axios.create({
  baseURL: "https://dragonball-api.com/api",
  timeout: 5000
});

export default api;
