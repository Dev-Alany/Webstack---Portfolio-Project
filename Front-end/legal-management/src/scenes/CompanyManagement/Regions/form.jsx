import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import DynamicForm from "../../../data/Axios/DynamicForm";
import {
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../data/Axios/DynamicService";

import { companyManagementUrl } from "../../../config";
import {
  companyFields,
  regionFields,
} from "../../../data/DynamicTable/CompanyManagementForms";
import {
  allCompanies,
  allSubscriptionPlans,
} from "../../../data/Axios/queries";

const base_url = companyManagementUrl.uri;

const RegionForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const companyId = parseInt(decodedToken.CompanyId);
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAllData() {
      try {
        const companyDataResponse = await graphqlQuery(allCompanies, base_url);
        if (companyDataResponse) {
          setCompanyData(companyDataResponse);
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
  const fields = [
    ...regionFields,

    {
      name: "companyId",
      label: "Company ID",
      type: "select",
      gridColumn: "span 2",
      options: companyOptions,
      required: true,
    },
  ];
  const initialValues = {
    regionName: props.data ? props.data.regionName : "",
    createdDate: props.data ? props.data.createdDate : new Date().toISOString(),
    createdBy: props.data ? props.data.createdBy : userId,
    updatedBy: userId,
    updatedDate: new Date().toISOString(),
    companyId: props.data ? props.data.companyId : companyId,
    company: props.data ? props.data.company : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { regionName, companyId, company } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            regionName,
            companyId,

            updatedBy: userId,
          }
        : {
            regionName,
            companyId,

            createdBy: userId,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateRegion" : "createRegion",
        mutationData,
        props.isEditing ? "updatedRegion" : "newRegion",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Region ${
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
      title={props.isEditing ? "Edit Region" : "Create Region"}
      subtitle={
        props.isEditing ? "Edit an Existing Region" : "Create a New Region"
      }
    />
  );
};

export default RegionForm;
