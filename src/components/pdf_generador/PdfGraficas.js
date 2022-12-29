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
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

function PdfGraficas() {
  //resgistro de fuentes calibri
  Font.register({ family: "calibri", src: calibri });
  Font.register({ family: "calibrib", src: calibriN });
  const [img, setImg] = useState();

  //captura la imagen
  const capturar = () => {
    //elemento donde se encuentra la tabla y la grafica
    const element = document.getElementById("render");

    html2canvas(element, { scale: 4, allowTaint: true }).then((canvas) => {
      setImg(canvas.toDataURL("image/JPEG"));
      console.log(img);
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
          <Document title="Ola">
            <Page size="LETTER" orientation="landscape">
              <View
                style={{
                  width: "100%",
                  height: " 10%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignContent: "center",
                  fontFamily: "calibri",
                }}
              >
                <Image src={gdl} style={{ width: "55px" }} />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "calibrib",
                    }}
                  >
                    GASOLINERIA DON LALO S.A. DE C.V.
                  </Text>
                  <Text style={{ textAlign: "center", fontSize: "12pt" }}>
                    Grafica n
                  </Text>
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
                    width: "60%",
                    height: "5%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    /* border: "1px solid black", */
                  }}
                >
                  <Text>Mes</Text>
                  <Text
                    style={{
                      border: "0.5px solid black",
                      maxHeight: "24pt",
                      marginLeft: "4px",
                    }}
                  >
                    añoña
                  </Text>
                </View>
                <View
                  style={{
                    width: "60%",
                    height: "5%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    /* border: "1px solid black", */
                  }}
                >
                  <Text s>Año</Text>
                  <Text
                    style={{
                      border: "0.5px solid black",
                      maxHeight: "24pt",
                      marginLeft: "4px",
                      marginRight: "50px",
                    }}
                  >
                    XD
                  </Text>
                </View>
              </View>
              {/* Termina mes y año */}
              <View
                style={{
                  width: "100%",
                  heigth: "70%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {!img ? false : <Image src={img} style={{ width: "55%" }} />}
              </View>
              {/* Termina grafica */}
              <View
                style={{
                  position: "absolute",
                  bottom: "25px",
                  left: "655px",
                }}
              >
                <Image src={tabla} style={{ width: "85px" }} />
              </View>
              {/* Termina tabla de disposicion */}
            </Page>
          </Document>
        </PDFViewer>
      )}
    </Fragment>
  );
}

export default PdfGraficas;
