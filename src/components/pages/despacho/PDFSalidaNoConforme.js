import React from "react";

import gdl from "../../assets/img/GDL.png";
import tabla from "../../assets/img/TablaDis.png";
import calibri from "../../assets/fuentes/calibri.ttf";
import calibriN from "../../assets/fuentes/calibrib.ttf";
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

// Create Document Component
const PDFSalidaNoConforme = ({
  title,
  fecha,
  inconformidad,
  corregir,
  concesiones,
}) => {
  //Fonts
  Font.register({ family: "calibri", src: calibri });
  Font.register({ family: "calibriN", src: calibriN });
  // Create styles
  const styles = StyleSheet.create({
    page: {
      // marginVertical: "20px",
      marginVertical: "40px",
      marginHorizontal: "40px",
      fontFamily: "calibri",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      // border: "1px solid black",
      padding: "5px",
    },
    img: {
      width: "60px",
    },
    textCenter: {
      fontFamily: "calibriN",
      fontSize: "12pt",
      fontWeight: "800",
    },
    fecha: {
      fontFamily: "calibriN",
      fontSize: "15pt",
    },
  });

  return (
    <PDFViewer width="100%" height="100%">
      <Document title={title} style={{ marginBotton: "20px" }}>
        <Page size="LETTER" orientation="portrait">
          <View style={styles.page}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                border: "1px solid black",
              }}
            >
              <View
                style={{
                  width: "100px",
                  height: "50px",
                  borderRight: "1px solid black",
                }}
              >
                <Image
                  src={gdl}
                  style={{ width: "80px", marginHorizontal: "auto" }}
                ></Image>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.textCenter}>
                  GASOLINERÍA DON LALO S.A DE C.V
                </Text>
                <Text style={styles.textCenter}>Salidas No Conformes</Text>
              </View>
              <View
                style={{
                  width: "80px",
                  height: "50px",
                  borderLeft: "1px solid black",
                  backgroundColor: "#d2d2d2",
                }}
              ></View>
            </View>
            <View
              style={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.fecha}>Fecha</Text>
              <View
                style={{
                  border: "1px solid black",
                  marginLeft: "40px",
                  height: "100%",
                  width: "180px",
                  display: "flex",
                }}
              >
                <Text style={{ fontSize: "11pt", margin: "auto" }}>
                  {fecha}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: "20px" }}>
              <Text
                style={{
                  fontFamily: "calibriN",
                  fontSize: "15pt",
                }}
              >
                Descripción de la falla (no conformidad):{" "}
              </Text>
              <Text
                style={{
                  minHeight: "150px",
                  border: "1px solid black",
                  fontSize: "14pt",
                  padding: "5px",
                }}
              >
                {inconformidad}
              </Text>

              <Text
                style={{
                  fontFamily: "calibriN",
                  fontSize: "15pt",
                  marginTop: "15px",
                }}
              >
                Acciones aplicadas para corregir la falla:{" "}
              </Text>
              <Text
                style={{
                  minHeight: "100px",
                  border: "1px solid black",
                  fontSize: "14pt",
                  padding: "5px",
                }}
              >
                {corregir}
              </Text>

              <Text
                style={{
                  fontFamily: "calibriN",
                  fontSize: "16pt",
                  marginTop: "15px",
                }}
              >
                En caso de autorizar la liberación de la falla sin aplicar
                ninguna acción, describir las concesiones:{" "}
              </Text>
              <Text
                style={{
                  minHeight: "80px",
                  border: "1px solid black",
                  fontSize: "14pt",
                  marginTop: "5px",
                  padding: "5px",
                  fontFamily: "calibri",
                }}
              >
                {concesiones}
              </Text>
              <View
                style={{
                  marginTop: "50px",
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "13pt",
                }}
              >
                <Text>Autorizado por: </Text>
                <View
                  style={{
                    marginLeft: "80px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text>________________________________________</Text>
                  <Text>Nombre y firma</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Image src={tabla} style={{ width: "90px" }}></Image>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

PDFSalidaNoConforme.defaultProps = {
  title: "Salidas no conformes",
  fecha: "14/12/2022",
  inconformidad:
    'El 27 de noviembre, en Gasolinería Don Lalo 1, identificada como Estación de Servicio 0377, en el turno de la mañana (comprendido de las 6:00 am a 2:00 pm) la Despachadora Isabel Alvarado López al momento de hacer su liquidacion saco un pagare de $120.85 la cual pago en el momento ya que habia sido del otro turno; la no conformidad aqui descrita es un incumplimiento a los documentos estandarizados del Sistema de Gestion de la Calidad de Gasolineria Don Lalo S.A de C.V. llamado: "Diagrama de proceso Liquidación" y "Descripción de puesto Despachador"',
  corregir: "",
  concesiones: "No aplica.",
  incumple: "",
};

export default PDFSalidaNoConforme;
