import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { caseManagementUrl } from "../../../../config";
import {
  generateAndExecuteMutation,
  fetchDataEngine,
} from "../../../../data/Axios/DynamicService";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Autocomplete } from "@mui/material";
import Swal from "sweetalert2";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";

export default function AssignTaskModal(props) {
  const [usersData, setUsersData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const caseId = JSON.parse(localStorage.getItem("CaseId"));
  const base_url = caseManagementUrl.uri;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // async function fetchData() {
  //   try {
  //     const returnFields = ["id", "userId"];
  //     const inputFields = {
  //       caseId: caseId,
  //     };
  //     const users = await fetchDataEngine(
  //       "allTeamAssignmentsByColumnValues",
  //       "teamAssignment",
  //       inputFields,
  //       returnFields,
  //       base_url
  //     );
  //     setUsersData(users);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  const usersOptions = usersData
    ? usersData.map((data) => ({
        parent_key: data.id,
        value: data.id,
        label: data.userId,
      }))
    : [];

  const validationSchema = yup.object().shape({
    userId: yup.string().required("User is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { userId } = values;
      const userIdFromSession = JSON.parse(
        localStorage.getItem("decodedToken")
      ).Id;

      const mutationData = {
        id: props.data.id,
        caseId: caseId,
        updatedBy: parseInt(userIdFromSession),
        asigneeId: userId,
      };

      const response = await generateAndExecuteMutation(
        "updateCaseTask",
        mutationData,
        "newCaseTask",
        base_url
      );

      if (Object.values(response)[0] != null) {
        props.onClose();
        props.onAction();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Task has been assigned successfully.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
    setSubmitting(false);
    props.onClose();
  };

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle sx={{ color: colors.grey[100] }}>Assign Task</DialogTitle>
        <Formik
          initialValues={{ userId: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
              <DialogContent>
                <DialogContentText sx={{ color: colors.greenAccent[400] }}>
                  Select a team member or members and assign the task to them.
                </DialogContentText>
                <Autocomplete
                  options={usersOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Users"
                      variant="filled"
                      onBlur={handleBlur}
                      error={touched.userId && !!errors.userId}
                      helperText={touched.userId && errors.userId}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setFieldValue("userId", newValue ? newValue.value : "");
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={props.onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  disabled={isSubmitting}
                  color="success"
                >
                  {isSubmitting ? "Assigning..." : "Assign Task"}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </React.Fragment>
  );
}
