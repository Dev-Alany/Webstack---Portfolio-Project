import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select, TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_MODULE, UPDATE_MODULE } from "../../../data/RoleManagementData"; // Import your GraphQL mutations for creating and updating a module
import swal from "sweetalert";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { generateMutation } from "../../../data/Axios/DynamicService";
import {
  graphqlMutation,
  graphqlQuery,
} from "../../../data/Axios/DynamicService";
import { roleManagemenUrl, setupManagementUrl } from "../../../config";
import { allCompanies } from "../../../data/Axios/queries";
import Swal from "sweetalert2";

const base_url = roleManagemenUrl.uri;
const setup_url = setupManagementUrl.uri;

const ModuleForm = (props) => {
  const initialValues = {
    module: props.data ? props.data.module : "",
    companyId: props.data ? props.data.companyId : "",
  };


  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const companyId = parseInt(decodedToken.CompanyId);
  const validationSchema = yup.object().shape({
    module: yup.string().required("Module name is required"),
    
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { module } = values;
      const mutationName = props.isEditing ? "UpdateModule" : "CreateModule";
      const inputObjectName = props.isEditing ? "updateModule" : "createModule";
      const InputObject = props.isEditing ? "updatedModule" : "newModule";
      const mutationData = props.isEditing
        ? { id: props.data.id, module, companyId: companyId, createdBy: userId }
        : { module, companyId: companyId, createdBy: userId };

      const mutation = generateMutation(
        mutationName,
        inputObjectName,
        mutationData,
        InputObject
      );
      console.log("mutation", mutation);

      if (mutation) {
        await graphqlMutation(mutation, base_url);
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Module ${
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

  return (
    <Box m="20px">
      <Header
        title={props.isEditing ? "Edit Module" : "Create Module"}
        subtitle={
          props.isEditing ? "Edit an Existing Module" : "Create a New Module"
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Module Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.module}
                name="module"
                error={touched.module && !!errors.module}
                helperText={touched.module && errors.module}
                sx={{ gridColumn: "span 2" }}
              />


              {/* <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Company"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyId}
                name="companyId"
                error={touched.companyId && !!errors.companyId}
                helperText={touched.companyId && errors.companyId}
                sx={{ gridColumn: "span 2" }}
              /> */}
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

export default ModuleForm;
