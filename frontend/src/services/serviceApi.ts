import axios from "axios";
import { serviceAccount } from "./serviceAccount";

const groupomaniaApi = function() {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${serviceAccount.getToken()}`,
        },
    });
}

export default groupomaniaApi;