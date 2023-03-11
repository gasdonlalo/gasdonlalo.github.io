import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "../components/pages/Notfound";
import Layout from "../GUI/Layout";
import Home from "../components/pages/home/Home";
import Auth from "../GUI/Auth";
// Importacion de despacho
import Despacho from "../components/pages/Despacho";
import MontoFaltante from "../components/pages/despacho/MontoFaltante";
import MFE from "../components/pages/despacho/reporteria/MontoFaltanteEmpleado";
import ChecklistBomba from "../components/pages/despacho/ChecklistBomba";
import CheckBombaInfo from "../components/pages/despacho/ChecklistBombaDetalle";
import EvalUniforme from "../components/pages/despacho/EvalUniforme";
import DHEU from "../components/pages/despacho/reporteria/HistorialEvUnifome";
import RecolEfect from "../components/pages/despacho/RecolEfect";
import DHREE from "../components/pages/despacho/reporteria/HistorialRelEfectivo";
import Pasosdespachar from "../components/pages/despacho/Pasosdespachar";
import DHPD from "../components/pages/despacho/reporteria/HistorialPasoDes";
import RecursosDesp from "../components/pages/despacho/RecursosDesp";
import DHRD from "../components/pages/despacho/reporteria/HistorialRecursoDes";
import SalidaNoConforme from "../components/pages/salidaNoConforme/SalidaNoConforme";
import SNR from "../components/pages/salidaNoConforme/SalidasNoConformesReportes";
import SNCP from "../components/pages/salidaNoConforme/SalidaNoConformePendiente";
import SNCPET from "../components/pages/salidaNoConforme/PorEmpleadoTipo";
import OrdenIsla from "../components/pages/despacho/OrdenIsla";
import DHOL from "../components/pages/despacho/reporteria/HistorialOyL";

//importacion de graficos despacho
import GMF from "../components/pages/despacho/reporteria/GraficaMontofaltante";
import MFT from "../components/pages/despacho/reporteria/HistorialFaltanteTiempo";
import CCB from "../components/pages/despacho/reporteria/GraficaChecklist";
import GEU from "../components/pages/despacho/reporteria/GraficaEvUnifome";
import DRE from "../components/pages/despacho/reporteria/GraficaRecolEfectivo";
import GPD from "../components/pages/despacho/reporteria/GraficaPasoDes";
import GRD from "../components/pages/despacho/reporteria/GraficaRecursosDes";
import GMSN from "../components/pages/salidaNoConforme/SalidaNoConformeGraficaMensual";
import GOYL from "../components/pages/despacho/reporteria/GraficaOyL";
import GSNI from "../components/pages/salidaNoConforme/SalidaInconformidadesGrafica";
import GOYLE from "../components/pages/despacho/reporteria/GraficaOyLEmpleado";
//importaciones recursos humanos
import RecursosHumanos from "../components/pages/RecursosHumanos";
import SolicitudesEmpleo from "../components/pages/RecursosHumanos/SolicitudesEmpleo";
import AltaBaja from "../components/pages/RecursosHumanos/AltaBaja";
import FaltasRetardos from "../components/pages/RecursosHumanos/FaltasRetardos";
import ConcursoMadrugador from "../components/pages/RecursosHumanos/Reportes/ConcursoMadrugador";
import Departamentos from "../components/pages/RecursosHumanos/Departamentos";
import EntregaRecurso from "../components/pages/RecursosHumanos/EntregaRecurso";
import ERR from "../components/pages/RecursosHumanos/Reportes/EntregaRecursoRegistro";
import RGA from "../components/tablas/RegistrosAceitoso";
// Importación gráficos recursos
import FRG from "../components/pages/RecursosHumanos/Reportes/FaltaRetardoGrafica";

//importaciones de calidad
import Ordtrabajo from "../components/pages/calidad/OrdenTrabajo";
import GOT from "../components/pages/calidad/reporteria/OrdenTrabajoGrafica";
import Calidad from "../components/pages/Calidad";
// import DetalleMantenimiento from "../components/pages/calidad/reporteria/DetalleMantenimiento";

