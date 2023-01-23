import Axios from "axios";
export default Axios.create({
  baseURL: "http://192.168.1.88:4000/api",
});
