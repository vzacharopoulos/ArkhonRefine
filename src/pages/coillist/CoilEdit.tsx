
import { Edit, useForm } from "@refinedev/antd";
import { Button, Col, Form, Input, Row, Select, Typography, message } from "antd";
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
  const supcoilId = (query?.data?.data as any)?.supcoilId as string | undefined;
  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} xl={12}>
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
          <Form
            {...formProps}
            layout="vertical"
            onFinish={(values) => formProps.onFinish?.({ ...values })}
          >
            <Text>ρολο με κωδικο προμηθευτη: {supcoilId}</Text>
            <Form.Item label={commentFieldLabel} name={commentFieldName}>
              <Input placeholder="Enter comment" />
            </Form.Item>
            <Button
              style={{ display: "flex" }}
              onClick={async () => {
                if (!id) return;
                try {
                  await updateCoilStatus(id, 7);
                  message.success("Το coil βγηκε απ το καραβι ");
                } catch (e) {
                  message.error("Αποτυχία ενημέρωσης status");
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
