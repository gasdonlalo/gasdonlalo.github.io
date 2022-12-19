import { jsPDF as PDF } from "jspdf";
import Options from "./Graloptions.json";
import FormUniforme from "../forms/FormUniforme";
import { Fragment } from "react";
function Pdf_prueba() {
  const doc = new PDF(Options);
  //doc.addImage(imagen, formato, posicion x, posicion y, ancho, alto)
  /*   doc.addImage(img, "PNG", 0, 0, 8.5, 11); */
  doc.text(Date(), 1.8, 1.8, { align: "justify" });
  doc.addJS(FormUniforme);

  doc.text(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Duis at consectetur lorem donec massa sapien faucibus et molestie. Sed adipiscing",
    1.1,
    2.5,
    { maxWidth: "5" }
  );
  doc.text(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Duis at consectetur lorem donec massa sapien faucibus et molestie. Sed adipiscing",
    1.1,
    4.75,
    { maxWidth: "5" }
  );
  doc.html(document.getElementById("tabla"), {
    width: 1,
    windowWidth: 200,
  });

  const generar = () => {
    doc.save("prueba.pdf");
  };
  return (
    <Fragment>
      <div>
        <table id="tabla" class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-primary" onClick={generar}>
        Generar PDF
      </button>
    </Fragment>
  );
}
export default Pdf_prueba;
