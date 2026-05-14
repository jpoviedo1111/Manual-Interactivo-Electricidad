import { jsPDF } from "jspdf";

interface Props {
  studentName: string;
  score: number;
  date: Date;
  onClose: () => void;
}

export function CertificateModal({ studentName, score, date, onClose }: Props) {
  function downloadPDF() {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();

    // Marco decorativo
    doc.setDrawColor(26, 35, 126); // azul
    doc.setLineWidth(2);
    doc.rect(10, 10, W - 20, H - 20);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, W - 30, H - 30);

    // Título
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 35, 126);
    doc.setFontSize(28);
    doc.text("CERTIFICADO DE FINALIZACIÓN", W / 2, 50, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(40, 53, 147);
    doc.text("Manual Interactivo de Electricidad", W / 2, 62, { align: "center" });

    // Línea separadora
    doc.setDrawColor(189, 189, 189);
    doc.line(60, 75, W - 60, 75);

    // Texto principal
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Se certifica que", W / 2, 95, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(26, 35, 126);
    doc.text(studentName.toUpperCase(), W / 2, 110, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(33, 33, 33);
    doc.text(
      "ha completado satisfactoriamente las 7 módulos del Manual Interactivo de Electricidad,",
      W / 2, 128, { align: "center" }
    );
    doc.text(
      "basado en la Guía Básica de Electricidad (Soluciones Prácticas/JICA) y el Manual Pirelli-SICA,",
      W / 2, 136, { align: "center" }
    );
    doc.text(
      `aprobando el examen final con un puntaje de ${score}%.`,
      W / 2, 144, { align: "center" }
    );

    // Puntaje destacado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(27, 94, 32); // verde
    doc.text(`${score}%`, W / 2, 168, { align: "center" });

    // Fecha
    const fechaStr = date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(117, 117, 117);
    doc.text(`Emitido el ${fechaStr}`, W / 2, 185, { align: "center" });

    // Pie con sello
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Manual Interactivo de Electricidad — Plataforma Educativa", W / 2, H - 18, { align: "center" });

    const filename = `Certificado_Electricidad_${studentName.replace(/\s+/g, "_")}.pdf`;
    doc.save(filename);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-card p-8 max-w-md w-full text-center fade-in">
        <div className="text-6xl mb-3">🏆</div>
        <h2 className="text-2xl font-bold text-marca-azul mb-2">¡Felicitaciones!</h2>
        <p className="text-gray-700 mb-1">
          Has aprobado el examen final con un puntaje de
        </p>
        <div className="text-5xl font-bold text-marca-verde my-3">{score}%</div>
        <p className="text-sm text-gray-600 mb-5">
          {studentName ? <>Certificado a nombre de <strong>{studentName}</strong></> : "Completa tu nombre en la página de inicio para personalizar el certificado."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={downloadPDF}
            disabled={!studentName}
            className={`px-5 py-2 rounded font-bold text-sm transition ${
              studentName
                ? "bg-marca-naranja hover:bg-orange-700 text-white"
                : "bg-marca-gris-l text-white cursor-not-allowed"
            }`}
          >
            📥 Descargar certificado (PDF)
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded font-bold text-sm bg-marca-gris-l hover:bg-gray-500 text-white"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
