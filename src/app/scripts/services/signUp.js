import axios from "axios";
import { endpoints } from "./data.js";

export const getUsers = async () => {
    const {data, status} = await axios.get(endpoints.urlUsers)
    if (status === 200) {
        return data
    }
    
}