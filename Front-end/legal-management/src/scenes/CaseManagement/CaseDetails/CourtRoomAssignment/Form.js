import {
  Autocomplete,
  Box,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

import Header from "../../../../components/Header";
import {
  fetchDataEngine,
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../../data/Axios/DynamicService";
import { caseManagementUrl, setupManagementUrl } from "../../../../config";
import { allCourtAssignments, allCourts } from "../../../../data/Axios/queries";

const CourtAssignmentsForm = (props) => {
  const base_url = caseManagementUrl.uri;
  const setup_baseurl = setupManagementUrl.uri;
  const [courtAssignments, setCourtAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCourtAssignments() {
    try {
      const data = await graphqlQuery(allCourts, setup_baseurl);
      if (data !== null) {
        setCourtAssignments(data);
      }
    } catch (error) {
      console.error("Error fetching court assignments:", error);
    }
  }

  useEffect(() => {
    fetchCourtAssignments();
  }, []);

  const initialValues = {
    courtId: props.data ? props.data.courtId : "",
  };

  const validationSchema = yup.object().shape({
    courtId: yup.number().required("Court ID is required"),
  });

  const caseIdFromSession = JSON.parse(localStorage.getItem("CaseId"));
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userIdFromSession = parseInt(decodedToken.Id);
  const courtOptions = courtAssignments
    ? courtAssignments.map((data) => ({
        parent_key: data.id,
        value: data.id,
        label: data.court,
      }))
    : [];
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const caseEventObject = {
        caseId: caseIdFromSession,
        courtId: parseInt(values.courtId),

        createdBy: userIdFromSession,
      };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateFact" : "createCourtAssignment",
        caseEventObject,
        props.isEditing ? "updatedFact" : "newCourtAssignment",
        base_url
      );

      if (response) {
        props.onAction();
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Court Assignment created successfully.`,
        });
      }

      setSubmitting(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while processing your request. Please try again later.",
      });

      setSubmitting(false);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header
        title={
          props.isEditing ? "Edit Court Assignment" : "Create Court Assignment"
        }
        subtitle={
          props.isEditing
            ? "Edit an Existing Court Assignment"
            : "Create a New Court Assignment"
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
              options={courtOptions} // Provide options for clientId
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Courts"
                  variant="filled"
                  onBlur={handleBlur}
                  error={touched.courtId && !!errors.courtId}
                  helperText={touched.courtId && errors.courtId}
                />
              )}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "courtId",
                    value: newValue ? newValue.value : "",
                  },
                });
              }}
              sx={{ gridColumn: "span 2" }}
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

export default CourtAssignmentsForm;
