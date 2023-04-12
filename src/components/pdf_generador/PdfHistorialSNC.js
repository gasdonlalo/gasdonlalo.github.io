import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
  BlobProvider,
} from "@react-pdf/renderer";
import calibri from "../assets/fuentes/calibri.ttf";
import calibriN from "../assets/fuentes/calibrib.ttf";
import gdl from "../assets/img/GDL.png";
import pemex from "../assets/img/pemex.png";
import format from "../assets/format";

function PdfHistorialSNC({ datos }) {
  Font.register({ family: "calibri", src: calibri });
  Font.register({ family: "calibrib", src: calibriN });

  const styles = StyleSheet.create({
    page: {
      padding: "30px",
      width: "100px",
      height: "100px",
      fontSize: "12pt",
      fontFamily: "calibri",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      height: "10%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      fontSize: "20pt",
    },
    titulos: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "calibriN",
    },

    row: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#eaeaea",
      height: "20px",
      fontFamily: "calibriN",
    },
    cuerpo: {
      display: "flex",
      flexDirection: "row",
      textAlign: "center",
    },
    rowfecha: {
      width: "15%",
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
    },
    rowInfo: {
      width: "55%",
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      padding: "5px",
      paddingTop: "2px",
    },
    rowInfoHead: {
      width: "55%",
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
    },
    infoText: {
      margin: "5px",
      marginTop: "2px",
      textAlign: "left",
    },
    rowTema: {
      width: "30%",
      borderBottom: "1px solid black",
    },
    tablaContainer: {
      textAlign: "center",
      borderTop: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
    },
    paginacion: {
      height: "5%",
      textAlign: "right",
      fontSize: "10pt",
    },
    marginTop: {
      marginTop: "5px",
    },
  });
  const Thead = () => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowfecha}>Fecha</Text>
        <Text style={styles.rowInfoHead}>Descripción</Text>
        <Text style={styles.rowTema}>Incumplimiento</Text>
      </View>
    );
  };
  const Tcuerpo = ({ el }) => {
    return (
      <View style={styles.cuerpo}>
        <View style={styles.rowfecha}>
          <Text style={styles.marginTop}>
            {format.formatFechaComplete(el.fecha)}
          </Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={styles.infoText}>{el.descripcion_falla}</Text>
        </View>
        <View style={{ ...styles.rowTema, paddingHorizontal: "5px" }}>
          <Text style={styles.marginTop}>{el.incumplimiento}</Text>
        </View>
      </View>
    );
  };
  const myDoc = (
    <Document>
      <Page size="LETTER" orientation="portrait" style={styles.page}>
        <View style={styles.header}>
          <Image src={gdl} style={{ width: "80px" }} />
          {/* Titulos */}
          <View style={styles.titulos}>
            <Text>GASOLINERIA DON LALO S.A. DE C.V.</Text>
            <Text style={{ fontSize: "14pt" }}>
              Historial de salidas no conformes
            </Text>
            <Text style={{ fontSize: "12pt" }}>
              Empleado:{" "}
              {format.formatTextoMayusPrimeraLetra(
                `${datos[0].empleado.nombre} ${datos[0].empleado.apellido_paterno} ${datos[0].empleado.apellido_materno}`
              )}
            </Text>
          </View>
          {/* Titulos */}
          <Image src={pemex} style={{ width: "80px" }}></Image>
        </View>
        <View style={styles.tablaContainer}>
          <Thead />
          {datos.map((el, i) => (
            <Tcuerpo el={el} key={i} />
          ))}
        </View>

        <Text
          style={styles.paginacion}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}.`
          }
          fixed
        />
      </Page>
    </Document>
  );

  return (
    <BlobProvider document={myDoc}>
      {({ url }) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-danger"
        >
          Exportar PDF <i className="bi bi-file-earmark-pdf" />
        </a>
      )}
    </BlobProvider>
  );
}

export default PdfHistorialSNC;
