import React, { useEffect ,useState} from "react";
import Swal from "sweetalert2";
import DynamicForm from "../../../../data/Axios/DynamicForm";
import { AccountsandFinanceurl, setupManagementUrl } from "../../../../config";
import { taxRateFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
import { generateAndExecuteMutation, graphqlQuery } from "../../../../data/Axios/DynamicService";
import { allCountries, allTaxAuthorities } from "../../../../data/Axios/queries";

const base_url = AccountsandFinanceurl.uri;
const setup_url = setupManagementUrl.uri
const TaxRateForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const companyId = parseInt(decodedToken.CompanyId);

  const initialValues = {
    id: props.data ? props.data.id : "",
    name: props.data ? props.data.name : "",
    rate: props.data ? props.data.rate : "",
    taxAuthorityID: props.data ? props.data.taxAuthorityID : "",
    paymentID: props.data ? props.data.paymentID : "",
    companyId: props.data ? props.data.companyId : companyId,
    company: props.data ? props.data.company : "",
    countryId: props.data ? props.data.countryId : "",
    country: props.data ? props.data.country : "",
  };
  const [authorityData, setAuthorityData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAllData() {
      try {
        const taxAuthorityDataResponse = await graphqlQuery(allTaxAuthorities, base_url);
        if (taxAuthorityDataResponse) {
          setAuthorityData(taxAuthorityDataResponse);
        }
          const countryDataResponse = await graphqlQuery(
            allCountries,
            setup_url
          );
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
  const authorityOptions = authorityData
    ? authorityData.map((authority) => ({
        value: authority.id,
        label: authority.name,
      }))
    : [];
    const countryOptions = countryData
      ? countryData.map((country) => ({
          value: country.id,
          label: country.country,
        }))
      : [];
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const {
        id,
        name,
        rate,
        taxAuthorityID,
        paymentID,
        companyId,
       
        countryId,
        country,
      } = values;

      const mutationData = props.isEditing
        ? {
            id,
            name,
            rate:parseFloat(rate),
            taxAuthorityID,
            paymentID,
            companyId: companyId,
          countryId,
            country,
            //updatedBy: userId,
          }
        : {
            name,
            rate:parseFloat(rate),
            taxAuthorityID,
          
            companyId: companyId,
       
          countryId,
           // createdBy: userId,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateTaxRate" : "createTaxRate",
        mutationData,
        props.isEditing ? "updatedTaxRate" : "newTaxRate",
        base_url
      );

           if (Object.values(response)[0] != null) {
             props.onClose();
             props.onAction();
             Swal.fire({
               icon: "success",
               title: "Success!",
               text: `Tax rate ${
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
  const forms = [
    ...taxRateFields,
    {
      name: "taxAuthorityID",
      label: "Tax Authority ",
      type: "select",
      gridColumn: "span 2",
      required: true,
      options: authorityOptions,
    },

    {
      name: "countryId",
      label: "Country ",
      type: "select",
      gridColumn: "span 2",
      required: true,
      options: countryOptions,
    },
  ];
  return (
    <DynamicForm
      initialValues={initialValues}
      fields={forms}
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit Tax Rate" : "Create Tax Rate"}
      subtitle={
        props.isEditing ? "Edit an Existing Tax Rate" : "Create a New Tax Rate"
      }
    />
  );
};

export default TaxRateForm;
