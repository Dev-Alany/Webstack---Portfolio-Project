import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import swal from "sweetalert";
import Header from "../../../components/Header";
import {
  CREATE_ROLE,
  UPDATE_ROLE,
  ALL_ROLEGROUPS,
} from "../../../data/RoleManagementData"; // Import your GraphQL queries and mutations

const RolesForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
 
    const companyId = parseInt(decodedToken.CompanyId);
  const {
    loading: roleGroupLoading,
    error: roleGroupError,
    data: roleGroupData,
  } = useQuery(ALL_ROLEGROUPS);
  const [roleGroupChosen, setRoleGroup] = useState("");
  const [createRole] = useMutation(CREATE_ROLE, {
    onCompleted: (data) => {
      props.onClose()
      swal("Success!", "Role has been created successfully", "success");
    },
    onError: () => {
      swal("Error!", "Unable to create role, try again later", "error");
    },
  });

  const [updateRole] = useMutation(UPDATE_ROLE, {
    onCompleted: () => {
      props.onClose()
      swal("Success!", "Role has been updated successfully", "success");
    },
    onError: () => {
      swal("Error!", "Unable to update role, try again later", "error");
    },
  });

  const initialValues = {
    role: props.roleData ? props.roleData.role : "",
    roleDescription: props.roleData ? props.roleData.roleDescription : "",
    roleGroupId: props.roleData ? props.roleData.roleGroupId : "",
    roleGroup: props.roleData ? props.roleData.roleGroup : "",
    companyId: props.roleData ? props.roleData.companyId : "",
    company: props.roleData ? props.roleData.company : "",
  };

  const validationSchema = yup.object().shape({
    role: yup.string().required("Role is required"),
    roleDescription: yup.string().required("Role Description is required"),
    roleGroupId: yup.number().required("Role Group ID is required"),

   
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const {
        role,
        roleDescription,
        roleGroupId,
        roleGroup,
       
        createdBy,
      } = values;

      if (props.isEditing) {
        const updateRoleGroup =
          roleGroupChosen === null ? props.roleData.roleGroup : roleGroupChosen;
        await updateRole({
          variables: {
            id: props.roleData.id,
            role,
            roleDescription,
            roleGroupId,
            roleGroup: updateRoleGroup,
            companyId: companyId,

            createdBy: userId,
          },
        });
        console.log("Role updated successfully!");
      } else {
        const updateRoleGroup =
          roleGroupChosen === null ? props.roleData.roleGroup : roleGroupChosen;
        await createRole({
          variables: {
            role,
            roleDescription,
            roleGroupId,
            roleGroup: updateRoleGroup,
            companyId: companyId,

            createdBy: userId,
          },
        });
        console.log("Role created successfully!");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    // Set submitting to false to indicate the form submission is complete
    setSubmitting(false);
  };
  const handleRoleGroupChange = (event, setFieldValue) => {
    const selectedModuleId = event.target.value;
    const selectedModule = roleGroupData.allRoleGroups.find(
      (RoleGroup) => RoleGroup.id === selectedModuleId
    );
    if (selectedModule) {
      setRoleGroup(selectedModule.roleGroup);
    }
  };
  return (
    <Box m="20px">
      <Header
        title={props.isEditing ? "Edit Role" : "Create Role"}
        subtitle={
          props.isEditing ? "Edit an Existing Role" : "Create a New Role"
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
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={touched.role && !!errors.role}
                helperText={touched.role && errors.role}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roleDescription}
                name="roleDescription"
                error={touched.roleDescription && !!errors.roleDescription}
                helperText={touched.roleDescription && errors.roleDescription}
              />

              {roleGroupLoading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : roleGroupError ? (
                <div>Error loading roleGroup</div>
              ) : (
                <Select
                  fullWidth
                  variant="filled"
                  value={values.roleGroupId}
                  name="roleGroupId"
                  onChange={(e) => {
                    handleRoleGroupChange(e, setFieldValue);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={touched.moduleId && !!errors.moduleId}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Role Groups
                  </MenuItem>
                  {roleGroupData.allRoleGroups.map((roleGroup) => (
                    <MenuItem key={roleGroup.id} value={roleGroup.id}>
                      {roleGroup.roleGroup}
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

export default RolesForm;
