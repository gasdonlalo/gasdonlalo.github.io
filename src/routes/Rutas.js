import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "../components/pages/Notfound";
import Layout from "../GUI/Layout";
import Home from "../components/pages/home/Home";
// Importacion de despacho
import Despacho from "../components/pages/Despacho";
import MontoFaltante from "../components/pages/despacho/MontoFaltante";
import ChecklistBomba from "../components/pages/despacho/ChecklistBomba";
import EvalUniforme from "../components/pages/despacho/EvalUniforme";
import RecolEfect from "../components/pages/despacho/RecolEfect";
import Pasosdespachar from "../components/pages/despacho/Pasosdespachar";
import RecursosDesp from "../components/pages/despacho/RecursosDesp";
import SalidaNoConforme from "../components/pages/salidaNoConforme/SalidaNoConforme";
import SNR from "../components/pages/salidaNoConforme/SalidasNoConformesReportes";
//importacion de graficos despacho
import GMF from "../components/pages/despacho/reporteria/GraficaMontofaltante";
import CCB from "../components/pages/despacho/reporteria/GraficaChecklist";
import GEU from "../components/pages/despacho/reporteria/GraficaEvUnifome";
import DRE from "../components/pages/despacho/reporteria/GraficaRecolEfectivo";
import GPD from "../components/pages/despacho/reporteria/GraficaPasoDes";
import GRD from "../components/pages/despacho/reporteria/GraficaRecursosDes";
import GMSN from "../components/pages/salidaNoConforme/SalidaNoConformeGraficaMensual";
//importaciones recursos humanos
import RecursosHumanos from "../components/pages/RecursosHumanos";
import SolicitudesEmpleo from "../components/pages/RecursosHumanos/SolicitudesEmpleo";
//importaciones Calidad
import Calidad from "../components/pages/Calidad";
import Ordtrabajo from "../components/pages/calidad/OrdenTrabajo";

function Rutas() {
  return (
    <Router>
      <Routes>
        {/* Rutas de despacho */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Notfound />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="salida-no-conforme-reportes" />
          <Route path="salida-no-conforme-reporte-mensual" element={<GMSN />} />
        </Route>
        <Route path="/despacho" element={<Layout />}>
          <Route index element={<Despacho />} />;
          <Route path="montos-faltantes" element={<MontoFaltante />} />;
          <Route path="montos-faltantes-reporte" element={<GMF />} />;
          <Route path="checklist" element={<ChecklistBomba />} />;
          <Route path="checklist-reporte" element={<CCB />} />;
          <Route path="evaluacion-uniforme" element={<EvalUniforme />} />;
          <Route path="evaluacion-uniforme-reporte" element={<GEU />} />;
          <Route path="recoleccion-efectivo" element={<RecolEfect />} />;
          <Route path="recoleccion-efectivo-reporte" element={<DRE />} />;
          <Route path="pasos-despachar" element={<Pasosdespachar />} />;
          <Route path="pasos-despachar-reporte" element={<GPD />} />;
          <Route path="recurso-despachador" element={<RecursosDesp />} />;
          <Route path="recurso-despachador-reporte" element={<GRD />} />
          <Route path="salida-no-conforme" element={<SalidaNoConforme />} />
          <Route path="salida-no-conforme-files" element={<SNR />} />; ;
          <Route path="*" element={<Notfound />} />
        </Route>

        {/* rutas para recursos humanos */}
        <Route path="/recursos-humanos" element={<Layout />}>
        <Route index element={<RecursosHumanos/> } />;
          <Route path="captura-solicitud" element={<SolicitudesEmpleo />} />
        </Route>

        {/* Rutas para calidad */}
        <Route path="/calidad" element={<Layout />}>
          <Route index element={<Calidad />} />
          <Route path="orden-trabajo" element={<Ordtrabajo/> } />
        </Route>

      </Routes>
    </Router>
  );
}
export default Rutas;
