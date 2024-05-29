import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

import DynamicForm from "../../../../data/Axios/DynamicForm";

import { AccountsandFinanceurl } from "../../../../config";
import Swal from "sweetalert2";
import { accountCategoryFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
import { generateAndExecuteMutation } from "../../../../data/Axios/DynamicService";

const base_url = AccountsandFinanceurl.uri;

const AccountCategoryForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const companyId = parseInt(decodedToken.CompanyId);
  const initialValues = {
    id: props.data ? props.data.id : "",
    status: props.data ? props.data.status : "",
    categoryName: props.data ? props.data.categoryName : "",
    currency: props.data ? props.data.currency : "",
    rate: props.data ? props.data.rate : "",
    parentAccount: props.data ? props.data.parentAccount : "",
    oldParent: props.data ? props.data.oldParent : "",
    companyId: props.data ? props.data.companyId : "",
    company: props.data ? props.data.company : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { categoryName, currency, rate, parentAccount, oldParent } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,

            categoryName,
            currency,
            rate: parseFloat(rate),
            // parentAccount,
            // oldParent,
            companyId: companyId,
            //  updatedBy: userId,
          }
        : {
            categoryName,
            currency,
            rate: parseFloat(rate),
            // parentAccount,
            // oldParent,
            companyId: companyId,
            // createdBy: userId,
          };

      const response = generateAndExecuteMutation(
        props.isEditing ? "updateAccountCategory" : "createAccountCategory",
        mutationData,
        props.isEditing ? "updatedCategory" : "newCategory",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Account category ${
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
      fields={accountCategoryFields}
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit User" : "Create User"}
      subtitle={props.isEditing ? "Edit an Existing User" : "Create a New User"}
    />
  );
};

export default AccountCategoryForm;
