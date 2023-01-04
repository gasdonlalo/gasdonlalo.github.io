import Axios from "axios";
export default Axios.create({
  baseURL: "http://192.168.137.87:4000/api",
});
