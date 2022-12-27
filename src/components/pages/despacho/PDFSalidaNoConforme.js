import React from "react";
import gdl from "../../assets/img/GDL.png";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    // marginVertical: "20px",
    marginTop: "20px",
    marginHorizontal: "8px",
    fontSize: "12pt",
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
    textAlign: "center",
  },
});

//Fonts

// Create Document Component
const PDFSalidaNoConforme = ({
  title,
  fecha,
  inconformidad,
  corregir,
  incumple,
}) => (
  <PDFViewer width="100%" height="100%">
    <Document title={title}>
      <Page size="A4" orientation="portrait" margin="100" wrap>
        <View style={styles.page} wrap={false}>
          <View style={{ ...styles.header, position: "relative" }}>
            <Image
              src={gdl}
              style={{ ...styles.img, position: "absolute", left: "10" }}
            ></Image>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  margin: "auto",
                  fontSize: "16pt",
                }}
              >
                GASOLINERÍA DON LALO S.A DE C.V
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "5px",
                  marginHorizontal: "auto",
                  fontSize: "12pt",
                }}
              >
                Salidas no corformes
              </Text>
            </View>
          </View>
          <View style={{ marginTop: "15px", marginLeft: "10px" }}>
            <Text
              style={{ marginTop: "15px" }}
              render={() => {
                return `Fecha: ${fecha}`;
              }}
              fixed
            />
            <Text style={{ marginTop: "15px", fontWeight: "800" }}>
              Descripción de la falla (Inconformidad):{" "}
            </Text>
            <Text
              break
              style={{
                marginTop: "10px",
                border: "1px solid black",
                padding: "5px",
                minHeight: "100px",
              }}
              render={() => inconformidad}
            ></Text>
            <Text style={{ marginTop: "15px", fontWeight: "800" }}>
              Acciones aplicadas para corregir la falla:
            </Text>
            <Text
              break
              style={{
                marginTop: "10px",
                border: "1px solid black",
                padding: "5px",
                minHeight: "100px",
              }}
              render={() => corregir}
            ></Text>
            <Text style={{ marginTop: "15px", fontWeight: "800" }}>
              En caso de autorizar la liberación de la falla sin aplicar ninguna
              acción, describir las conceciones:
            </Text>
            <Text
              break
              style={{
                marginTop: "10px",
                border: "1px solid black",
                padding: "5px",
                minHeight: "100px",
              }}
              render={() => incumple}
            />
          </View>
          <View
            style={{
              marginTop: "50px",
              marginLeft: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ marginRight: "100px" }}>Autorizado por:</Text>
            <View>
              <Text>_________________________________</Text>
              <Text style={{ marginHorizontal: "auto", marginTop: "10px" }}>
                Nombre y Firma
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

PDFSalidaNoConforme.defaultProps = {
  title: "Salidas no conformes",
  fecha: "14/12/2022",
  inconformidad:
    'El 27 de noviembre, en Gasolinería Don Lalo 1, identificada como Estación de Servicio 0377, en el turno de la mañana (comprendido de las 6:00 am a 2:00 pm) la Despachadora Isabel Alvarado López al momento de hacer su liquidacion saco un pagare de $120.85 la cual pago en el momento ya que habia sido del otro turno; la no conformidad aqui descrita es un incumplimiento a los documentos estandarizados del Sistema de Gestion de la Calidad de Gasolineria Don Lalo S.A de C.V. llamado: "Diagrama de proceso Liquidación" y "Descripción de puesto Despachador"',
  corregir: "",
  incumple: "",
};

/* <View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Image
                src={gdl}
                style={{
                  position: "absolute",
                  top: "10",
                  left: "10",
                  width: "60px",
                }}
              ></Image>
              <Text
                style={{
                  marginTop: "10px",
                  fontSize: "18px",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                GASOLINERÍA DON LALO S.A DE C.V
              </Text>
              <Text
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                Salidas no conformes
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            marginTop: "20px",
          }}
        >
          <Text style={{}}>Fecha: </Text>
          <Text style={{ border: "1px solid black", width: "100px" }}>
            12/12/2022
          </Text>
        </View>

        <View
          style={{
            marginTop: "20px",
          }}
        >
          <Text style={{}}>Descripción de la falla (No conformidad) </Text>
          <Text
            style={{ border: "1px solid black", width: "90%", margin: "auto" }}
          >
            12/12/2022
          </Text> */

export default PDFSalidaNoConforme;
