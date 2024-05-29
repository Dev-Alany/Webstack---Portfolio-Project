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
  branchFields,
  companyFields,
} from "../../../data/DynamicTable/CompanyManagementForms";
import {
  allCompanies,
  allRegions,
  allSubscriptionPlans,
} from "../../../data/Axios/queries";

const base_url = companyManagementUrl.uri;

const BranchForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const companyId = parseInt(decodedToken.CompanyId);

  const initialValues = {
    branchName: props.data ? props.data.branchName : "",
    createdDate: props.data ? props.data.createdDate : new Date().toISOString(),
    createdBy: props.data ? props.data.createdBy : userId,
    updatedBy: userId,
    updatedDate: new Date().toISOString(),
    companyId: props.data ? props.data.companyId : companyId,
    company: props.data ? props.data.company : "",
    regionId: props.data ? props.data.regionId : "",
    region: props.data ? props.data.region : "",
  };
  const [companyData, setCompanyData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAllData() {
      try {
        const companyDataResponse = await graphqlQuery(allCompanies, base_url);
        if (companyDataResponse) {
          setCompanyData(companyDataResponse);
        }
        const regionDataResponse = await graphqlQuery(allRegions, base_url);
        if (regionDataResponse) {
          setRegionData(regionDataResponse);
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
  const regionOptions = regionData.map((region) => ({
    value: region.id,
    label: region.regionName,
  }));
  const fields = [
    ...branchFields,

    {
      name: "companyId",
      label: "Company ID",
      type: "select",
      gridColumn: "span 2",
      options: companyOptions,
      required: true,
    },
    {
      name: "regionId",
      label: "Region ID",
      type: "select",
      gridColumn: "span 2",
      options: regionOptions,
      required: true,
    },
  ];
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { branchName, companyId, company, regionId, region } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            branchName,
            companyId,

            regionId,

            updatedBy: userId,
          }
        : {
            branchName,
            companyId,

            regionId,

            createdBy: userId,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateBranch" : "createBranch",
        mutationData,
        props.isEditing ? "updatedBranch" : "newBranch",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.Onaction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Branch ${
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
      title={props.isEditing ? "Edit Branch" : "Create Branch"}
      subtitle={
        props.isEditing ? "Edit an Existing Branch" : "Create a New Branch"
      }
    />
  );
};

export default BranchForm;
