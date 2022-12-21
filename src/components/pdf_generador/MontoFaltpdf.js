import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function MontoFaltpdf() {
  const generar = () => {
    const element = document.getElementById("render");

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px", "letter");

      const imgprop = pdf.getImageProperties(imgData);
      var w = pdf.internal.pageSize.getWidth() / 1.5;
      var heig = pdf.internal.pageSize.getHeight();
      var h = (imgprop.height * w) / imgprop.width;
      console.log(w, heig);

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
