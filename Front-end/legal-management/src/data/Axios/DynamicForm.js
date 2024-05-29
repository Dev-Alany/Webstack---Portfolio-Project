import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

const DynamicForm = ({
  fields,
  onSubmit,
  title,
  subtitle,
  initialValues,
  onFieldChange,
}) => {
  const [dependentOptions, setDependentOptions] = useState({});

  const validationSchema = yup.object().shape(
    fields.reduce((acc, field) => {
      let schema;
      switch (field.type) {
        case "text":
          schema = yup.string();
          break;
        case "number":
          schema = yup.number();
          break;
        case "date":
          schema = yup.date();
          break;
        case "select":
          schema = yup.string();
          break;
        default:
          schema = yup.string();
      }
      if (field.required) {
        schema = schema.required(`${field.label} is required`);
      }
      acc[field.name] = schema;
      return acc;
    }, {})
  );

  const handleFieldChangeInternal = async (setFieldValue, field, value) => {
    setFieldValue(field.name, value);

    if (field.parent ==="main") {
      const options = await onFieldChange(field, value);
      setDependentOptions(options);
    }
  };

  return (
    <Box m="20px">
      <Header title={title} subtitle={subtitle} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
            >
              {fields.map((field) => (
                <Box key={field.name} sx={{ gridColumn: field.gridColumn }}>
                  {field.type === "select" ? (
                    <Autocomplete
                      
                      options={
                        field.parent === "dependent"
                          ? dependentOptions|| []
                          : field.options
                      }
                      getOptionLabel={(option) => option.label}
                      onChange={(event, newValue) => {
                        handleFieldChangeInternal(
                          setFieldValue,
                          field,
                          newValue ? newValue.value : ""
                        );
                      }}
                      onBlur={handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={field.label}
                          variant="filled"
                          name={field.name}
                          error={!!touched[field.name] && !!errors[field.name]}
                          helperText={touched[field.name] && errors[field.name]}
                        />
                      )}
                      value={
                        Array.isArray(field.options)
                          ? field.options.find(
                              (option) => option.value === values[field.name]
                            ) || null
                          : null
                      }
                    />
                  ) : (
                    <TextField
                      fullWidth
                      variant="filled"
                      type={field.type}
                      label={field.label}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values[field.name]}
                      name={field.name}
                      error={!!touched[field.name] && !!errors[field.name]}
                      helperText={touched[field.name] && errors[field.name]}
                    />
                  )}
                </Box>
              ))}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Box>
            {isSubmitting && <CircularProgress />}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DynamicForm;
