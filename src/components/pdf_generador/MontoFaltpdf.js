import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function MontoFaltpdf() {
  //genera el pdf
  const generar = () => {
    const element = document.getElementById("render");
    // toma capura de la seccion de tabla y grafica
    html2canvas(element, { scale: 0.8 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px", "letter");

      const imgprop = pdf.getImageProperties(imgData);
      var w = pdf.internal.pageSize.getWidth() / 1.5;
      var h = (imgprop.height * w) / imgprop.width;

      pdf.addImage(imgData, "JPEG", 99, 100, w, h);
      pdf.save("hola.pdf");
    });
  };
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={generar}>
        Generar pdf
      </button>
    </div>
  );
}

export default MontoFaltpdf;
