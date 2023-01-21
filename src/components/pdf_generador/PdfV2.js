import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import { Fragment, useState } from "react";
import calibri from "../assets/fuentes/calibri.ttf";
import calibriN from "../assets/fuentes/calibrib.ttf";
import gdl from "../assets/img/GDL.png";
import pemex from "../assets/img/pemex.png";
import tabladis from "../assets/img/TablaDis.png";
import html2canvas from "html2canvas";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import Loader from "../assets/Loader";

function PdfV2({
  tabla,
  month,
  year,
  idempleado,
  quincena,
  fechaInicio,
  fechaFin,
  estacion,
}) {
  const ruta = useLocation().pathname;
  Font.register({ family: "calibri", src: calibri });
  Font.register({ family: "calibrib", src: calibriN });
  const [img, setImg] = useState();
  const [img2, setImg2] = useState();
  const [pendiente, setPendiente] = useState(false);

  const nombreEmpleado = useGetData(
    !idempleado ? null : `/empleado/${idempleado}`
  );

  const meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  //nombre de la grafica respecto a la ruta
  function NombreGrafica() {
    var nombre = "GRAFICA";
    if (ruta.match("faltante")) {
      nombre = nombre + " SEMANAL DE MONTO FALTANTE DE DESPACHADORES";
    } else if (ruta.match("checklist")) {
      nombre = nombre + " MENSUAL DE REGISTRO DE CHECKLIST";
    } else if (ruta.match("uniforme")) {
      nombre = nombre + " DE UNIFORME DESPACHO";
    } else if (ruta.match("recoleccion")) {
      nombre = nombre + " MENSUAL INCUMPLIMIENTOS DE RECOLECCION DE EFECTIVO";
    } else if (ruta.match("recurso-despachador")) {
      nombre = nombre + " MENSUAL DE REGISTRO DE RECURSOS DE DESPACHADOR";
    } else if (ruta.match("pasos")) {
      nombre = nombre + " ANALISIS DE EVALUACION PASOS PARA DESPACHARGIT";
    } else if (ruta.match("no-conforme-reporte-mensual")) {
      nombre =
        nombre + " TOTAL MENSUAL DE SALIDAS NO CONFORMES POR DESPACHADOR";
    } else if (ruta.match("conformexinconformidad")) {
      nombre = nombre + " MENSUAL SALIDAS NO CONFORMES POR INCORFORMIDAD";
    } else if (ruta.match("concurso-octanoso")) {
      nombre = nombre + " CONTROL CONVOCATORIA INCENTIVO  EL OCTANOSO";
    } else if (ruta.match("concurso-aceitoso")) {
      nombre = nombre + " CONTROL CONVOCATORIA INCENTIVO EL ACEITOSO";
    } else if (ruta.match("concurso-madrugador")) {
      nombre = nombre + " CONTROL CONVOCATORIA INCENTIVO EL MADRUGADOR";
    } else if (ruta.match("orden-trabajo")) {
      nombre = nombre + "  MENSUAL MANTENIMIENTO";
    }
    return nombre;
  }
  //muestra la fecha para los concursos
  function FechaLarga(fecha) {
    return new Intl.DateTimeFormat("es-MX", {
      dateStyle: "long",
    }).format(
      new Date(
        new Date(fecha).getTime() + new Date().getTimezoneOffset() * 60000
      )
    );
  }
  const capturar = () => {
    setPendiente(true);
    //elemento donde se encuentra la tabla y la grafica
    const element = document.getElementById("render");
    html2canvas(element, { scale: 4, allowTaint: true }).then((canvas) => {
      setImg(canvas.toDataURL("image/JPEG"));
      setPendiente(false);
    });
    if (tabla !== undefined) {
      capturarTabla();
    }
  };

  //captura tabla si es necesario
  const capturarTabla = () => {
    const elementTabla = document.getElementById(tabla);
    html2canvas(elementTabla, { scale: 4, allowTaint: true }).then((canvas) => {
      setImg2(canvas.toDataURL("image/JPEG"));
    });
  };

  const estilo = StyleSheet.create({
    viewer: { width: "100%", height: "100vh" },
    page: {
      padding: "20px",
      fontFamily: "calibri",
      height: "100%",
      width: "100%",
      fontSize: "12pt",
    },
    header: {
      minHeight: "10%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    cuerpo: {
      border: "1px solid black",
      marginTop: "3px",
    },
    titulos: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    paginacion: {
      fontFamily: "calibri",
      fontSize: "10pt",
    },
    /* tabla: { position: "absolute", bottom: "25px", left: "655px" }, */
    infoAdicional: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    bordesInfo: {
      border: "0.5px solid black",
      minWidth: "100px",
      paddingLeft: "10px",
    },
  });

  const doc = (
    <Document wrap>
      <Page size="LETTER" orientation="landscape" style={estilo.page}>
        {/* Header */}
        <View style={estilo.header}>
          <Image src={gdl} style={{ width: "55px" }} />
          {/* Titulos */}
          <View style={estilo.titulos}>
            <Text style={{ fontFamily: "calibrib" }}>
              GASOLINERIA DON LALO S.A. DE C.V.
            </Text>
            <Text>{NombreGrafica()}</Text>
          </View>
          {/* Titulos */}
          <Image src={pemex} style={{ width: "80px" }}></Image>
        </View>
        {/* Header */}

        {/* Info adicional */}
        {!year && !month ? (
          false
        ) : (
          <View style={estilo.infoAdicional}>
            <View style={{ flexDirection: "row", right: "20%" }}>
              <View>
                <Text>MES </Text>
              </View>
              <View>
                <Text style={estilo.bordesInfo}>{meses[month - 1]}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text>AÑO </Text>
              </View>
              <View>
                <Text style={estilo.bordesInfo}>{year}</Text>
              </View>
            </View>
          </View>
        )}
        {!idempleado ? (
          false
        ) : (
          <View style={[estilo.infoAdicional, { marginTop: "10px" }]}>
            <View>
              <Text>NOMBRE DEL EVALUADO </Text>
            </View>
            <View style={[estilo.bordesInfo, { minWidth: "250px" }]}>
              <Text>
                {!nombreEmpleado.data
                  ? false
                  : format.formatTextoMayusPrimeraLetra(
                      `${nombreEmpleado.data.response[0].nombre} ${nombreEmpleado.data.response[0].apellido_paterno} ${nombreEmpleado.data.response[0].apellido_materno}`
                    )}
              </Text>
            </View>
          </View>
        )}
        {!quincena ? (
          false
        ) : (
          <View style={[estilo.infoAdicional, { marginTop: "10px" }]}>
            <View>
              <Text>QUINCENA </Text>
            </View>
            <View>
              <Text style={estilo.bordesInfo}>{quincena}</Text>
            </View>
          </View>
        )}
        {!fechaFin && !fechaFin ? (
          false
        ) : (
          <View>
            <Text style={{ textAlign: "center" }}>{` Del ${FechaLarga(
              fechaInicio
            )} al ${FechaLarga(fechaFin)}`}</Text>
          </View>
        )}
        {!estacion ? (
          false
        ) : (
          <View style={[estilo.infoAdicional, { marginTop: "10px" }]}>
            <View>
              <Text>ESTACION </Text>
            </View>
            <View>
              <Text style={estilo.bordesInfo}>
                {estacion === "1" ? "GDL 1" : "GDL 2"}
              </Text>
            </View>
          </View>
        )}

        {/* Info adicional */}

        {/* Cuerpo */}
        <View style={estilo.cuerpo}>
          {!tabla ? (
            false
          ) : (
            /* Tabla de datos */
            <View
              style={{
                minHeight: 200,
                maxHeight: 500,
                justifyContent: "center",
                border: "1px solid blue",
              }}
            >
              <Image src={img2} />
            </View>
          )}
          {/* Grafica */}
          <View
            style={{
              minHeight: "85%",
              border: "1px solid red",
            }}
            break
          >
            <Image src={img} />
          </View>
        </View>
        {/* Cuerpo */}
        {/* Tabla disposicion y paginacion */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={estilo.paginacion}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}.`
            }
          />

          <Image src={tabladis} style={{ width: "90px" }} />
        </View>
        {/* Tabla disposicion y paginacion */}
      </Page>
    </Document>
  );

  return (
    <Fragment>
      <div className="d-flex ">
        <button
          onClick={capturar}
          type="button"
          className="btn btn-primary mb-3 me-3"
        >
          <strong>
            <i className="bi bi-file-earmark-pdf" />
          </strong>{" "}
          Generar PDF
        </button>
        {pendiente ? <Loader size="38px" /> : null}
      </div>

      {!img || pendiente ? (
        false
      ) : (
        <div id="#pdf">
          <PDFViewer style={estilo.viewer}>{doc}</PDFViewer>
        </div>
      )}
    </Fragment>
  );
}

export default PdfV2;
