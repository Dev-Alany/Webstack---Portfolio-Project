import React from "react";
import { CircularProgress } from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../config";
import DynamicForm from "../../data/Axios/DynamicForm";
import { getAllUsers } from "../../api/userservice";
import { useState } from "react";
const UsersForm = (props) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);


  // const fetchUsers = async () => {
  //   try {
  //     setLoading(true);
  //     const userData = await getAllUsers();
  //     setUsers(userData.userData); // Adjust based on your API response structure
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const userData = getAllUsers();
  
  const initialValues = {
    first_name: props.userData ? props.userData.first_name : "",
    last_name: props.userData ? props.userData.last_name : "",
    email: props.userData ? props.userData.email : "",
    phone: props.userData ? props.userData.phone : "",
    // username: props.userData ? props.userData.username : "",
  };


  const handleSubmit = async (values, { setSubmitting }) => {
    const { first_name, last_name, email, phone, User_Id}= values;

    try {
      if (props.isEditing) {
        await userManagementClient.put(`/update/${User_Id}`, { // Ensure correct prop name
          User_Id,
          first_name,
          last_name,
          email,
          phone,
        });
        swal("Success!", "User has been updated successfully", "success");
      } else {
        await userManagementClient.post("/data", {
          User_Id,
          first_name,
          last_name,
          email,
          phone,
        });
        swal("Success!", "User has been Created successfully", "success");
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
    { name: "User_Id", label: "User_Id", type: "text", required: true },
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