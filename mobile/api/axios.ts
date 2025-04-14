import axios from "axios";
export const api = axios.create({
    baseURL: 'https://skoh3t8i69.execute-api.eu-west-2.amazonaws.com/prod/'
})