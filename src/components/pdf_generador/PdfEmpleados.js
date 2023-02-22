import calibriN from "../assets/fuentes/calibrib.ttf";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  BlobProvider,
} from "@react-pdf/renderer";

Font.register({ family: "calibriN", src: calibriN });

const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    backgroundColor: "#fff",
    padding: "20px",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    width: "60%",
  },
  xyz: {
    width: "40%",
  },
  tableContainer: {
    marginTop: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: "15pt",
    // width: "450px",
  },
  theaderRow: {
    fontFamily: "calibriN",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e2e2e2",
    border: 1,
    borderColor: "#000",
    height: 30,
    fontSize: "14pt",
    width: "100%",
    flexGrow: 1,
  },
  theaderRowItems: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    fontSize: "11pt",
    borderColor: "#000",
    height: 20,
    width: "100%",
    fontStyle: "bold",
    flexGrow: 1,
  },
  theaderId: {
    paddingTop: 6,
    textAlign: "center",
    borderRight: 1,
    width: 35,
    height: "100%",
  },
  theaderNombre: {
    paddingTop: 6,
    borderRight: 1,
    paddingLeft: 4,
    textAlign: "left",
    width: 190,
    height: "100%",
  },
  theaderApellidoP: {
    paddingTop: 6,
    borderRight: 1,
    paddingLeft: 4,
    textAlign: "left",
    width: 130,
    height: "100%",
  },
  theaderApellidoM: {
    paddingTop: 6,
    borderRight: 1,
    paddingLeft: 4,
    textAlign: "left",
    width: 130,
    height: "100%",
  },
  theaderDepartamento: {
    paddingTop: 6,
    width: 160,
    paddingLeft: 4,
    textAlign: "left",
    height: "100%",
  },
  tbodyId: {
    padding: 2.5,
    textAlign: "center",
    borderRight: 1,
    width: 35,
    height: "100%",
  },
  tbodyNombre: {
    paddingTop: 2.5,
    paddingLeft: 4,
    borderRight: 1,
    width: 190,
    height: "100%",
  },
  tbodyApellidoP: {
    paddingTop: 2.5,
    paddingLeft: 4,
    borderLef: 1,
    borderRight: 1,
    width: 130,
    height: "100%",
  },
  tbodyApellidoM: {
    paddingTop: 2.5,
    paddingLeft: 4,
    borderRight: 1,
    width: 130,
    height: "100%",
  },
  tbodyDepartamento: {
    paddingTop: 2.5,
    textAlign: "center",
    width: 160,
    height: "100%",
  },
  title: {
    textAlign: "center",
  },
  legendTime: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "auto",
  },
});

const Theader = () => {
  return (
    <View style={styles.theaderRow}>
      <Text style={styles.theaderId}>Id</Text>
      <Text style={styles.theaderNombre}>Nombre</Text>
      <Text style={styles.theaderApellidoP}>Apellido Paterno</Text>
      <Text style={styles.theaderApellidoM}>Apellido Materno</Text>
      <Text style={styles.theaderDepartamento}>Departamento</Text>
    </View>
  );
};

const Tbody = ({ data }) => {
  return (
    <View style={styles.theaderRowItems}>
      <Text style={styles.tbodyId}>{data.idchecador || "--"}</Text>
      <Text style={styles.tbodyNombre}>{data.nombre}</Text>
      <Text style={styles.tbodyApellidoP}>{data.apellido_paterno}</Text>
      <Text style={styles.tbodyApellidoM}>{data.apellido_materno}</Text>
      <Text style={styles.tbodyDepartamento}>{data.departamento}</Text>
    </View>
  );
};

const Mydoc = ({ data, title }) => {
  return (
    <Document title="Control de empleados">
      <Page size="LETTER" style={styles.page}>
        <View style={styles.title}>
          <Text>{title}</Text>
        </View>

        <View style={styles.tableContainer}>
          <Theader />
          {data.map((el) => (
            <Tbody key={el.idempleado} data={el} />
          ))}
        </View>
        <View style={styles.legendTime}>
          <Text>Impreso el día </Text>{" "}
          <Text>
            {new Intl.DateTimeFormat("es-MX", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date())}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const PdfEmpleados = ({ data, title }) => {
  console.log(title);
  return (
    <div>
      {/* <PDFViewer width="800px" height={800}> */}
      <BlobProvider document={<Mydoc data={data} title={title} />}>
        {({ url }) => (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-danger"
          >
            <i className="bi bi-file-earmark-pdf"></i>
          </a>
        )}
      </BlobProvider>
      {/* <Mydoc data={data}></Mydoc> */}
      {/* </PDFViewer> */}
    </div>
  );
};

export default PdfEmpleados;
