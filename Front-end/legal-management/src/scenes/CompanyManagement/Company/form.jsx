import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import DynamicForm from "../../../data/Axios/DynamicForm";
import {
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../data/Axios/DynamicService";

import { companyManagementUrl } from "../../../config";
import { companyFields } from "../../../data/DynamicTable/CompanyManagementForms";
import { allSubscriptionPlans } from "../../../data/Axios/queries";

const base_url = companyManagementUrl.uri;

const CompanyForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAllData() {
      try {
        const subscriptionsDataResponse = await graphqlQuery(
          allSubscriptionPlans,
          base_url
        );
        if (subscriptionsDataResponse) {
          setSubscriptionsData(subscriptionsDataResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);
  const subscriptionsOptions = subscriptionsData.map((subscriptions) => ({
    value: subscriptions.id,
    label: subscriptions.plan,
  }));
  const fields = [
    ...companyFields,
    {
      name: "subscriptionId",
      label: "Subscription ID",
      type: "select",
      options: subscriptionsOptions,
      gridColumn: "span 2",
      required: true,
    },
  ];
  const initialValues = {
    companyName: props.data ? props.data.companyName : "",
    subscriptionId: props.data ? props.data.subscriptionId : "",
    createdBy: props.data ? props.data.createdBy : userId,
    createdDate: props.data ? props.data.createdDate : new Date().toISOString(),
    updatedBy: userId,
    updatedDate: new Date().toISOString(),
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { companyName, subscriptionId } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            companyName,
            subscriptionId,
            updatedBy: userId,
          }
        : {
            companyName,
            subscriptionId,
            createdBy: userId,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateCompany" : "createCompany",
        mutationData,
        props.isEditing ? "updatedCompany" : "newCompany",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Company ${
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
  if (loading) {
    return <div className="justify-content-center">Loading...</div>;
  }
  return (
    <DynamicForm
      initialValues={initialValues}
      fields={fields}
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit Company" : "Create Company"}
      subtitle={
        props.isEditing ? "Edit an Existing Company" : "Create a New Company"
      }
    />
  );
};

export default CompanyForm;
