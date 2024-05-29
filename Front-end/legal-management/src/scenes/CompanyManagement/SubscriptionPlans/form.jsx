import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import DynamicForm from "../../../data/Axios/DynamicForm";
import {
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../data/Axios/DynamicService";

import { companyManagementUrl } from "../../../config";
import { companyFields, subscriptionPlanFields } from "../../../data/DynamicTable/CompanyManagementForms";
import { allStorageUnits, allSubscriptionPlans } from "../../../data/Axios/queries";

const base_url = companyManagementUrl.uri;

const SubscriptionPlanForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
 const [storageUnitData, setstorageUnitData] = useState([]);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
   async function fetchAllData() {
     try {
       const storageUnitDataResponse = await graphqlQuery(
         allStorageUnits,
         base_url
       );
       if (storageUnitDataResponse) {
         setstorageUnitData(storageUnitDataResponse);
       }
     } catch (error) {
       console.error("Error fetching data:", error);
     } finally {
       setLoading(false);
     }
   }
   fetchAllData();
 }, []);
 const storageUnitOptions = storageUnitData.map((storageUnit) => ({
   value: storageUnit.id,
   label: storageUnit.unit,
 }));
 const fields = [
   ...subscriptionPlanFields,
   {
     name: "storageUnitId",
     label: "storage Unit",
     type: "select",
     options: storageUnitOptions,
     gridColumn: "span 2",
     required: true,
   },
 ];
  const initialValues = {
    plan: props.data ? props.data.plan : "",
    description: props.data ? props.data.description : "",
    price: props.data ? props.data.price : "",
    durationMonths: props.data ? props.data.durationMonths : "",
    storageLimit: props.data ? props.data.storageLimit : "",
    storageUnitId: props.data ? props.data.storageUnitId : "",
    isActive: props.data ? props.data.isActive : false,
    createdDate: props.data ? props.data.createdDate : new Date().toISOString(),
    createdBy: props.data ? props.data.createdBy : userId,
    updatedBy: userId,
    updatedDate: new Date().toISOString(),
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const {
        plan,
        description,
        price,
        durationMonths,
        storageLimit,
        storageUnitId,
        isActive,
      } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            plan,
            description,
            price,
            durationMonths,
            storageLimit,
            storageUnitId,
          
            updatedBy: userId,
      
          }
        : {
            plan,
            description,
            price,
            durationMonths,
            storageLimit,
            storageUnitId,
            createdBy: userId,
       
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateSubscriptionPlan" : "createSubscriptionPlan",
        mutationData,
        props.isEditing ? "updatedSubscriptionPlan" : "newSubscriptionPlan",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction()
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Subscription Plan ${
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
      title={
        props.isEditing ? "Edit Subscription Plan" : "Create Subscription Plan"
      }
      subtitle={
        props.isEditing
          ? "Edit an Existing Subscription Plan"
          : "Create a New Subscription Plan"
      }
    />
  );
};

export default SubscriptionPlanForm;
