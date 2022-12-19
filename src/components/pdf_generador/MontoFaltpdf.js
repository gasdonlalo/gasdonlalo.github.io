import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function MontoFaltpdf() {
  const generar = () => {
    const element = document.getElementById("grafica");
    html2canvas(element, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "px", "letter");
      var w = element.offsetWidth / 2;
      var h = element.offsetHeight / 2;

      pdf.addImage(imgData, "JPEG", 0, 0, w, h);
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
