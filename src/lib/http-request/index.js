import axios from "axios";

console.log(import.meta.env.VITE_SERVER_URL, "url");
export default axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
