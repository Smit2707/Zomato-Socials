import axios from "axios";

const defaultBase = (typeof window !== "undefined" && window.location.hostname === "localhost")
  ? "http://localhost:3000/api"
  : "/api";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || defaultBase,
    withCredentials: true
});

export default instance;