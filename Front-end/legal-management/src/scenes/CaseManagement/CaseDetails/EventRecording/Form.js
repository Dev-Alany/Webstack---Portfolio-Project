// import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Header from "../../../../components/Header";
import {
  generateAndExecuteBulkMutation,
  generateAndExecuteMutation,
  graphqlQuery,
} from "../../../../data/Axios/DynamicService";
import { caseManagementUrl, setupManagementUrl } from "../../../../config";
import { allEventTypes } from "../../../../data/Axios/queries";

const CaseEventForm = (props) => {
  const base_url = caseManagementUrl.uri;
  const setup_url = setupManagementUrl.uri;
  const [eventTypes, setEventTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchEventTypes() {
    try {
      const data = await graphqlQuery(allEventTypes, setup_url);
      if (data !== null) {
        setEventTypes(data);
      }
    } catch (error) {
      console.error("Error fetching event types:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const initialValues = {
    eventTypeId: props.data ? props.data.eventTypeId : "",
    eventDate: props.data ? props.data.eventDate : "",
    outcome: props.data ? props.data.outcome : "",
    hearingDate: props.data ? props.data.hearingDate : "",
    description: props.data ? props.data.description : "",
  };

  const validationSchema = yup.object().shape({
    eventTypeId: yup.number().required("Event Type is required"),
    eventDate: yup.date().required("Event Date is required"),
    outcome: yup.string().required("Outcome is required"),
    hearingDate: yup.date().required("Hearing Date is required"),
    description: yup.string().required("Description is required"),
  });

  const caseIdFromSession = JSON.parse(localStorage.getItem("CaseId"));
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userIdFromSession = parseInt(decodedToken.Id);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const caseEventObject = {
        caseId: caseIdFromSession,
        eventTypeId: values.eventTypeId,
        eventDate: values.eventDate,
        outcome: values.outcome,
        hearingDate: values.hearingDate,
        description: values.description,
        createdBy: userIdFromSession,
        companyId: null,
        company: null,
      };

      const response = generateAndExecuteMutation(
        props.isEditing ? "updateCaseEvent" : "createCaseEvent",
        caseEventObject,
        props.isEditing ? "newCaseEvent" : "newCaseEvent",

        base_url
      );

      if (response) {
        props.onAction();
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Case Event ${
            props.isEditing ? "updated" : "created"
          } successfully.`,
        });
      }

      setSubmitting(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while processing your request. Please try again later.",
      });

      setSubmitting(false);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header
        title={props.isEditing ? "Edit Case Event" : "Create Case Event"}
        subtitle={
          props.isEditing
            ? "Edit an Existing Case Event"
            : "Create a New Case Event"
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
            <InputLabel id="eventTypeId-label">Event Type</InputLabel>
            <Select
              fullWidth
              labelId="eventTypeId-label"
              id="eventTypeId"
              name="eventTypeId"
              value={values.eventTypeId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.eventTypeId && Boolean(errors.eventTypeId)}
              helperText={touched.eventTypeId && errors.eventTypeId}
            >
              <MenuItem value="" disabled>
                Select Event Type
              </MenuItem>
              {eventTypes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.eventType}
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              id="eventDate"
              name="eventDate"
              label="Event Date"
              type="date"
              value={values.eventDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.eventDate && Boolean(errors.eventDate)}
              helperText={touched.eventDate && errors.eventDate}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              margin="normal"
            />

            <TextField
              fullWidth
              id="outcome"
              name="outcome"
              label="Outcome"
              value={values.outcome}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.outcome && Boolean(errors.outcome)}
              helperText={touched.outcome && errors.outcome}
              variant="filled"
              margin="normal"
            />

            <TextField
              fullWidth
              id="hearingDate"
              name="hearingDate"
              label="Hearing Date"
              type="date"
              value={values.hearingDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.hearingDate && Boolean(errors.hearingDate)}
              helperText={touched.hearingDate && errors.hearingDate}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              margin="normal"
            />

            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              variant="filled"
              margin="normal"
            />

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

export default CaseEventForm;
