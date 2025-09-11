// utils/exportCoilsPdf.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import type { Coil } from "@/graphql/schema.types";

type ColorInfo = { name: string | null; hexcode?: string };

type TDict = {
  reportTitle: string;
  date: string;
  totalItems: string;
  totalWeight: string;
  page: string;
  of: string;
  cols: {
    coilno: string;
    color: string;
    loc: string;
    loadDate: string;
    thickness: string;
    widthMm: string;
    currWeight: string;
    status: string;
  };
};

const enDict: TDict = {
  reportTitle: "Coil Report",
  date: "Date",
  totalItems: "Total Coils",
  totalWeight: "Total Weight",
  page: "Page",
  of: "of",
  cols: {
    coilno: "Coil No.",
    color: "Color",
    loc: "Location",
    loadDate: "Last Updated",
    thickness: "Thickness",
    widthMm: "Width (mm)",
    currWeight: "Weight (kg)",
    status: "Status",
  },
};

type Params = {
  rows: Coil[];
  colorMap: Map<string, ColorInfo>;
  locationMap: Map<number, string>;
  totalItems?: number;
  totalWeight: number;
  filename?: string;
  t?: TDict; // override texts if needed
};

export async function exportCoilsPdf({
  rows,
  colorMap,
  locationMap,
  totalItems,
  totalWeight,
  filename = dayjs().format("YYYY-MM-DD") + "-coils.pdf",
  t = enDict,
}: Params) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const now = dayjs().format("YYYY-MM-DD HH:mm");

  const columns = [
    { header: t.cols.coilno, dataKey: "coilno" },
    { header: t.cols.color, dataKey: "colorName" },
    { header: t.cols.loc, dataKey: "locName" },
    { header: t.cols.loadDate, dataKey: "loadDate" },
    { header: t.cols.thickness, dataKey: "thickness" },
    { header: t.cols.widthMm, dataKey: "widthMm" },
    { header: t.cols.currWeight, dataKey: "currWeight" },
    { header: t.cols.status, dataKey: "status" },
  ];

  // Sort rows by loadDate descending
  const data = rows
    .slice()
    .sort((a, b) => {
      const da = a.loadDate ? dayjs(a.loadDate) : dayjs(0);
      const db = b.loadDate ? dayjs(b.loadDate) : dayjs(0);
      return db.valueOf() - da.valueOf();
    })
    .map((r) => ({
      coilno: r.coilno ?? "-",
      colorName: r.color
        ? colorMap.get(r.color.trim())?.name ?? r.color
        : "-",
      locName:
        r.loc != null
          ? locationMap.get(r.loc as number) ??
            (String(r.loc).toLowerCase().includes("τελωνειακή")
              ? "Arkhon dispatch"
              : String(r.loc))
          : "-",
      loadDate: r.loadDate
        ? dayjs(r.loadDate as any).add(3,"hours").format("YYYY-MM-DD HH:mm")
        : "-",
      thickness: r.thickness ?? "-",
      widthMm:
        r.widthCoil != null
          ? Math.round((r.widthCoil as number) * 1000)
          : "-",
      currWeight: r.currWeight ?? "-",
      status: r.status?.name ?? "-",
    }));

  autoTable(doc, {
    head: [columns.map((c) => c.header)],
    body: data.map((d: any) => columns.map((c) => d[c.dataKey])),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [24, 144, 255] },
    margin: { top: 72, left: 20, right: 20, bottom: 40 },
    didDrawPage: (hookData) => {
      if (hookData.pageNumber === 1) {
        doc.setFontSize(14);
        doc.text(t.reportTitle, 20, 28);
        doc.setFontSize(10);
        doc.text(`${t.date}: ${now}`, pageWidth - 20, 28, { align: "right" });

        doc.setFontSize(11);
        if (typeof totalItems === "number") {
          doc.text(
            `${t.totalItems}: ${totalItems.toLocaleString("en-US")}`,
            20,
            46
          );
        }
        doc.text(
          `${t.totalWeight}: ${totalWeight.toLocaleString("en-US")} kg`,
          20,
          62
        );
      }

      const pageCount = doc.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(
        `${t.page} ${hookData.pageNumber} ${t.of} ${pageCount}`,
        pageWidth - 20,
        pageHeight - 16,
        { align: "right" }
      );
    },
  });

  doc.save(filename);
}
