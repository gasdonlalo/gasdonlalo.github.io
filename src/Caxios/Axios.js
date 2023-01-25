import Axios from "axios";
export default Axios.create({
  baseURL: "http://192.168.1.89:4000/api",
});
