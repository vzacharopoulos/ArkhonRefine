import { Edit, useForm } from "@refinedev/antd";
import { useResourceParams } from "@refinedev/core";
import { Col, Form, Input, Row } from "antd";
import { GET_COIL, UPDATE_COIL } from "@/graphql/queries";  // assume you defined GET_COIL_BY_ID
import { useNumericResourceParams } from "@/utilities";
import { GetFields } from "@refinedev/nestjs-query";
import { Coil } from "@/graphql/schema.types";

export const CoilEdit: React.FC = () => {

  const { id } = useNumericResourceParams()
  const {
    formProps,
    saveButtonProps,
    formLoading,
    query,
  } = useForm({
    resource: "coil",

    id: id,
    meta: {
      gqlMutation: UPDATE_COIL,
      gqlQuery: GET_COIL
      , // ✅ now Refine will use the right query
     

    },

  });
      

      const commentsloc = query?.data?.data.loc;// define in edit what comments are shown
              let commentFieldLabel: string;
                            let commentFieldName: keyof Coil
           
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
      commentFieldLabel=  "Σχολια Βαφής";
      break;
    default:
      commentFieldName = "comments"; // fallback/general
      commentFieldLabel=  "Σχόλια"
  }
  
  console.log("Coil data:", commentsloc);
 
  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} xl={12}>
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
          {/* formProps already contains initialValues and onFinish */}
          <Form {...formProps} layout="vertical"
            onFinish={(values) =>
              formProps.onFinish?.({
                ...values,
              })
            }
          >
            <Form.Item label={commentFieldLabel} name={commentFieldName}>
              <Input placeholder="Enter comment" />
            </Form.Item>
            {/* No need for other fields if only editing comments */}
          </Form>
        </Edit>
      </Col>
    </Row>
  );
};
