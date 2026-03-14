// ============================================================
// PDF Export — html2canvas + jsPDF
// Captures the live CV preview and exports A4 PDF
// ============================================================
export async function exportToPDF(
  elementId: string,
  filename: string = "resume.pdf"
): Promise<void> {
  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element "${elementId}" not found`);

  // Wait for fonts
  if (document.fonts?.ready) await document.fonts.ready;
  await new Promise(resolve => setTimeout(resolve, 400));

  // A4 at 96dpi → 794px wide. Scale=2 → 1588px canvas wide
  // We'll always render at exactly the element's rendered width
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const SCALE = 2;

  const canvas = await html2canvas(element, {
    scale: SCALE,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    // Remove scrollY offset so it captures from top
    y: 0,
    x: 0,
    onclone: (clonedDoc, clonedEl) => {
      // Fix fonts in cloned doc
      const style = clonedDoc.createElement("style");
      style.innerHTML = `
        * {
          word-spacing: 0px !important;
          letter-spacing: normal !important;
          -webkit-font-smoothing: antialiased;
        }
        @font-face { font-family: 'Playfair Display'; src: local('Georgia'); }
        @font-face { font-family: 'DM Sans'; src: local('Arial'); }
      `;
      clonedDoc.head.appendChild(style);

      // Walk all elements and replace Google font references
      clonedEl.querySelectorAll("*").forEach((el) => {
        const htmlEl = el as HTMLElement;
        const ff = htmlEl.style.fontFamily || "";
        if (ff.includes("Playfair Display")) {
          htmlEl.style.fontFamily = "Georgia, 'Times New Roman', serif";
        } else if (ff.includes("DM Sans")) {
          htmlEl.style.fontFamily = "Arial, Helvetica, sans-serif";
        }
      });
    },
  });

  // Canvas dimensions
  const canvasWidthPx = canvas.width;   // e.g. 1588
  const canvasHeightPx = canvas.height; // e.g. 2244 (A4 at 2x)

  // MM per pixel: A4 width in mm / canvas width in px
  const mmPerPx = A4_WIDTH_MM / canvasWidthPx;

  // Height of canvas in mm
  const canvasHeightMM = canvasHeightPx * mmPerPx;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.95);

  if (canvasHeightMM <= A4_HEIGHT_MM) {
    // Fits in one page — fill width, align to top
    pdf.addImage(imgData, "JPEG", 0, 0, A4_WIDTH_MM, canvasHeightMM);
  } else {
    // Multi-page: slice the canvas into A4-height chunks
    const pageHeightPx = Math.floor(A4_HEIGHT_MM / mmPerPx);
    let remainingPx = canvasHeightPx;
    let offsetPx = 0;
    let pageNum = 0;

    while (remainingPx > 0) {
      const sliceHeightPx = Math.min(pageHeightPx, remainingPx);
      const sliceHeightMM = sliceHeightPx * mmPerPx;

      // Create a slice canvas
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvasWidthPx;
      sliceCanvas.height = sliceHeightPx;
      const ctx = sliceCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(canvas, 0, -offsetPx);
      }

      const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.95);

      if (pageNum > 0) pdf.addPage();
      pdf.addImage(sliceData, "JPEG", 0, 0, A4_WIDTH_MM, sliceHeightMM);

      offsetPx += sliceHeightPx;
      remainingPx -= sliceHeightPx;
      pageNum++;
    }
  }

  pdf.save(filename);
}

export function generateFilename(name: string): string {
  const safe = name.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
  return `${safe || "resume"}_CV.pdf`;
}
