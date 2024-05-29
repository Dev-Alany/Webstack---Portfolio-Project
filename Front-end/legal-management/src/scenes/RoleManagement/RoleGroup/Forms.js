import React, { useState, useEffect } from "react";
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
  CREATE_ROLE_GROUP,
  UPDATE_ROLE_GROUP,
  ALL_ROLEGROUPS,
} from "../../../data/RoleManagementData";
import { graphqlQuery } from "../../../data/Axios/DynamicService";
import { setupManagementUrl } from "../../../config";
import { allCompanies } from "../../../data/Axios/queries";

const setup_url = setupManagementUrl.uri;


const RoleGroupForm = (props) => {

  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);

  const companyId = parseInt(decodedToken.CompanyId);
  const [createRoleGroup] = useMutation(CREATE_ROLE_GROUP, {
    onCompleted: (data) => {
      props.onClose()
      swal("Success!", "Role group has been created successfully", "success");
    },
    onError: () => {
      swal("Error!", "Unable to create role group, try again later", "error");
    },
  });

  const [updateRoleGroup] = useMutation(UPDATE_ROLE_GROUP, {
    onCompleted: () => {
      props.onClose()
      swal("Success!", "Role group has been updated successfully", "success");
    },
    onError: () => {
      swal("Error!", "Unable to update role group, try again later", "error");
    },
  });


  const initialValues = {
    roleGroup: props.isEditing ? props.roleData.roleGroup : "",
    companyId: props.isEditing ? props.roleData.companyId : "",
  };

  const validationSchema = yup.object().shape({
    roleGroup: yup.string().required("Role group is required"),
    
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { roleGroup} = values;
      if (props.isEditing) {
        await updateRoleGroup({
          variables: {
            id: props.roleData.id,
            roleGroup,
            companyId: companyId,
            isActive: true,
            createdBy: userId,
          },
        });
      } else {
        await createRoleGroup({
          variables: {
            roleGroup,
            companyId: companyId,
            isActive: true,
            createdBy: userId,
          },
        });
        console.log("Role group created successfully!");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setSubmitting(false);
  };

  return (
    <Box m="20px">
      <Header
        title={props.isEditing ? "Edit Role Group" : "Create Role Group"}
        subtitle={
          props.isEditing
            ? "Edit an Existing Role Group"
            : "Create a New Role Group"
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
            <Box display="grid" gap="30px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role Group"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roleGroup}
                name="roleGroup"
                error={touched.roleGroup && !!errors.roleGroup}
                helperText={touched.roleGroup && errors.roleGroup}
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

export default RoleGroupForm;
