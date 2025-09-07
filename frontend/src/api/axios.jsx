import axios from "axios";

const instance = axios.create({
    baseURL:"https://foodie-gram.onrender.com/api",
    withCredentials: true
})

export default instance;