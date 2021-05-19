import axios from "axios";

const api = axios.create({
  baseURL: "ttp://62.171.190.108:8007",
});

export default api