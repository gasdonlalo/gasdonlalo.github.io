import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import FormRetardos from "../../forms/FormRetardos";
import useGetData from "../../../hooks/useGetData";

function FaltasRetardos(){
    const [data, setData] = useState([]);

    //recibe los datos del formulario
    const handle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value});
        console.log(data)
    };

    const empleado = useGetData("/empleado?departamento");

    const enviar = (e) => {
        e.preventDefault();
        enviarDatos();
        console.log(data);
    };

    //añade una ruta
    const enviarDatos = async () => {
        const resp = await Axios.post("", data);
        console.log(resp);
        if (resp.status === 200) {
            window.alert("correcto");
        } else {
            window.alert("incorrecto");
        }
        console.log(resp)
    };

    return (
        <div className="Main">
            <div>
                <Link className="Link-primary" to="/recursos-humanos">
                    Volver a recursos humanos
                </Link>
                <h4 className="border-bottom">Faltas y Retardos</h4>
                <FormRetardos datos={empleado} handle={handle} enviar={enviar} />

            </div>
        </div>
    )
}
export default FaltasRetardos;