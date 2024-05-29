import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Header from "../../../../components/Header";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import {
  generateAndExecuteMutation,
  uploadDocument,
  graphqlQuery,
} from "../../../../data/Axios/DynamicService";
import { documentUploadUrl, setupManagementUrl } from "../../../../config";
import { allCourts } from "../../../../data/Axios/queries";

const DocumentUploadForm = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const base_url = documentUploadUrl.uri;
  const setup_baseurl = setupManagementUrl.uri;
  const [courtAssignments, setCourtAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCourtAssignments() {
    try {
      const data = await graphqlQuery(allCourts, setup_baseurl);
      if (data !== null) {
        setCourtAssignments(data);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }

  useEffect(() => {
    fetchCourtAssignments();
  }, []);

  const initialValues = {
    courtId: props.data ? props.data.courtId : "",
  };

  const validationSchema = yup.object().shape({
    file: yup
      .mixed()
      .required("Please select a file to upload!")
      .test("fileSize", "The file has exceeded the 50mb limit", value => {
        return value && value.size <= 52428800; // 1MB
      })
    // .test("fileType", "Unsupported file format", value => {
    //   return value && ['image/jpeg', 'image/png', 'application/pdf', ].includes(value.type);
    // }),
  });

  const caseIdFromSession = JSON.parse(localStorage.getItem("CaseId"));
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userIdFromSession = parseInt(decodedToken.Id);

  // const courtOptions = courtAssignments
  //   ? courtAssignments.map((data) => ({
  //     parent_key: data.id,
  //     value: data.id,
  //     label: data.court,
  //   }))
  //   : [];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const caseEventObject = {
        caseId: caseIdFromSession,
        // courtId: parseInt(values.courtId),
        createdBy: userIdFromSession,
      };

      // const response = await generateAndExecuteMutation(
      //   props.isEditing ? "updateFact" : "createCourtAssignment",
      //   caseEventObject,
      //   props.isEditing ? "updatedFact" : "newCourtAssignment",
      //   base_url
      // );

      const response = await uploadDocument(
        props.isEditing ? "add" : "remove",
        values.file,
        caseEventObject,
        base_url
      );

      if (response) {
        props.onAction();
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Document uploaded successfully.`,
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
        title={
          props.isEditing ? "Remove document" : "Upload documents"
        }
        subtitle={
          props.isEditing
            ? "Remove the document from the case"
            : "Add a document to the case"
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
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <Button
              variant="contained"
              component="label"
              sx={{
                marginTop: "1rem",
                bgcolor: `${colors.grey[400]}`
              }}
            >
              Select a file to upload
              <input
                id="file"
                name="file"
                type="file"
                hidden
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
            </Button>
            {touched.file && errors.file ? (
              <Typography color="error">{errors.file}</Typography>
            ) : null}
            {values.file && (
              <Typography sx={{ margin: "1rem" }}>{values.file.name}</Typography>
            )}

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
    </Box >
  );
};

export default DocumentUploadForm;
