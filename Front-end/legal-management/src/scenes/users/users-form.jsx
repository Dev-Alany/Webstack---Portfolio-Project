import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { setupManagementUrl, userManagementClient } from "../../config";
import DynamicForm from "../../data/Axios/DynamicForm";
import { usersField } from "../../data/DynamicTable/usersDynamicForms";

const UsersForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialValues = {
    firstName: props.userData ? props.userData.firstName : "",
    lastName: props.userData ? props.userData.lastName : "",
    email: props.userData ? props.userData.email : "",
    phone: props.userData ? props.userData.phone : "",
    username: props.userData ? props.userData.username : "",
    idno: props.userData ? props.userData.idno : "",
    companyId: props.userData ? props.userData.companyId : "",
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${setupManagementUrl.uri}/companies`);
        setCompanyData(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const companyOptions = companyData.map((company) => ({
    value: company.id,
    label: company.company,
  }));

  const handleSubmit = async (values, { setSubmitting }) => {
    const { firstName, lastName, email, phone, username, idno, companyId } = values;

    try {
      if (props.isEditing) {
        await userManagementClient.put(`/users/${props.userData.id}`, {
          firstName,
          lastName,
          email,
          phone,
          username,
          idno,
          companyId,
          createdBy: userId,
        });
        swal("Success!", "User has been updated successfully", "success");
      } else {
        await userManagementClient.post("/users", {
          firstName,
          lastName,
          email,
          phone,
          username,
          idno,
          companyId,
          createdBy: userId,
        });
        swal("Success!", "User has been created successfully", "success");
      }
      props.onClose();
    } catch (error) {
      swal("Error!", "Unable to save user, try again later", "error");
    }

    setSubmitting(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  const fields = [
    ...usersField,
    {
      name: "companyId",
      label: "Company",
      type: "select",
      options: companyOptions,
      gridColumn: "span 2",
      required: true,
    },
  ];

  return (
    <DynamicForm
      initialValues={initialValues}
      fields={fields}
      onSubmit={handleSubmit}
      title={props.isEditing ? "Edit User" : "Create User"}
      subtitle={props.isEditing ? "Edit an Existing User" : "Create a New User"}
    />
  );
};

export default UsersForm;
