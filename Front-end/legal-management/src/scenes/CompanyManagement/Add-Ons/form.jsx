import React from "react";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import DynamicForm from "../../../data/Axios/DynamicForm";
import {
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../data/Axios/DynamicService";

import { companyManagementUrl } from "../../../config";
import { addOnFields, companyFields } from "../../../data/DynamicTable/CompanyManagementForms";


const base_url = companyManagementUrl.uri;

const AddOnForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);

  const initialValues = {
    addOnName: props.data ? props.data.addOnName : "",
    description: props.data ? props.data.description : "",
    price: props.data ? props.data.price : "",
    isActive: props.data ? props.data.isActive : false,
    createdDate: props.data ? props.data.createdDate : new Date().toISOString(),
    createdBy: props.data ? props.data.createdBy : userId,
    updatedBy: userId,
    updatedDate: new Date().toISOString(),
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { addOnName, description, price, isActive } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            addOnName,
            description,
          price,
            updatedBy: userId,
           
          }
        : {
            addOnName,
            description,
            price,
        
            createdBy: userId,
          
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateAddOn" : "createAddOn",
        mutationData,
        props.isEditing ? "updatedAddOn" : "newAddOn",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction()
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Add-On ${
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
      fields={addOnFields}
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit Add-On" : "Create Add-On"}
      subtitle={
        props.isEditing ? "Edit an Existing Add-On" : "Create a New Add-On"
      }
    />
  );
};

export default AddOnForm;
