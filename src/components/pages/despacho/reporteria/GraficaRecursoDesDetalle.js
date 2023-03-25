import { useParams } from 'react-router-dom'
import HeaderComponents from '../../../../GUI/HeaderComponents';


const GraficaRecursoDesDetalle = () => {
  const {idEmpleado} = useParams();
  console.log(idEmpleado);
  return (<div className='Main'>
    <HeaderComponents title="Detalles de despacho recursos humanos" urlBack="../" textUrlback="Regresar">

    </HeaderComponents>
    <div>GraficaRecursoDesDetalle</div>
    </div>
  )
}

export default GraficaRecursoDesDetalle