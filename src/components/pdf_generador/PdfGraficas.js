import { useLocation } from "react-router-dom";
import gdl from "../assets/img/GDL.png";
import pemex from "../assets/img/pemex.png";
import tabladis from "../assets/img/TablaDis.png";
import calibri from "../assets/fuentes/calibri.ttf";
import calibriN from "../assets/fuentes/calibrib.ttf";
import html2canvas from "html2canvas";
import { Fragment, useState } from "react";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
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

//funcion para setear nombre de la grafica
function NombreGrafica() {
  //obtiene la ruta actual para dar nombre a la grafica en el pdf
  let location = useLocation().pathname;
  var nombre = "GRAFICA";
  if (location.match("faltante")) {
    nombre = nombre + " SEMANAL DE MONTO FALTANTE DE DESPACHADORES";
  } else if (location.match("checklist")) {
    nombre = nombre + " MENSUAL DE REGISTRO DE CHECKLIST";
  } else if (location.match("uniforme")) {
    nombre = nombre + " DE UNIFORME DESPACHO";
  } else if (location.match("recoleccion")) {
    nombre = nombre + " MENSUAL INCUMPLIMIENTOS DE RECOLECCION DE EFECTIVO";
  } else if (location.match("recurso")) {
    nombre = nombre + " MENSUAL DE REGISTRO DE RECURSOS DE DESPACHADOR";
  } else if (location.match("pasos")) {
    nombre = nombre + " ANALISIS DE EVALUACION PASOS PARA DESPACHARGIT";
  }
  return nombre;
}

function PdfGraficas({ year, mes, tabla, idempleado, quincena }) {
  //consulta de empleado para el formato
  const empleado = useGetData(
    !idempleado ? "/empleado" : `/empleado/${idempleado}`
  );
  //variable donde se guarda la imagen
  const [img, setImg] = useState();
  const [img2, setImg2] = useState(); // TABLA LARGA
  //lista con los meses para setear en el pdf
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

  //registro de fuentes calibri
  Font.register({ family: "calibri", src: calibri });
  Font.register({ family: "calibrib", src: calibriN });

  //declaracion de estilos
  const styles = StyleSheet.create({
    header: {
      width: "100%",
      height: " 10%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignContent: "center",
    },
    title: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    textCenter: {
      fontFamily: "calibri",
      textAlign: "center",
      fontSize: "12pt",
    },
    textoBorde: {
      border: "0.5px solid black",
      marginLeft: "4px",
      marginRight: "50px",
      minWidth: "100px",
    },
    grafica: {
      width: "100%",
      heigth: "70%",
      display: "flex",
      alignItems: "center",
    },
    tabla: { position: "absolute", bottom: "25px", left: "655px" },
    paginacion: {
      fontFamily: "calibri",
      fontSize: "10pt",
      position: "absolute",
      left: "655px",
      bottom: "90px",
    },
    datosAgregados: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "10px",
      marginRight: "18px",
      fontFamily: "calibri",
      fontSize: "12px",
      justifyContent: "flex-end",
    },
  });

  //captura la imagen
  const capturar = () => {
    //elemento donde se encuentra la tabla y la grafica
    const element = document.getElementById("render");
    html2canvas(element, { scale: 4, allowTaint: true }).then((canvas) => {
      setImg(canvas.toDataURL("image/JPEG"));
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

  return (
    <Fragment>
      <button type="button" className="btn btn-primary" onClick={capturar}>
        Generar pdf
      </button>
      {!img ? (
        false
      ) : (
        <PDFViewer width="100%" height="500px">
          <Document title="Ola" wrap>
            <Page size="LETTER" orientation="landscape">
              <View style={styles.header}>
                <Image src={gdl} style={{ width: "55px" }} />
                <View style={styles.title}>
                  <Text style={(styles.textCenter, { fontFamily: "calibrib" })}>
                    GASOLINERIA DON LALO S.A. DE C.V.
                  </Text>
                  <Text style={styles.textCenter}>{NombreGrafica()}</Text>
                </View>
                <Image src={pemex} style={{ width: "80px" }}></Image>
              </View>
              {/* Termina encabezado */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "12pt",
                  fontFamily: "calibri",
                }}
              >
                <View
                  style={{
                    left: "50%",
                    height: "5%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text>Mes</Text>
                  <Text style={styles.textoBorde}>{meses[mes - 1]}</Text>
                </View>

                <View
                  style={{
                    left: "60%",
                    height: "5%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text>Año</Text>
                  <Text style={styles.textoBorde}>{year}</Text>
                </View>
              </View>
              {/* Nombre de empleado  */}
              {!idempleado ? (
                false
              ) : (
                <View style={styles.datosAgregados}>
                  <Text>Nombre del evaluado</Text>
                  <Text style={styles.textoBorde}>
                    {!empleado.data
                      ? false
                      : format.formatTextoMayusPrimeraLetra(
                          `${empleado.data.response[0].nombre} ${empleado.data.response[0].apellido_paterno} ${empleado.data.response[0].apellido_materno}`
                        )}
                  </Text>
                </View>
              )}
              {/* Quincena */}
              {!quincena ? (
                false
              ) : (
                <View style={styles.datosAgregados}>
                  <Text>Quincena</Text>
                  <Text style={styles.textoBorde}>{quincena}</Text>
                </View>
              )}
              {/* Termina mes y año */}
              <View style={styles.grafica}>
                {!img2 ? (
                  false
                ) : (
                  <Image
                    src={img2}
                    style={{
                      width: "95%",
                      marginBottom: "10px",
                    }}
                  />
                )}
                {/* Tabla larga */}
                {!img ? false : <Image src={img} style={{ width: "55%" }} />}
              </View>
              {/* Termina grafica */}
              <View style={styles.tabla}>
                <Image src={tabladis} style={{ width: "90px" }} />
              </View>
              {/* Termina tabla de disposicion */}
              <Text
                style={styles.paginacion}
                render={({ pageNumber, totalPages }) =>
                  `Página ${pageNumber} de ${totalPages}.`
                }
              />
            </Page>
          </Document>
        </PDFViewer>
      )}
    </Fragment>
  );
}

export default PdfGraficas;
