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
import { generateAndExecuteBulkMutation, graphqlQuery } from "../../../../data/Axios/DynamicService";
import { caseManagementUrl, setupManagementUrl } from "../../../../config";
import { allJudgesQuery } from "../../../../data/Axios/queries";
import { getDateMeta } from "@fullcalendar/react";
const JudgeAssignmentForm = (props) => {
  const base_url = caseManagementUrl.uri;
  const judges_url = setupManagementUrl.uri;
  const [assignmentData, setAssignmentData] = useState([]);
  const [judgesData, setJudgesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAllData() {
    try {
      
        const data = await graphqlQuery(allJudgesQuery, judges_url);
        if (data !== null) {
          setJudgesData(data);
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
    judgeId: props.data ? props.data.judgeId : "",
  };

  const validationSchema = yup.object().shape({
    //userId: yup.number().required("user Type is required"),
  });
  const caseIdFromSession = JSON.parse(localStorage.getItem("CaseId"));

  const allJudgesOptions = judgesData
    ? judgesData.map((data) => ({
        parent_key: data.judgeId,
        value: data.judgeId,
        label: data.name,
      }))
    : [];
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userIdFromSession = parseInt(decodedToken.Id);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const bulkData = [];

      //values.assignments.forEach((assignment) => {
        values.judgeId.forEach((judgeId) => {
          const assignmentObject = {
            caseId: caseIdFromSession,
            judgeId: judgeId,
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
        props.isEditing ? "updateJudgeAssignment" : "bulkCreateJudgeAssignments",
        props.isEditing ? "newJudgeAssignment" : "newJudgeAssignments",
        bulkData,
        base_url
      );

      if (response) {
        props.onAction();
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `JudgeAssignment ${
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
        title={props.isEditing ? "Edit Judges" : "Assign Judges"}
        subtitle={
          props.isEditing ? "Edit Existing Judges" : "Assign New Judges"
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
              options={judgesData || []}
              getOptionLabel={(option) => option.name || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Judge Panel"
                  error={Boolean(params.error)}
                  helperText={params.error}
                />
              )}
              onChange={(event, newValue) => {
                // Update the Formik field value with the selected options
                setFieldValue(
                  "judgeId",
                  newValue.map((option) => option.judgeId)
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

export default JudgeAssignmentForm;
