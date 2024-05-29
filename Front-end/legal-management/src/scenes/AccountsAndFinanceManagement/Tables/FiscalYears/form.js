import React from "react";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import DynamicForm from "../../../../data/Axios/DynamicForm";
import { AccountsandFinanceurl } from "../../../../config";
import { fiscalYearFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
import { generateAndExecuteMutation } from "../../../../data/Axios/DynamicService";

const base_url = AccountsandFinanceurl.uri;

const FiscalYearForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const companyId = parseInt(decodedToken.CompanyId);
  const initialValues = {
    id: props.data ? props.data.id : "",
    fiscalYearName: props.data ? props.data.fiscalYearName : "",
    startDate: props.data ? props.data.startDate : "",
    endDate: props.data ? props.data.endDate : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { id, fiscalYearName, startDate, endDate } = values;

      const mutationData = props.isEditing
        ? {
            id,
            fiscalYearName,
            startDate,
            endDate,
            //updatedBy: userId,
            countryId: companyId,
          }
        : {
            fiscalYearName,
            startDate,
            endDate,
            createdBy: userId,
            countryId: companyId,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateFiscalYear" : "createFiscalYear",
        mutationData,
        props.isEditing ? "updatedFiscalYear" : "newFiscalYear",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Fiscal year ${
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
      fields={fiscalYearFields}
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit Fiscal Year" : "Create Fiscal Year"}
      subtitle={
        props.isEditing
          ? "Edit an Existing Fiscal Year"
          : "Create a New Fiscal Year"
      }
    />
  );
};

export default FiscalYearForm;
