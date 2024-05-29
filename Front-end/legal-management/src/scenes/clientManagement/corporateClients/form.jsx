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

const CorporateClientsForm = (props) => {
  const initialValues = {
    id: props.data ? props.data.id : null,
    companyName: props.data ? props.data.companyName : null,
    contactNumber: props.data ? props.data.contactNumber : null,
    email: props.data ? props.data.email : null,
    address: props.data ? props.data.address : null,
    industrySector: props.data ? props.data.industrySector : null,
    createdDate: props.data ? props.data.createdDate : null,
    createdBy: props.data ? props.data.createdBy : null,
    updatedBy: props.data ? props.data.updatedBy : null,
    updatedDate: props.data ? props.data.updatedDate : null,
    isActive: props.data ? props.data.isActive : 1,
    statusFlag: props.data ? props.data.statusFlag : null,
    registrationNumber: props.data ? props.data.registrationNumber : null,
    incorporationDate: props.data ? props.data.incorporationDate : null,
    legalStructure: props.data ? props.data.legalStructure : null,
    countryOfIncorporation: props.data
      ? props.data.countryOfIncorporation
      : null,
    taxIdentificationNumber: props.data
      ? props.data.taxIdentificationNumber
      : null,
    authorizedSignatoryName: props.data
      ? props.data.authorizedSignatoryName
      : null,
    authorizedSignatoryPosition: props.data
      ? props.data.authorizedSignatoryPosition
      : null,
    authorizedSignatoryEmail: props.data
      ? props.data.authorizedSignatoryEmail
      : null,
    authorizedSignatoryPhone: props.data
      ? props.data.authorizedSignatoryPhone
      : null,
    companyAddress: props.data ? props.data.companyAddress : null,
    billingAddress: props.data ? props.data.billingAddress : null,
    contactPersonName: props.data ? props.data.contactPersonName : null,
    contactPersonPosition: props.data ? props.data.contactPersonPosition : null,
    contactPersonEmail: props.data ? props.data.contactPersonEmail : null,
    contactPersonPhone: props.data ? props.data.contactPersonPhone : null,
    companyId: props.data ? props.data.companyId : null,
    company: props.data ? props.data.company : null,
  };

  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);

  const validationSchema = yup.object().shape({
    contactNumber: yup.string().required("Contact Number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Address is required"),
    companyName: yup.string().required("Company Name is required"),
    industrySector: yup.string().required("Industry Sector is required"),
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Destructure values
      const {
        contactNumber,
        email,
        address,
        companyName,
        registrationNumber,
        industrySector,
        contactPersonName,
        contactPersonPosition,
        contactPersonEmail,
        contactPersonPhone,
        companyAddress,
        billingAddress,
        incorporationDate,
        legalStructure,
        countryOfIncorporation,
        taxIdentificationNumber,
        authorizedSignatoryName,
        authorizedSignatoryPosition,
        authorizedSignatoryEmail,
        authorizedSignatoryPhone,
        isActive,
        createdBy,
        updatedBy,
        companyId,
        company,
      } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            contactNumber,
            email,
            address,
            companyName,
            registrationNumber,
            industrySector,
            contactPersonName,
            contactPersonPosition,
            contactPersonEmail,
            contactPersonPhone,
            companyAddress,
            billingAddress,
            incorporationDate,
            legalStructure,
            countryOfIncorporation,
            taxIdentificationNumber,
            authorizedSignatoryName,
            authorizedSignatoryPosition,
            authorizedSignatoryEmail,
            authorizedSignatoryPhone,
            isActive: isActive,
            createdBy,
            updatedBy: userId,
            companyId,
            company,
          }
        : {
            contactNumber,
            email,
            address,
            companyName,
            registrationNumber,
            industrySector,
            contactPersonName,
            contactPersonPosition,
            contactPersonEmail,
            contactPersonPhone,
            companyAddress,
            billingAddress,
            incorporationDate,
            legalStructure,
            countryOfIncorporation,
            taxIdentificationNumber,
            authorizedSignatoryName,
            authorizedSignatoryPosition,
            authorizedSignatoryEmail,
            authorizedSignatoryPhone,
            isActive: 0,
            createdBy: userId,
            updatedBy,
            companyId,
            company,
          };

      // Execute mutation

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateCorporateClient" : "createCorporateClient",
        mutationData,
        props.isEditing ? "updatedCorporateClient" : "newCorporateClient",
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
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Industry Sector"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.industrySector}
                name="industrySector"
                error={touched.industrySector && !!errors.industrySector}
                helperText={touched.industrySector && errors.industrySector}
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

export default CorporateClientsForm;
