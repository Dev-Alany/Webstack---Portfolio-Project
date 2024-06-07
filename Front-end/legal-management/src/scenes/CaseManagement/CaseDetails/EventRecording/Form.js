import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../../../config";
import { useState } from "react";

const CaseEventForm = (props) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    first_name: props.userData ? props.userData.first_name : "",
    last_name: props.userData ? props.userData.last_name : "",
    email: props.userData ? props.userData.email : "",
    phone: props.userData ? props.userData.phone : "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const { first_name, last_name, email, phone } = values;

    try {
      if (props.isEditing) {
        await userManagementClient.put(`/update/${props.userData.User_Id}`, {
          first_name,
          last_name,
          email,
          phone,
        });
        swal("Success!", "User has been updated successfully", "success");
      } else {
        await userManagementClient.post("/data", {
          first_name,
          last_name,
          email,
          phone,
        });
        swal("Success!", "User has been created successfully", "success");
      }
      props.onClose();
    } catch (error) {
      swal("Error!", "Unable to save user, try again later", "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <TextField
        fullWidth
        id="first_name"
        name="first_name"
        label="First Name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
        margin="normal"
      />
      <TextField
        fullWidth
        id="last_name"
        name="last_name"
        label="Last Name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
        margin="normal"
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
      />
      <TextField
        fullWidth
        id="phone"
        name="phone"
        label="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button color="primary" variant="contained" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : props.isEditing ? 'Update User' : 'Create User'}
        </Button>
        <Button color="secondary" variant="outlined" onClick={props.onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CaseEventForm;