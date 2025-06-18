import axios from "axios";

export const getData = () => {
    return axios.get("http://localhost:3000/").then((res) => {
        return res.data;
    })
}