//importaciones de seguridad
import Seguridad from "../components/pages/Seguridad";
//importaciones de almacen
import Almacen from "../components/pages/Almacen";
//importaciones de mantenimiento
import Mantenimiento from "../components/pages/Mantenimiento";
//importaciones documentosSGC
import DocumentosSGC from "../components/pages/DocumentosSGC";
//importaciones administrativos
import Administrativo from "../components/pages/Administrativo";
import EmpleadosRechazados from "../components/pages/RecursosHumanos/EmpleadosRechazados";
import Documentos from "../components/pages/RecursosHumanos/Documentos";
import Ordtrabajomante from "../components/pages/mantenimiento/Ordtrabajomante";
import FaltaRetardoGrafica from "../components/pages/RecursosHumanos/Reportes/FaltaRetardoGrafica";
import ControlDocumentos from "../components/pages/RecursosHumanos/ControlDocumentos";
import Octanoso from "../components/pages/RecursosHumanos/Octanoso";
import Aceitoso from "../components/pages/RecursosHumanos/Aceitoso";
import GICO from "../components/pages/RecursosHumanos/Reportes/RepOctanoso";
import GICA from "../components/pages/RecursosHumanos/Reportes/RepAceitoso";

//pdf prueba
import PdfV2 from "../components/pdf_generador/PdfV2";
import ConfiguracionEstacion from "../components/pages/administrativo/ConfiguracionEstacion";
import RepConfiguracionEstacion from "../components/pages/administrativo/reportes/RepConfiguracionEstacion";
import ConfiguracionPermisos from "../components/pages/administrativo/ConfiguracionPermisos";
import RepConfiguracionPermisos from "../components/pages/administrativo/reportes/RepConfiguracionPermisos";
import ConfiguracionUsuario from "../components/pages/administrativo/ConfiguracionUsuario";
import Inc from "../components/pages/salidaNoConforme/Incumplimientos";

import { Dep } from "../components/Provider/Auth";
import OctanosoRegistros from "../components/pages/RecursosHumanos/Reportes/OctanosoRegistros";
//import OrdenIsla from "../components/pages/despacho/OrdenIsla";
import EvalUniformeEmpleado from "../components/pages/despacho/reporteria/EvalUniformeEmpleado";
import Boleta from "../components/pages/administrativo/Boletas/Boleta";
import DetalleBoletas from "../components/pages/administrativo/Boletas/DetalleBoletas";

