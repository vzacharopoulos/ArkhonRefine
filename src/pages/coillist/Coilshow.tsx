import { useShow } from "@refinedev/core";
import { Show, MarkdownField, RefreshButton } from "@refinedev/antd";
import type { GetFields } from "@refinedev/nestjs-query";

import { Card, Col, Row, Typography } from "antd";


import type { CoilShowQuery,  } from "graphql/types";
import { CoilShowDocument } from "@/graphql/queries";

import { Coil } from "@/graphql/schema.types";
import { useNumericResourceParams } from "@/utilities";

const { Title, Text } = Typography;
export const CoilShow = () => {
const {id}=useNumericResourceParams()


 const { query: queryResult } = useShow<Coil>({
    resource:"coil",
    id,
  metaData: {
    gqlQuery: CoilShowDocument,
  },
});
  

  const { data, isLoading } = queryResult;

  
  const record = data?.data;
  
  // Define fields to display
  const fields: { key: keyof Coil; label: string; isDate?: boolean }[] = [
  { key: "id", label: "ID" },
  { key: "coilno", label: "Κωδικός" },
  { key: "color", label: "Χρώμα" },
  { key: "loc", label: "Τοποθεσία" },
  { key: "currLength", label: "Τρέχον Μήκος" },
  { key: "comments", label: "Σχόλια" },
  { key: "commentsPanel", label: "Σχόλια Panel" },
  { key: "supplier", label: "Προμηθευτής" },
  { key: "openstatus", label: "Κατάσταση Ανοίγματος" },
  { key: "innerdiameter", label: "Εσωτερική Διάμετρος" },
  { key: "quality", label: "Ποιότητα" },
  { key: "supcoilId", label: "Κωδ. Κύριου Ρολού" },
  { key: "customer", label: "Πελάτης" },
  { key: "orderDate", label: "Ημερομηνία Παραγγελίας", isDate: true },
  { key: "corderid", label: "Κωδικός Παραγγελίας" },
  { key: "loadDate", label: "Ημερομηνία Φόρτωσης", isDate: true },
  { key: "tporderId", label: "Κωδ. TP Order" },
  { key: "tporderSort", label: "Σειρά TP Order" },
  { key: "classification", label: "Κατηγοριοποίηση" },
  { key: "painted", label: "Βαμμένο" },
  { key: "heatno", label: "Heat No" },
  { key: "cutWastage", label: "Σπατάλη Κοπής" },
  { key: "nomthickness", label: "Ονομ. Πάχος" },
  { key: "price", label: "Τιμή" },
  { key: "paintDate", label: "Ημερομηνία Βαφής", isDate: true },
  { key: "cutComment", label: "Σχόλιο Κοπής" },
  { key: "surfaceType", label: "Είδος Επιφάνειας" },
  { key: "loaderid", label: "Φορτωτής" },
  { key: "donkey", label: "Γαϊδούρι" },
  { key: "dateofDes34", label: "Ημ/νία Des34", isDate: true },
  { key: "dcustomer", label: "Πελάτης (D)" },
  { key: "prodDate", label: "Ημερομηνία Παραγωγής", isDate: true },
  { key: "datediff", label: "Διαφορά Ημερομηνιών" },
  { key: "datediffnow", label: "Διαφορά με Σήμερα" },
  { key: "tempStatus", label: "Προσωρινή Κατάσταση" },
  { key: "property", label: "Ιδιότητα" },
  { key: "slitrange", label: "Slit Range" },
  { key: "slithick", label: "Slit Thickness" },
  { key: "locTrans", label: "Τοποθεσία Μεταφοράς" },
  { key: "dateTrans", label: "Ημ/νία Μεταφοράς", isDate: true },
  { key: "customs", label: "Τελωνείο" },
  { key: "currLengthAgr", label: "Μήκος Αγροτικό" },
  { key: "currLengthPol", label: "Μήκος Πολωνία" },
  { key: "currLengthAlu", label: "Μήκος Αλουμίνιο" },
  { key: "currLengthAlup", label: "Μήκος Alup" },
  { key: "currLengthPap", label: "Μήκος Χαρτί" },
  { key: "currLengthAlue", label: "Μήκος Alue" },
  { key: "currLengthBit", label: "Μήκος Πίσσα" },
  { key: "currLengthSto", label: "Μήκος Αποθήκη" },
  { key: "anVcoated", label: "Αντικολλητικό" },
  { key: "prodComment", label: "Σχόλιο Παραγωγής" },
  { key: "documents", label: "Έγγραφα" },
  { key: "vesselName", label: "Όνομα Πλοίου" },
  { key: "dischargePort", label: "Λιμάνι Εκφόρτωσης" },
  { key: "productCode", label: "Κωδικός Προϊόντος" },
  { key: "dcustomerName", label: "Όνομα Πελάτη D" },
  { key: "cnomthickness", label: "C Ον. Πάχος" },
  { key: "tnomthickness", label: "T Ον. Πάχος" },
  { key: "ptradecode", label: "Κωδ. Εμπορίου" },
  { key: "clength", label: "Μήκος C" },
  { key: "dateDiffDelNow", label: "Ημ. Παράδοσης vs Σήμερα" },
  { key: "dateDiffCutNow", label: "Ημ. Κοπής vs Σήμερα" },
  { key: "dateDiffCutProd", label: "Ημ. Κοπής vs Παραγωγή" },
  { key: "dateDiffCutSales", label: "Ημ. Κοπής vs Πωλήσεις" },
  { key: "dateDiffDelPaint", label: "Ημ. Παράδοσης vs Βαφή" },
  { key: "dateDiffDelSales", label: "Ημ. Παράδοσης vs Πωλήσεις" },
  { key: "dateDiffDelCut", label: "Ημ. Παράδοσης vs Κοπής" },
  { key: "company", label: "Εταιρεία" },
];

    // Add more as needed...
  

  const renderValue = (key: keyof Coil, value: any) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "string") return value.trim();
    if (typeof value === "number") return value;
    if (typeof value === "object" && "name" in value) return value.name;
    if (fields.find(f => f.key === key)?.isDate) return new Date(value).toLocaleString();
    return String(value);
  };

  return (
    <Show
   
      isLoading={isLoading}
      headerProps={{
        extra: (
          <RefreshButton onClick={() => queryResult.refetch()} />
        ),
      }}
    >
     <Row gutter={[16, 16]}>
  {[...fields.filter(f => record?.[f.key] != null), ...fields.filter(f => record?.[f.key] == null)].map(({ key, label }) => (
    <Col xs={24} sm={12} md={8} key={key as string}>
      <Card size="small" title={label} variant="outlined"    >
        <Text >
          {renderValue(key, record?.[key])}
        </Text>
      </Card>
    </Col>
  ))}
</Row>
    </Show>
  );
};