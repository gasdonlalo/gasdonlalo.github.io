import { useLocation } from "react-router-dom";
import gdl from "../assets/img/GDL.png";
import pemex from "../assets/img/PEMEX.png";
import tabla from "../assets/img/TablaDis.png";
import calibri from "../assets/fuentes/calibri.ttf";
import calibriN from "../assets/fuentes/calibrib.ttf";
import html2canvas from "html2canvas";
import { Fragment, useState } from "react";

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
  }

  return nombre;
}

function PdfGraficas({ year, mes }) {
  //variable donde se guarda la imagen
  const [img, setImg] = useState();
  //lista con los mese para setear en el pdf
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
  });

  //captura la imagen
  const capturar = () => {
    //elemento donde se encuentra la tabla y la grafica
    const element = document.getElementById("render");
    html2canvas(element, { scale: 4, allowTaint: true }).then((canvas) => {
      setImg(canvas.toDataURL("image/JPEG"));
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
                  <Text
                    style={{
                      border: "0.5px solid black",
                      marginLeft: "4px",
                      minWidth: "100px",
                    }}
                  >
                    {meses[mes - 1]}
                  </Text>
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
                  <Text
                    style={{
                      border: "0.5px solid black",
                      marginLeft: "4px",
                      marginRight: "50px",
                      minWidth: "100px",
                    }}
                  >
                    {year}
                  </Text>
                </View>
              </View>
              {/* Termina mes y año */}
              <View style={styles.grafica}>
                {!img ? false : <Image src={img} style={{ width: "55%" }} />}
              </View>
              {/* Termina grafica */}
              <View style={styles.tabla}>
                <Image src={tabla} style={{ width: "85px" }} />
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
