import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  generateAndExecuteMutation,
  generateMutation,
  graphqlMutation,
  graphqlQuery,
} from "../../../data/Axios/DynamicService";
import {
  caseManagementUrl,
  clientManagementUrl,
  setupManagementUrl,
} from "../../../config";
import {
  allCorporateClients,
  allIndividualClients,
  caseCategory,
} from "../../../data/Axios/queries";
import { fetchDataEngine } from "../../../data/Axios/DynamicService";
import { useState } from "react";
import Header from "../../../components/Header";

const base_url = clientManagementUrl.uri;

const IndividualClientsForm = (props) => {
  const initialValues = {
    id: props.data ? props.data.id : null,
    firstName: props.data ? props.data.firstName : null,
    lastName: props.data ? props.data.lastName : null,
    dateOfBirth: props.data ? props.data.dateOfBirth : null,
    genderId: props.data ? props.data.genderId : null,
    gender: props.data ? props.data.gender : null,
    nationality: props.data ? props.data.nationality : null,
    identificationType: props.data ? props.data.identificationType : null,
    identificationNumber: props.data ? props.data.identificationNumber : null,
    contactNumber: props.data ? props.data.contactNumber : null,
    email: props.data ? props.data.email : null,
    address: props.data ? props.data.address : null,
    occupation: props.data ? props.data.occupation : null,
    employer: props.data ? props.data.employer : null,
    isActive: props.data ? props.data.isActive : 1,
    emergencyContactName: props.data ? props.data.emergencyContactName : null,
    emergencyContactNumber: props.data
      ? props.data.emergencyContactNumber
      : null,
    relationshipWithEmergencyContact: props.data
      ? props.data.relationshipWithEmergencyContact
      : null,
    notes: props.data ? props.data.notes : null,
    dateAdded: props.data ? props.data.dateAdded : null, // Added this field
    statusFlag: props.data ? props.data.statusFlag : null, // Added this field
    createdBy: props.data ? props.data.createdBy : null,
    createdDate: props.data ? props.data.createdDate : null, // Added this field
    updatedBy: props.data ? props.data.updatedBy : null,
    updatedDate: props.data ? props.data.updatedDate : null, // Added this field
    companyId: props.data ? props.data.companyId : null,
    company: props.data ? props.data.company : null,
  };

  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    contactNumber: yup.string().required("Contact Number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Destructure values
      const {
        firstName,
        lastName,
        dateOfBirth,
        genderId,
        gender,
        nationality,
        identificationType,
        identificationNumber,
        contactNumber,
        email,
        address,
        occupation,
        employer,
        isActive,
        emergencyContactName,
        emergencyContactNumber,
        relationshipWithEmergencyContact,
        notes,
        dateAdded, // Added this field
        statusFlag, // Added this field
        createdBy,
        createdDate, // Added this field
        updatedBy,
        updatedDate, // Added this field
        companyId,
        company,
      } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            firstName,
            lastName,
            dateOfBirth,
            genderId,
            gender,
            isActive: props.data.isActive,
            nationality,
            identificationType,
            identificationNumber,
            contactNumber,
            email,
            address,
            occupation,
            employer,
            emergencyContactName,
            emergencyContactNumber,
            relationshipWithEmergencyContact,
            notes,
            dateAdded,
            statusFlag,
            createdBy,
            createdDate,
            updatedBy: userId,
            updatedDate,
            companyId,
            company,
          }
        : {
            firstName,
            lastName,
            dateOfBirth,
            genderId,
            gender,
            nationality,
            identificationType,
            identificationNumber,
            contactNumber,
            email,
            address,
            occupation,
            employer,
            emergencyContactName,
            emergencyContactNumber,
            relationshipWithEmergencyContact,
            notes,
            createdBy: userId,
            isActive: 0,
            updatedBy,
            companyId,
            company,
          };

      // Execute mutation

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateIndividualClient" : "createIndividualClient",
        mutationData,
        props.isEditing ? "updatedIndividualClient" : "newIndividualClient",
        base_url
      );
      if (response) {
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Client ${
            props.isEditing ? "updated" : "created"
          } successfully.`,
        });
      }
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while processing your request. Please try again later.",
      });
    }

    // Set submitting to false
    setSubmitting(false);
  };

  return (
    <Box m="20px">
      <Header
        title={props.isEditing ? "Edit Client" : "Create Client"}
        subtitle={
          props.isEditing ? "Edit an Existing Client" : "Create a New Client"
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfBirth}
                name="dateOfBirth"
                error={touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactNumber}
                name="contactNumber"
                error={touched.contactNumber && !!errors.contactNumber}
                helperText={touched.contactNumber && errors.contactNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
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

export default IndividualClientsForm;
