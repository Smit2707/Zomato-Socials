import axios from "axios";

const defaultBase = (typeof window !== "undefined" && window.location.hostname === "localhost")
  ? "https://foodie-gram.onrender.com/api"
  : "http://localhost:3000/api";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || defaultBase,
    withCredentials: true
});

export default instance;