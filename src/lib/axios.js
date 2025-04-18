import axios from "axios";

const api = axios.create({
  baseURL: "https://finance-tracker-server-n2yh.onrender.com/api",
});

export default api;
