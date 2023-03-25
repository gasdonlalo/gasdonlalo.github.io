import Axios from "axios";

const crendentials = JSON.parse(localStorage.getItem("Credentials"));
const token = crendentials ? crendentials.token.token : null;
export default Axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
<<<<<<< HEAD
  baseURL: "http://127.0.0.1:4000/api",
=======
  baseURL: "http://10.42.0.1:4000/api",
>>>>>>> a449d8a05542284046e6b7edbc98d2c41b749fd2
});
