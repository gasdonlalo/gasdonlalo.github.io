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
        <Route path="salida-no-conforme-reportes" />
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
          <Route path="salida-no-conforme-files" element={<SNR />} />;
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
      {/* <Routes>
        <Route path="*" element={<Layout />}>
          <Route index element={<Notfound />} />
        </Route>
      </Routes> */}
      {/* <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<Notfound />} />
          <Route exact path="/calidad" element={<Calidad />} />
          <Route
            exact
            path="/calidad/ordenes-de-trabajo/:year/:month/:idEstacion"
            element={<OrdenTrabajo />}
          />
          <Route exact path="/despacho" element={<Despacho />} />
          <Route
            exact
            path="/calidad/ordenes-de-trabajo/:year/:month/:idEstacion/:mantenimiento/:idMantenimiento"
            element={<DetalleMantenimiento />}
          />
          <Route exact path="/calidad/Ordtrabajo" element={<Ordtrabajo />} />
          <Route
            exact
            path="/calidad/DetalleMantenimiento"
            element={<DetalleMantenimiento />}
          />
          <Route exact path="/despacho" element={<Despacho />} />
          <Route
            exact
            path="/despacho/montos-faltantes"
            element={<MontoFaltante />}
          />
          <Route
            exact
            path="/despacho/montos-faltantes/detalles"
            element={<DetallesMontoFaltante />}
          />
          <Route
            exact
            path="/despacho/recoleccion-de-efectivo"
            element={<RecolEfect />}
          />
          <Route
            exact
            path="/despacho/pasos-para-despachar"
            element={<Pasosdespachar />}
          />
          <Route
            exact
            path="/despacho/recursos-despachador"
            element={<RecursosDesp />}
          />
          <Route
            exact
            path="/despacho/reporteria/monto-faltante"
            element={<GraficaMontofaltante />}
          />
          <Route
            exact
            path="/despacho/reporteria/monto-faltante/empleado"
            element={<MontoFaltanteEmpleado />}
          />
          <Route
            exact
            path="/despacho/checklist"
            element={<ChecklistBomba />}
          />
          <Route
            exact
            path="/despacho/evaluacion-uniforme"
            element={<EvalUniforme />}
          />
          <Route
            exact
            path="/despacho/reporteria/registro-checklist"
            element={<GraficaChecklist />}
          />
          <Route
            exact
            path="/despacho/reporteria/uniforme"
            element={<GraficaEvUnifome />}
          />
          <Route
            exact
            path="/salidas-no-conformes"
            element={<SalidaNoConforme />}
          />

          <Route exact path="/chart" element={<Chartprueba />} />
          <Route exact path="/pdf" element={<Pdfprueba />} />
          <Route
            exact
            path="/calidad/ordenes-de-trabajo/:year/:month/:idEstacion"
            element={<OrdenTrabajo />}
          />
          <Route
            exact
            path="/calidad/ordenes-de-trabajo/:year/:month/:idEstacion/:mantenimiento/:idMantenimiento"
            element={<DetalleMantenimiento />}
          />
          <Route
            exact
            path="/reporteria/salidas-no-conformes"
            element={<SalidasNoConformesReportes />}
          />
          <Route
            exact
            path="/despacho/reporteria/recoleccion-efectivo"
            element={<GraficaRecolEfectivo />}
          />
          <Route
            exact
            path="/despacho/reporteria/evaluacion-despachar"
            element={<GraficaPasoDes />}
          />
        </Routes>
      </Layout> */}
    </Router>
  );
}
export default Rutas;
