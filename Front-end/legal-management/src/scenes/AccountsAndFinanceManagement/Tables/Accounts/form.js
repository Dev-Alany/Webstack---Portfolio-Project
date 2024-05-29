import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import DynamicForm from "../../../../data/Axios/DynamicForm";
import { generateAndExecuteMutation } from "../../../../data/Axios/DynamicService";
import { accountFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
import { AccountsandFinanceurl } from "../../../../config";

const base_url = AccountsandFinanceurl.uri;

const AccountsForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const companyId = parseInt(decodedToken.CompanyId);

  const initialValues = {
    accountName: props.data ? props.data.accountName : "",
    accountNumber: props.data ? props.data.accountNumber : "",
    accountType: props.data ? props.data.accountType : "",
    company: props.data ? props.data.company : "",
    currency: props.data ? props.data.currency : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { accountName, accountNumber, accountType, company, currency } =
        values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            accountName,
            accountNumber,
            accountType,
            company,
            companyId: companyId,
            currency,
            // updatedBy: userId,
          }
        : {
            accountName,
            accountNumber,
            accountType,
            company,
            companyId: companyId,
            currency,
            //createdBy: userId,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateAccount" : "createAccount",
        mutationData,
        props.isEditing ? "updatedAccount" : "newAccount",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction();
     
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Account  ${
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
      fields={accountFields}
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit Account S" : "Create Account "}
      subtitle={
        props.isEditing ? "Edit an Existing Account " : "Create a New Account "
      }
    />
  );
};

export default AccountsForm;
