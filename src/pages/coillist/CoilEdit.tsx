
import { Edit, useForm } from "@refinedev/antd";
import { Button, Col, Descriptions, Card,Form, Input, Row, Select, Typography, message } from "antd";
import { GET_COIL, UPDATE_COIL } from "@/graphql/queries";
import { useNumericResourceParams } from "@/utilities";
import { GetFields } from "@refinedev/nestjs-query";
import { Coil } from "@/graphql/schema.types";
import { useUpdateCoilStatus } from "@/pages/coillist/hooks/useUpdateCoilStatus";

const { Title, Text } = Typography;

export const CoilEdit: React.FC = () => {
  const { id } = useNumericResourceParams();
  const { updateCoilStatus } = useUpdateCoilStatus();

  const { formProps, saveButtonProps, formLoading, query } = useForm({
    resource: "coil",
    id,
    meta: {
      gqlMutation: UPDATE_COIL,
      gqlQuery: GET_COIL,
    },
  });
const shipBayVal = Form.useWatch("shipBayNo", formProps.form);
  const commentsloc = (query?.data?.data as any)?.loc as number | undefined;
  let commentFieldLabel: string;
  let commentFieldName: keyof Coil;

  switch (commentsloc) {
    case 2:
      commentFieldName = "commentsPanel";
      commentFieldLabel = "Σχόλια Πανελ";
      break;
    case 3:
      commentFieldName = "cutComment";
      commentFieldLabel = "Σχόλια Κοπής";
      break;
    case 1:
      commentFieldName = "prodComment";
      commentFieldLabel = "Σχόλια Βαφής";
      break;
    default:
      commentFieldName = "comments";
      commentFieldLabel = "Σχόλια";
  }
  console.log(query?.data?.data)
  const supcoilId = (query?.data?.data as any)?.supcoilId as string | undefined;
   const currWeight = (query?.data?.data as any)?.currWeight as string | undefined;
      const thickness = (query?.data?.data as any)?.thickness as string | undefined;

      const widthCoil = (query?.data?.data as any)?.widthCoil as string | undefined;

  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} xl={12}>

<Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
  {/* Compact info card */}
  <Card size="small" bordered style={{ marginBottom: 4 }}>
    <Descriptions
      size="small"
      column={1}
      colon={false}
      labelStyle={{ color: "rgba(0,0,0,.45)" }}
      contentStyle={{ fontWeight: 600 }}
    >
      <Descriptions.Item label="Κωδ. προμηθευτή">
        {supcoilId ?? "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Βάρος">
        {typeof currWeight === "number" ? `${currWeight} kg` : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Πάχος">
        {typeof thickness === "number" ? `${thickness} mm` : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Πλάτος">
        {typeof widthCoil === "number" ? `${Math.round(widthCoil * 1000)} mm` : "-"}
      </Descriptions.Item>
    </Descriptions>
  </Card>

  <Form
    {...formProps}
    layout="vertical"
    onFinish={(values) => formProps.onFinish?.({ ...values })}
  >
    <Form.Item label="αμπάρι" name="shipBayNo">
      <Select
        placeholder="Select bay number"
        options={[1, 2, 3, 4, 5].map((n) => ({ label: String(n), value: n }))}
        allowClear
      />
    </Form.Item>

    <Form.Item label={commentFieldLabel} name={commentFieldName}>
      <Input placeholder="Enter comment" />
    </Form.Item>

    <Button  disabled={!shipBayVal}
              style={{ display: "flex" }}
              onClick={async () => {
                if (!id) return;
                try {
                  // validate only the field we need for this action
                  await formProps.form?.validateFields(["shipBayNo"]);
                  const shipBayNo = formProps.form?.getFieldValue("shipBayNo") as number | undefined;
                  if (shipBayNo == null) {
                    message.error("Επιλέξτε αμπάρι");
                    return;
                  }
                  console.log(shipBayNo)
                  await updateCoilStatus(id, [7,8], shipBayNo); // <-- pass shipBayNo (MANDATORY)
                } catch (e) {
                  // if it's a validation error, the form will already show messages
                  if (!(e as any)?.errorFields) {
                    message.error("Αποτυχία ενημέρωσης status");
                  }
                }
              }}
            >
              βγαλτο απ το καραβι
            </Button>
  </Form>
</Edit>

      </Col>
    </Row>
  );
};
