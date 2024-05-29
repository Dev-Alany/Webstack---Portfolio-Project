import React, { useState ,useEffect} from "react";
import Swal from "sweetalert2";
import DynamicForm from "../../../../data/Axios/DynamicForm";
import { AccountsandFinanceurl, setupManagementUrl } from "../../../../config";
import { taxAuthorityFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
import {
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../../data/Axios/DynamicService";
import {
  allCountries,

} from "../../../../data/Axios/queries";

const base_url = AccountsandFinanceurl.uri;
const setup_url = setupManagementUrl.uri;
const TaxAuthorityForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const companyId = parseInt(decodedToken.CompanyId);
  
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  useState(() => {
    async function fetchAllData() {
      try {
       
        const countryDataResponse = await graphqlQuery(allCountries, setup_url);
        if (countryDataResponse) {
          setCountryData(countryDataResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);
      const countryOptions = countryData
        ? countryData.map((country) => ({
            value: country.id,
            label: country.country,
          }))
    : [];
    const forms = [
      ...taxAuthorityFields,

      {
        name: "countryId",
        label: "Country ",
        type: "select",
        gridColumn: "span 2",
        required: true,
        options: countryOptions,
      },
    ];
  const initialValues = {
    id: props.data ? props.data.id : "",
    name: props.data ? props.data.name : "",
    jurisdiction: props.data ? props.data.jurisdiction : "",
    paymentID: props.data ? props.data.paymentID : "",
    companyId: props.data ? props.data.companyId : companyId,
    company: props.data ? props.data.company : "",
    countryId: props.data ? props.data.countryId : "",
    country: props.data ? props.data.country : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const {
        id,
        name,
        jurisdiction,
        paymentID,
        companyId,
        company,
        countryId,
        country,
      } = values;

      const mutationData = props.isEditing
        ? {
            id,
            name,
            jurisdiction,
         
            companyId: companyId,
     
            countryId,
       
           // updatedBy: userId,
          }
        : {
            name,
            jurisdiction,
         
            companyId: companyId,
        
            countryId,
      
           // createdBy: userId,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateTaxAuthority" : "createTaxAuthority",
        mutationData,
        props.isEditing ? "updatedTaxAuthority" : "newTaxAuthority",
        base_url
      );

          if (Object.values(response)[0] != null) {
            props.onClose();
            props.onAction();
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: `Tax authority ${
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
      fields={forms} // Assuming you will define this elsewhere
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit Tax Authority" : "Create Tax Authority"}
      subtitle={
        props.isEditing
          ? "Edit an Existing Tax Authority"
          : "Create a New Tax Authority"
      }
    />
  );
};

export default TaxAuthorityForm;
