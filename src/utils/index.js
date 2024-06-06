import axios from "axios";
export const internaAxios = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    headers: {
        'Content-Type': 'application/json'
    },
    maxBodyLength: Infinity,
})