import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../config";
import { getAllUsers } from "../../api/userservice";
import { CaseFields } from "../../data/Fields/CaseFields";
import DynamicForm from "../../data/DynamicForm/DynamicForm";
import { userFormFields } from "../../data/Fields/userFields";

const CasesForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [error, setError] = useState(null);
  const base_url = "cases";

  useEffect(() => {
    fetchUsers();
  }, [base_url, refreshTable]);

  const values = {}

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
  const initialValues = {
    Name: props.data ? props.data.name : "",
    id: props.data ? props.data.id : "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (props.isEditing) {
        await userManagementClient.put(`/${base_url}/${props.data.id}`, values);
      } else {
        await userManagementClient.post(`/${base_url}`, values);
      }
      setRefreshTable((prev) => !prev); // Refresh the table after submission
    } catch (error) {
      throw new Error("Unable to save user, try again later");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DynamicForm
      fields={CaseFields}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isEditing={props.isEditing}
      initialData={initialValues}
    />
  );
};

export default CasesForm;