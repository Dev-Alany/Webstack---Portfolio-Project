import { Box, Button, TextField, Select, MenuItem, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_RIGHT, UPDATE_RIGHT, ALL_MODULES } from "../../../data/RoleManagementData"; // Import your GraphQL queries and mutations
import swal from "sweetalert";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { graphqlQuery } from "../../../data/Axios/DynamicService";
import { allCompanies } from "../../../data/Axios/queries";
import { setupManagementUrl } from "../../../config";

const setup_url = setupManagementUrl.uri;

const RightsForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));

  const userId = parseInt(decodedToken.Id);
    const companyId = parseInt(decodedToken.CompanyId);
  const {
    loading: modulesLoading,
    error: modulesError,
    data: modulesData,
  } = useQuery(ALL_MODULES);






  const [moduleName, setModuleName] = useState('')
  const [createRight] = useMutation(CREATE_RIGHT, {
    onCompleted: (data) => {
      props.onClose()
      swal("Success!", "Right has been created successfully", "success");
    },
    onError: () => {
      swal("Error!", "Unable to create right, try again later", "error");
    },
  });

  const [updateRight] = useMutation(UPDATE_RIGHT, {
    onCompleted: () => {
      props.onClose()
      swal("Success!", "Right has been updated successfully", "success");
    },
    onError: () => {
      swal("Error!", "Unable to update right, try again later", "error");
    },
  });

  const initialValues = {
    title: props.rightData ? props.rightData.title : "",
    icon: props.rightData ? props.rightData.icon : "",
    action: props.rightData ? props.rightData.action : "",
    moduleId: props.rightData ? props.rightData.moduleId : "",
    module: props.rightData ? props.rightData.module : "",
    companyId: props.rightData ? props.rightData.companyId : "",

  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    icon: yup.string().required("Icon is required"),
    action: yup.string().required("Action is required"),
    moduleId: yup.number().required("Module ID is required"),

  });




  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { title, icon, action, moduleId, module,  createdBy } =
        values;

      if (props.isEditing) {
        const updateModule =
          moduleName === null ? props.rightData.module : module;

        // If editing, update right
        await updateRight({
          variables: {
            id: props.rightData.id,

            title,
            icon,
            action,
            moduleId,
            module,
            createdBy: userId,
            companyId: parseInt(companyId),
            module: updateModule,
          },
        });
        console.log("Right updated successfully!");
      } else {
        const updateModule =
          moduleName === null ? props.rightData.module : moduleName;
        await createRight({
          variables: {
            title,
            icon,
            action,
            moduleId,
            module: updateModule,
            companyId: parseInt(companyId),
            createdBy: userId,
          },
        });
        console.log("Right created successfully!");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    // Set submitting to false to indicate the form submission is complete
    setSubmitting(false);

    // Close the modal or perform any other actions after submission
  };

  const handleModuleChange = (event, setFieldValue) => {
    const selectedModuleId = event.target.value;
    const selectedModule = modulesData.allModules.find(
      (module) => module.id === selectedModuleId
    );
    if (selectedModule) {
      setModuleName(selectedModule.module);
    }
  };

  return (
    <Box m="20px">
      <Header
        title={props.isEditing ? "Edit Right" : "Create Right"}
        subtitle={
          props.isEditing ? "Edit an Existing Right" : "Create a New Right"
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px">
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Icon"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.icon}
                name="icon"
                error={touched.icon && !!errors.icon}
                helperText={touched.icon && errors.icon}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Action"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.action}
                name="action"
                error={touched.action && !!errors.action}
                helperText={touched.action && errors.action}
                sx={{ gridColumn: "span 2" }}
              />
              {modulesLoading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : modulesError ? (
                <div>Error loading modules</div>
              ) : (
                <Select
                  fullWidth
                  variant="filled"
                  value={values.moduleId}
                  name="moduleId"
                  onChange={(e) => {
                    handleModuleChange(e, setFieldValue);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={touched.moduleId && !!errors.moduleId}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Module
                  </MenuItem>
                  {modulesData.allModules.map((module) => (
                    <MenuItem key={module.id} value={module.id}>
                      {module.module}
                    </MenuItem>
                  ))}
                </Select>
              )}
       



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

export default RightsForm;
