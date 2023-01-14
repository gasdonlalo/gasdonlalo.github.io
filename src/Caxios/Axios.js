import Axios from "axios";
export default Axios.create({
  baseURL: "http://192.168.10.99:4000/api",
});
