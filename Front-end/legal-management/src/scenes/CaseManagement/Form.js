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
} from "../../data/Axios/DynamicService";
import {
  caseManagementUrl,
  clientManagementUrl,
  setupManagementUrl,
} from "../../config";
// import {
//   allCorporateClients,
//   allIndividualClients,
//   caseCategory,
// } from "../../data/Axios/queries";
import {
  allIndividualClients,
  allCorporateClients,
  caseCategory,
} from "../../data/Axios/queries";
import { fetchDataEngine } from "../../data/Axios/DynamicService";
import { useState } from "react";
import Header from "../../components/Header";
const base_url = caseManagementUrl.uri;
const setup_baseurl = setupManagementUrl.uri;
const client_baseurl = clientManagementUrl.uri;
const CasesForm = (props) => {
  const [individualclientData, setindividualclientData] = useState([]);
  const [CorporateData, setCorporateData] = useState([]);
  const [caseCategoryData, setCaseCategoryData] = useState([]);
  const [caseSubCategoryData, setCaseSubCaseCategoryData] = useState([]);
  const [showCorporateClient, setShowCorporateClient] = useState(false);
  const [showIndividualClient, setShowIndividualClient] = useState(false);
  const initialValues = {
    clientType: props.data ? props.data.clientType : "",
    clientId: props.data ? props.data.clientId : "",
    caseNumber: props.data ? props.data.caseNumber : "",
    title: props.data ? props.data.title : "",
    caseCategoryId: props.data ? props.data.caseCategoryId : "",
    caseSubcategoryId: props.data ? props.data.caseSubcategoryId : "",
  };
  const caseCategoryOptions = caseCategoryData
    ? caseCategoryData.map((data) => ({
        parent_key: data.id,
        value: data.id,
        label: data.categoryName,
      }))
    : [];
  const caseSubcategoryOptions = caseSubCategoryData
    ? caseSubCategoryData.map((data) => ({
        parent_key: data.id,
        value: data.id,
        label: data.subcategoryName,
      }))
    : [];
  const IndividualclientOptions = individualclientData
    ? individualclientData.map((data) => ({
        parent_key: data.id,
        value: data.id,
        label: data.firstName,
      }))
    : [];
  const corporateclientOptions = CorporateData
    ? CorporateData.map((data) => ({
        parent_key: data.id,
        value: data.id,
        label: data.companyName,
      }))
    : [];
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);

  const validationSchema = yup.object().shape({
    clientType: yup.string().required("Client Type is required"),
    clientId: yup.string().required("Client ID is required"),
    caseNumber: yup.string().required("Case Number is required"),
    title: yup.string().required("Title is required"),
    caseCategoryId: yup.string().required("Case Category is required"),
    caseSubcategoryId: yup.string().required("Case Subcategory is required"),
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  useState(() => {
    async function fetchClientData() {
      try {
        const [individualData, corporateData, allcaseCategory] =
          await Promise.all([
            graphqlQuery(allIndividualClients, client_baseurl),
            graphqlQuery(allCorporateClients, client_baseurl),
            graphqlQuery(caseCategory, base_url),
          ]);

        setindividualclientData(individualData);
        setCorporateData(corporateData);
        setCaseCategoryData(allcaseCategory);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }

    fetchClientData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Destructure values
      const {
        clientType,
        clientId,
        caseNumber,
        title,
        caseCategoryId,
        caseSubcategoryId,
      } = values;

      const mutationData = props.isEditing
        ? {
            id: props.data.id,
            clientType: parseInt(clientType),
            clientId,
            caseNumber: parseInt(caseNumber),
            title,
            caseCategoryId,
            caseSubcategoryId,
            createdBy: userId,
          }
        : {
            clientType: parseInt(clientType),
            clientId,
            caseNumber: parseInt(caseNumber),
            title,
            caseCategoryId,
            caseSubcategoryId,
            createdBy: userId,
          };

      const mutation = generateMutation(
        props.isEditing ? "updateCaseDynamic" : "createCaseDynamic",
        mutationData,
        props.isEditing ? "newCase" : "newCase"
      );

      // Execute mutation

      const response = await generateAndExecuteMutation(
        props.isEditing ? "updateCaseDynamic" : "createCaseDynamic",
        mutationData,
        props.isEditing ? "newCase" : "newCase",
        base_url
      );
      if (response) {
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Case ${props.isEditing ? "updated" : "created"} successfully.`,
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

  async function handleCategoryChange(category) {
    const returnFields = ["id", "subcategoryName"];
    const inputFields = {
      categoryId: category,
    };
    const subcategories = await fetchDataEngine(
      "allCaseSubcategoriesByColumnValues",
      "caseSubcategoryModel",
      inputFields,
      returnFields,
      base_url
    );
    if (subcategories) {
      setCaseSubCaseCategoryData(subcategories);
    }
  }

  async function handleClientTypeChange(clientType) {
    if (clientType === "1") {
      setShowIndividualClient(true);
      setShowCorporateClient(false); // Add this line to hide the corporate client field
    } else {
      setShowCorporateClient(true);
      setShowIndividualClient(false); // Add this line to hide the individual client field
    }
  }

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
                label="Case Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.caseNumber}
                name="caseNumber"
                error={touched.caseNumber && !!errors.caseNumber}
                helperText={touched.caseNumber && errors.caseNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <Select
                fullWidth
                variant="filled"
                value={values.clientType}
                name="clientType"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  handleClientTypeChange(e.target.value);
                }}
                error={touched.clientType && !!errors.clientType}
                sx={{ gridColumn: "span 2" }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Client Type
                </MenuItem>
                <MenuItem value="1">Individual</MenuItem>
                <MenuItem value="2">Corporate</MenuItem>
              </Select>
              {showIndividualClient && !showCorporateClient && (
                <Autocomplete
                  options={IndividualclientOptions} // Provide options for clientId
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Individual Clients"
                      variant="filled"
                      onBlur={handleBlur}
                      error={touched.clientId && !!errors.clientId}
                      helperText={touched.clientId && errors.clientId}
                    />
                  )}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: "clientId",
                        value: newValue ? newValue.value : "",
                      },
                    });
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
              )}
              {showCorporateClient && !showIndividualClient && (
                <Autocomplete
                  options={corporateclientOptions} // Provide options for clientId
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Corporate Clients"
                      variant="filled"
                      onBlur={handleBlur}
                      error={touched.clientId && !!errors.clientId}
                      helperText={touched.clientId && errors.clientId}
                    />
                  )}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: "clientId",
                        value: newValue ? newValue.value : "",
                      },
                    });
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
              )}

              <Select
                fullWidth
                variant="filled"
                value={values.caseCategoryId}
                name="caseCategoryId"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  handleCategoryChange(e.target.value, setFieldValue);
                }}
                error={touched.caseCategoryId && !!errors.caseCategoryId}
                sx={{ gridColumn: "span 2" }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Case Category
                </MenuItem>
                {caseCategoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              <Select
                fullWidth
                variant="filled"
                label="Case Subcategory"
                value={values.caseSubcategoryId}
                name="caseSubcategoryId"
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.caseSubcategoryId && !!errors.caseSubcategoryId}
                sx={{ gridColumn: "span 2" }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Case Subcategory
                </MenuItem>
                {caseSubcategoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
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

export default CasesForm;
