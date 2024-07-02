import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../config";
import { getAllUsers } from "../../api/userservice";
import DynamicForm from "../../data/DynamicForm/DynamicForm";
import { CaseFields } from "../../data/Fields/CaseFields";

const CasesForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [error, setError] = useState(null);
  const [clientele, setClientele] = useState("");
  const [clientType, setClientType] = useState("");
  const [clientTypeOptions, setClientTypeOptions] = useState("");
  const [category, setCategory] = useState("");
  const [individualOptions, setIndividualOptions] = useState([]);
  const [corporateOptions, setCorporateOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [showCorporateClient, setShowCorporateClient] = useState(false);
  const [showIndividualClient, setShowIndividualClient] = useState(false);

  const base_url = "cases";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers(base_url);
      setData(response.data); // Adjust based on your API response structure
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientOptions = async () => {
    try {
      const individualResponse = await getAllUsers("individualclients");
      const corporateResponse = await getAllUsers("corporateclients");
      const clientResponse = await getAllUsers("clienttype");
      const categoryResponse = await getAllUsers("Category");
      if (categoryResponse) {
        setCategoryOptions(categoryResponse.data);
      }
      const response = await getAllUsers(`Casesubcategory/${1}`);
        setSubcategoryOptions(response.data);
      setIndividualOptions(individualResponse.data);
      setCorporateOptions(corporateResponse.data);
      setClientTypeOptions(clientResponse.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchClientOptions();
  }, [base_url, refreshTable]);

  const fetchSubcategoryOptions = async () => {
    // const categoryId = sessionStorage.getItem("categoryId");
      try {
        setLoading(true);
        const response = await getAllUsers(`Casesubcategory/${1}`);
        setSubcategoryOptions(response.data);
      } catch (err) {
        setError(err);
      }finally{
        setLoading(false);
      }
  };

  const handleCategoryChange = async () => {
    // const categoryId = e.target.value;
    // setCategory(categoryId);
    // sessionStorage.setItem("categoryId", categoryId);
    await fetchSubcategoryOptions();
  };

  const initialValues = {
    Name: props.data ? props.data.name : "",
    id: props.data ? props.data.id : "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setClientType(values.clientType);
    try {
      if (props.isEditing) {
        await userManagementClient.put(`/${base_url}/${props.data.id}`, values);
      } else {
        await userManagementClient.post(`/${base_url}`, values);
      }
      setRefreshTable((prev) => !prev); // Refresh the table after submission
    } catch (error) {
      swal("Error!", "Unable to save user, try again later", "error");
    } finally {
      setLoading(false);
    }
  };

  const IndivOptions = individualOptions
    ? individualOptions.map((gender) => ({
        parent_key: gender.id,
        value: gender.id,
        label: gender.First_name,
      }))
    : [];

  const CorpOptions = corporateOptions.map((corp) => ({
    parent_key: corp.id,
    value: corp.id,
    label: corp.First_name,
  }));

  const CategoryOptions = categoryOptions.map((category) => ({
    parent_key: category.id,
    value: category.id,
    label: category.Category,
  }));

  const clientOptions = clientTypeOptions
    ? clientTypeOptions.map((gender) => ({
        parent_key: gender.id,
        value: gender.id,
        label: gender.Client_Type,
      }))
    : [];

  const CasesubcategoryOptions = subcategoryOptions.map((subcategory) => ({
    parent_key: subcategory.id,
    value: subcategory.id,
    label: subcategory.Category,
  }));

  const dynamicFields = [
    ...CaseFields,
    {
      id: "clientType",
      name: "clientType",
      label: "Client Type",
      type: "select",
      options: clientOptions,
      isRequired: true,
      onChange: (e) => setClientType(e.target.value),
    },
    {
      id: "first_name",
      name: "clients_first_name",
      label: "First Name",
      type: "select",
      options: clientType === "individual" ? IndivOptions : CorpOptions,
      isRequired: true,
    },
    {
      id: "Category",
      name: "Category",
      label: "Category",
      type: "select",
      options: CategoryOptions,
      isRequired: true,
      // onChange: handleCategoryChange,
    },
    {
      id: "Subcategory",
      name: "Subcategory",
      label: "Subcategory",
      type: "select",
      options: CasesubcategoryOptions,
      isRequired: true,
      disabled: !category, // Disable the subcategory field if no category is selected
    },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DynamicForm
      fields={dynamicFields}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isEditing={props.isEditing}
      initialData={initialValues}
    />
  );
};

export default CasesForm;