import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import DynamicForm from "../../../data/Axios/DynamicForm";
import {
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../data/Axios/DynamicService";

import { companyManagementUrl } from "../../../config";
import { companyAddOnFields, companyFields } from "../../../data/DynamicTable/CompanyManagementForms";
import { allAddOns, allCompanies, allSubscriptionPlans } from "../../../data/Axios/queries";

const base_url = companyManagementUrl.uri;
const CompanyAddOnForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);

  const initialValues = {
    companyId: props.data ? props.data.companyId : "",
    addOnId: props.data ? props.data.addOnId : "",
    addOn: props.data ? props.data.addOn : "",
    purchasedDate: props.data
      ? props.data.purchasedDate
      : new Date().toISOString(),
    isActive: props.data ? props.data.isActive : false,
    createdDate: props.data ? props.data.createdDate : new Date().toISOString(),
    createdBy: props.data ? props.data.createdBy : userId,
    updatedBy: userId,
    updatedDate: new Date().toISOString(),
  };
 const [companyData, setCompanyData] = useState([]);
 const [addOnData, setAddOnData] = useState([]);
const [loading, setLoading] = useState(true);
  
 useEffect(() => {
   async function fetchAllData() {
     try {
       const companyDataResponse = await graphqlQuery(allCompanies, base_url);
       if (companyDataResponse) {
         setCompanyData(companyDataResponse);
       }
       const addOnDataResponse = await graphqlQuery(allAddOns, base_url);
       if (addOnDataResponse) {
         setAddOnData(addOnDataResponse);
       }
     } catch (error) {
       console.error("Error fetching data:", error);
     } finally {
       setLoading(false);
     }
   }
   fetchAllData();
 }, []);
 const companyOptions = companyData.map((company) => ({
   value: company.id,
   label: company.companyName,
 }));
 const addOnDataOptions = addOnData.map((addOnData) => ({
   value: addOnData.id,
   label: addOnData.addOnName,
 }));
 const fields = [
   ...companyAddOnFields,

   {
     name: "companyId",
     label: "Company ID",
     type: "select",
     gridColumn: "span 2",
     options: companyOptions,
     required: true,
   },
   {
     name: "addOnId",
     label: "Add On",
     type: "select",
     gridColumn: "span 2",
     options: addOnDataOptions,
     required: true,
   },
 ];
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { companyId, addOnId, addOn, purchasedDate, isActive } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            companyId,
            addOnId,
            addOn,
            purchasedDate,

            updatedBy: userId,
          }
        : {
            companyId,
            addOnId,
            addOn,
            purchasedDate,

            createdBy: userId,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateCompanyAddOn" : "createCompanyAddOn",
        mutationData,
        props.isEditing ? "updatedCompanyAddOn" : "newCompanyAddOn",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction()
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Company Add-On ${
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
      title={props.isEditing ? "Edit Company Add-On" : "Create Company Add-On"}
      subtitle={
        props.isEditing
          ? "Edit an Existing Company Add-On"
          : "Create a New Company Add-On"
      }
    />
  );
};

export default CompanyAddOnForm;
