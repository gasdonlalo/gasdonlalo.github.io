import { useEffect, useState } from "react";
import Axios from "../Caxios/Axios";

export default function useGetData(url, actualizar) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    consultar(url)
      .then((res) => {
        setData(res.data);
        setIsPending(false);
      })
      .catch((err) => {
        setDataError(err.data);
        setError(true);
        setIsPending(false);
      });

    return () => {
      setData(null);
      setError(null);
      setDataError(null);
      setIsPending(true);
    };
  }, [url, actualizar]);

  return { data, error, dataError, isPending };
}

const consultar = (url) =>
  new Promise(async (resolve, reject) => {
    try {
      const consulta = await Axios.get(url);
      if (consulta.data.success) {
        resolve(consulta);
      } else {
        reject(consulta);
      }
    } catch (err) {
      reject(err.response);
    }
  });
