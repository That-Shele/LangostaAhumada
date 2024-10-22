import axios from "axios";

const Axios = axios.create({
  baseURL: "https://localhost:7243/api",
});

export default Axios;
