import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../config";
import DynamicForm from "../../data/Axios/DynamicForm";

const UsersForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);

  const initialValues = {
    first_name: props.userData ? props.userData.first_name : "",
    last_name: props.userData ? props.userData.last_name : "",
    email: props.userData ? props.userData.email : "",
    phone: props.userData ? props.userData.phone : "",
    // username: props.userData ? props.userData.username : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const {first_name,last_name,email, phone} = values;

    try {
      if (props.isEditing) {
        await userManagementClient.put(`/data/${props.userData.id}`, {
          first_name,
          last_name,
          email,
          phone,
          // username,
          // createdBy: userId,
        });
        swal("Success!", "User has been updated successfully", "success");
      } else {
        await userManagementClient.post("/data", {
          first_name,
          last_name,
          email,
          phone,
          // username,
          // createdBy: userId,
        });
        swal("Success!", "User has been created successfully", "success");
      }
      props.onClose();
    } catch (error) {
      swal("Error!", "Unable to save user, try again later", "error");
    }

    setSubmitting(false);
  };

  const fields = [
    { name: "first_name", label: "First Name", type: "text", required: true },
    { name: "last_name", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "text", required: true },
    // { name: "username", label: "Username", type: "text", required: true },
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