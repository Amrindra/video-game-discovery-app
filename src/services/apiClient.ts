import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: `9e549586162346af8976ac9e8746c40c`
    }
})