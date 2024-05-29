import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

import Header from "../../../../components/Header";
import {
  generateAndExecuteBulkMutation,
  graphqlQuery,
} from "../../../../data/Axios/DynamicService";
import { caseManagementUrl, userManagementUrl } from "../../../../config";
import { allUsersQuery } from "../../../../data/Axios/queries";
import { getDateMeta } from "@fullcalendar/react";
const TeamAssignmentForm = (props) => {
  const base_url = caseManagementUrl.uri;
  const users_url = userManagementUrl.uri;
  const [assignmentData, setAssignmentData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAllData() {
    try {
      const data = await graphqlQuery(allUsersQuery, users_url);
      if (data !== null) {
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  useEffect(() => {
    fetchAllData();
  }, []);
  const initialValues = {
    userId: props.data ? props.data.userId : "",
  };

  const validationSchema = yup.object().shape({
    //userId: yup.number().required("user Type is required"),
  });
  const caseIdFromSession = JSON.parse(localStorage.getItem("CaseId"));

  const allUsersOptions = userData
    ? userData.map((data) => ({
        parent_key: data.id,
        value: data.id,
        label: data.username,
      }))
    : [];
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userIdFromSession = parseInt(decodedToken.Id);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const bulkData = [];

      //values.assignments.forEach((assignment) => {
      values.userId.forEach((userId) => {
        const assignmentObject = {
          caseId: caseIdFromSession,
          userId: userId,
          isActive: 1,
          statusFlag: 1,
          createdBy: userIdFromSession,
          companyId: null,
          company: null,
        };

        // Push the assignment object to the bulkData array
        bulkData.push(assignmentObject);
      });
      //});

      // Generate bulk mutation
      const response = generateAndExecuteBulkMutation(
        props.isEditing ? "updateTeamAssignment" : "bulkCreateTeamAssignments",
        props.isEditing ? "newTeamAssignment" : "newTeamAssignments",
        bulkData,
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction();
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `TeamAssignment ${
            props.isEditing ? "updated" : "created"
          } successfully.`,
        });
      }

      setSubmitting(false);

      // Perform any additional actions...
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while processing your request. Please try again later.",
      });

      // Reset form
      setSubmitting(false);
    }
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="20px">
      <Header
        title={props.isEditing ? "Edit Case" : "Create Case"}
        subtitle={
          props.isEditing ? "Edit an Existing Case" : "Create a New Case"
        }
      />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Autocomplete
              multiple
              fullWidth
              options={userData || []}
              getOptionLabel={(option) => option.username || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Team Members"
                  error={Boolean(params.error)}
                  helperText={params.error}
                />
              )}
              onChange={(event, newValue) => {
                // Update the Formik field value with the selected options
                setFieldValue(
                  "userId",
                  newValue.map((option) => option.id)
                ); // Assuming id is the unique identifier for users
              }}
            />

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TeamAssignmentForm;
