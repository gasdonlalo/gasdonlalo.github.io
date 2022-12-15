import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../GUI/Layout";
import Home from "../components/pages/home/Home";
import Notfound from "../components/pages/Notfound";
import MontoFaltante from "../components/pages/MontoFaltante";
import Despacho from "../components/pages/Despacho";
import Chartprueba from "../components/charts/Chartprueba";
import Pdf_prueba from "../components/pdf_generador/Pdf_prueba";
import Checklist from "../components/pages/Checklist";

function Rutas() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<Notfound />} />
          <Route exact path="/despacho" element={<Despacho />} />
          <Route exact path="/montos-faltantes" element={<MontoFaltante />} />
          <Route exact path="/chart" element={<Chartprueba />} />
          <Route exact path="/pdf" element={<Pdf_prueba />} />
          <Route exact path="/checklist" element={<Checklist />} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default Rutas;