function Rutas() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Routes>
        {/* Rutas de despacho */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Notfound />} />
        </Route>
        {/* SNC */}
        <Route path="/:departamento/salida-no-conforme" element={<Layout />}>
          <Route index element={<SalidaNoConforme />} />
          <Route path="files" element={<SNR />} />;
          <Route path="incumplimientos" element={<Inc />} />;
          <Route path="reporte-mensual" element={<GMSN />} />
          <Route path="inconformidad" element={<GSNI />} />
          <Route path="pendientes" element={<SNCP />} />
          <Route path="por-empleado-tipo" element={<SNCPET />} />
        </Route>
        {Dep(2) && (
          <Route path="/despacho" element={<Layout />}>
            <Route index element={<Despacho />} />;
            <Route path="montos-faltantes" element={<MontoFaltante />} />;
            <Route
              path="montos-faltantes/reportes/empleados"
              element={<MFE />}
            />
            <Route path="montos-faltantes/historial" element={<MFT />} />
            ;
            <Route path="montos-faltantes/reporte" element={<GMF />} />;
            <Route path="checklist" element={<ChecklistBomba />} />;
            <Route
              path="checklist/:year/:month/:idEmpleado"
              element={<CheckBombaInfo />}
            />
            ;
            <Route path="checklist/reporte" element={<CCB />} />;
            <Route path="evaluacion-uniforme" element={<EvalUniforme />} />;
            <Route path="evaluacion-uniforme/reporte">
              <Route index element={<GEU />} />
              <Route
                path=":id/:year/:month"
                element={<EvalUniformeEmpleado />}
              />
            </Route>
            ;
            <Route path="evaluacion-uniforme/historial" element={<DHEU />} />;
            <Route path="recoleccion-efectivo" element={<RecolEfect />} />;
            <Route path="recoleccion-efectivo/reporte" element={<DRE />} />;
            <Route path="recoleccion-efectivo/historial" element={<DHREE />} />;
            <Route path="pasos-despachar" element={<Pasosdespachar />} />;
            <Route path="pasos-despachar/historial" element={<DHPD />} />;
            <Route path="pasos-despachar/reporte" element={<GPD />} />;
            <Route path="recurso-despachador" element={<RecursosDesp />} />;
            <Route path="recurso-despachador/reporte" element={<GRD />} />
            <Route path="recurso-despachador/historial" element={<DHRD />} />
            <Route path="*" element={<Notfound />} />
            <Route path="orden-limpieza-isla" element={<OrdenIsla />} />
            <Route path="orden-limpieza-isla/reporte" element={<GOYL />} />
            <Route path="orden-limpieza-isla/historial" element={<DHOL />} />
            <Route
              path="orden-limpieza-isla/reporte/:idEmpleado"
              element={<GOYLE />}
            />
          </Route>
        )}

        {/* Recursos humanos */}
        <Route path="/recursos-humanos" element={<Layout />}>
          <Route index element={<RecursosHumanos />} />
          <Route path="captura-solicitud" element={<SolicitudesEmpleo />} />
          <Route path="alta-baja-empleados" element={<AltaBaja />} />
          <Route path="departamentos" element={<Departamentos />} />
          <Route path="entrega-recursos" element={<EntregaRecurso />} />
          <Route path="entrega-recursos/registros" element={<ERR />} />
          <Route path="faltas-retardo">
            <Route index element={<FaltasRetardos />} />
            <Route path="reportes" element={<FRG />} />
          </Route>
          <Route path="documentos-trabajadores" element={<Documentos />} />
          <Route path="concurso-madrugador" element={<ConcursoMadrugador />} />
          <Route
            path="empleados-dados-baja"
            element={<EmpleadosRechazados />}
          />
          <Route path="documentos-trabajadores" element={<Documentos />} />
          <Route
            path="grafica-mensual-faltas-retardos"
            element={<FaltaRetardoGrafica />}
          />
          <Route path="control-documentos" element={<ControlDocumentos />} />
          {/* Rutas concursos */}
          <Route path="concurso-octanoso">
            <Route index element={<Octanoso />} />
            <Route path="reporte" element={<GICO />} />
            <Route path="registros" element={<OctanosoRegistros />} />
          </Route>
          <Route path="concurso-aceitoso">
            <Route index element={<Aceitoso />} />
            <Route path="reporte" element={<GICA />} />
            <Route path="registros" element={<RGA />} />
          </Route>
        </Route>

        {/* Calidad */}
        <Route path="/calidad" element={<Layout />}>
          <Route index element={<Calidad />} />
          <Route path="orden-trabajo">
            <Route index element={<Ordtrabajo />} />
            <Route path="reportes" element={<GOT />} />
          </Route>
        </Route>

        {/* Seguridad */}
        <Route path="/seguridad" element={<Layout />}>
          <Route index element={<Seguridad />} />
        </Route>

        {/* Administrativo */}
        <Route path="/administrativo" element={<Layout />}>
          <Route index element={<Administrativo />} />
          <Route
            path="configuracion-estacion"
            element={<ConfiguracionEstacion />}
          />
          <Route
            path="configuracion-permisos"
            element={<ConfiguracionPermisos />}
          />
          <Route
            path="configuracion-usuario"
            element={<ConfiguracionUsuario />}
          />
          <Route path="rep-permisos" element={<RepConfiguracionPermisos />} />
          <Route path="rep-estacion" element={<RepConfiguracionEstacion />} />
          <Route path="resumen-despacho">
            <Route index element={<Boleta />} />
            <Route path="detalles/:id" element={<DetalleBoletas />} />
          </Route>
        </Route>

        {/* Mantenimiento */}
        <Route path="/mantenimiento" element={<Layout />}>
          <Route index element={<Mantenimiento />} />
          <Route path="orden-trabajo" element={<Ordtrabajomante />} />
        </Route>

        {/* Almacen */}
        <Route path="/almacen1" element={<Layout />}>
          <Route index element={<Almacen />} />
        </Route>

        {/* Documentos SGC */}
        <Route path="/documentos-sgc" element={<Layout />}>
          <Route index element={<DocumentosSGC />} />
        </Route>
        <Route path="/pdf" element={<PdfV2 />} />

        {/* Siempre debe ir abajo */}
      </Routes>
    </Router>
  );
}

export default Rutas;
