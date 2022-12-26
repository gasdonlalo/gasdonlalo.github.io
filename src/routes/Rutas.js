import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../GUI/Layout";
import Home from "../components/pages/home/Home";
import Notfound from "../components/pages/Notfound";
import MontoFaltante from "../components/pages/despacho/MontoFaltante";
import Despacho from "../components/pages/Despacho";
import Chartprueba from "../components/charts/Chartprueba";
import Pdfprueba from "../components/pdf_generador/Pdfprueba";
import Checklist from "../components/pages/despacho/Checklist";
import EvalUniforme from "../components/pages/despacho/EvalUniforme";
import GraficaMontofaltante from "../components/pages/despacho/reporteria/GraficaMontofaltante";
import GraficaChecklist from "../components/pages/despacho/reporteria/GraficaChecklist";
import Graficauniforme from "../components/pages/despacho/reporteria/Graficauniforme";
import OrdenTrabajo from "../components/pages/calidad/OrdenTrabajo";
import DetalleMantenimiento from "../components/pages/calidad/DetalleMantenimiento";
import RecolEfect from "../components/pages/despacho/RecolEfect";
import Pasosdespachar from "../components/pages/despacho/Pasosdespachar";
import RecursosDesp from "../components/pages/despacho/RecursosDesp";

function Rutas() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<Notfound />} />
          <Route exact path="/despacho" element={<Despacho />} />
          <Route
            exact
            path="/despacho/montos-faltantes"
            element={<MontoFaltante />}
          />
          <Route exact path="/despacho/checklist" element={<Checklist />} />
          <Route
            exact
            path="/despacho/evaluacion-uniforme"
            element={<EvalUniforme />}
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
            path="/despacho/reporteria/registro-checklist"
            element={<GraficaChecklist />}
          />
          <Route
            exact
            path="/despacho/reporteria/uniforme"
            element={<Graficauniforme />}
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
        </Routes>
      </Layout>
    </Router>
  );
}
export default Rutas;
