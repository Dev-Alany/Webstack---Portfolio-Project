import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  generateAndExecuteBulkMutation,
  generateAndExecuteMutation,
} from "../../../../data/Axios/DynamicService";
import { caseManagementUrl } from "../../../../config";
import { useState } from "react";
import Header from "../../../../components/Header";

const base_url = caseManagementUrl.uri;

const FactsForm = (props) => {
  const initialValues = {
    caseId: props.data ? props.data.caseId : "",
    categoryId: props.data ? props.data.categoryId : "",
    factDescription: props.data ? props.data.factDescription : "",
  };

  const validationSchema = yup.object().shape({
    factDescription: yup.string().required("Fact Description is required"),
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const caseIdFromSession = JSON.parse(localStorage.getItem("CaseId"));
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userIdFromSession = parseInt(decodedToken.Id);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { factDescription, createdDate, updatedBy } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            caseId: caseIdFromSession,
            factDescription,
            updatedBy: userIdFromSession,
          }
        : {
            caseId: caseIdFromSession,

            factDescription,

            createdBy: userIdFromSession,
          };

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateFact" : "createFact",
        mutationData,
        props.isEditing ? "updatedFact" : "newFact",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Fact ${props.isEditing ? "updated" : "created"} successfully.`,
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
    <Box m="20px">
      <Header
        title={props.isEditing ? "Edit Fact" : "Create Fact"}
        subtitle={
          props.isEditing ? "Edit an Existing Fact" : "Create a New Fact"
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
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fact Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.factDescription}
                name="factDescription"
                error={touched.factDescription && !!errors.factDescription}
                helperText={touched.factDescription && errors.factDescription}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
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

export default FactsForm;
