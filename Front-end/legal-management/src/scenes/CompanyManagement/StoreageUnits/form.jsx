import React from "react";
import Swal from "sweetalert2";
import DynamicForm from "../../../data/Axios/DynamicForm";
import {
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../data/Axios/DynamicService";

import { companyManagementUrl } from "../../../config";
import { companyFields, storageUnitFields } from "../../../data/DynamicTable/CompanyManagementForms";
import { allSubscriptionPlans } from "../../../data/Axios/queries";

const base_url = companyManagementUrl.uri;

const StorageUnitForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);

  const initialValues = {
    unit: props.data ? props.data.unit : "",
    description: props.data ? props.data.description : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { unit, description } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            unit,
            description,
            updatedBy: userId,
            updatedDate: new Date().toISOString(),
          }
        : {
            unit,
            description,
            createdBy: userId,
            createdDate: new Date().toISOString(),
            updatedBy: userId,
            updatedDate: new Date().toISOString(),
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateStorageUnit" : "createStorageUnit",
        mutationData,
        props.isEditing ? "updatedStorageUnit" : "newStorageUnit",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.OnAction()
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Storage Unit ${
            props.isEditing ? "updated" : "created"
          } successfully.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while processing your request. Please try again later.",
      });
    }

    setSubmitting(false);
  };

  return (
    <DynamicForm
      initialValues={initialValues}
      fields={storageUnitFields}
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit Storage Unit" : "Create Storage Unit"}
      subtitle={
        props.isEditing
          ? "Edit an Existing Storage Unit"
          : "Create a New Storage Unit"
      }
    />
  );
};

export default StorageUnitForm;
