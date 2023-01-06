import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import FormOrdtrabajo from "../../forms/FormOrdtrabajo";
import useGetData from "../../../hooks/useGetData";

function Ordtrabajomante(){
    const [data, setData] = useState([]);

    //recibe los datos del formulario
    const handle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value});
        console.log(data)
    };

    const empleado = useGetData("/empleado?departamento=5");

    const enviar = (e) => {
        e.preventDefault();
        enviarDatos();
        console.log(data);
    };

    //añade una ruta
    const enviarDatos = async () => {
        const resp = await Axios.post("/orden-trabajo-calidad", data);
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
                <Link className="Link-primary" to="/mantenimiento">
                    Volver a mantenimiento
                </Link>
                <h4 className="border-bottom">Orden de trabajo</h4>
                <FormOrdtrabajo datos={empleado} handle={handle} enviar={enviar} />

            </div>
        </div>
    )
}
export default Ordtrabajomante;