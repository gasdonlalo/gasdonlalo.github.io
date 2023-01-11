import Axios from "axios";
export default Axios.create({
  baseURL: "http://192.168.56.1:4000/api",
  //baseURL: "http://192.168.0.103:4000/api",
});
