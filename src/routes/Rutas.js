import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../GUI/Layout";
import Home from "../components/pages/home/Home";
import Notfound from "../components/pages/Notfound";
import MontoFaltante from "../components/pages/despacho/MontoFaltante";
import Despacho from "../components/pages/Despacho";
import Chartprueba from "../components/charts/Chartprueba";
import Pdfprueba from "../components/pdf_generador/Pdfprueba";
import ChecklistBomba from "../components/pages/despacho/ChecklistBomba";
import EvalUniforme from "../components/pages/despacho/EvalUniforme";
import GraficaMontofaltante from "../components/pages/despacho/reporteria/GraficaMontofaltante";
import GraficaChecklist from "../components/pages/despacho/reporteria/GraficaChecklist";
import OrdenTrabajo from "../components/pages/calidad/OrdenTrabajo";
import DetalleMantenimiento from "../components/pages/calidad/DetalleMantenimiento";
import DetallesMontoFaltante from "../components/pages/despacho/DetallesMontoFaltante";
import MontoFaltanteEmpleado from "../components/pages/despacho/MontoFaltanteEmpleado";
import SalidaNoConforme from "../components/pages/salidaNoConforme/SalidaNoConforme";
import PDFSalidaNoConforme from "../components/pages/despacho/PDFSalidaNoConforme";

function Rutas() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<Notfound />} />
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
            path="/salidas-no-conformes"
            element={<SalidaNoConforme />}
          />

          <Route exact path="/chart" element={<Chartprueba />} />
          <Route exact path="/pdf" element={<Pdfprueba />} />
          <Route
            exact
            path="/luis"
            element={
              <PDFSalidaNoConforme
                inconformidad="A nusez"
                fecha={"asdasdd"}
              ></PDFSalidaNoConforme>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
export default Rutas;
