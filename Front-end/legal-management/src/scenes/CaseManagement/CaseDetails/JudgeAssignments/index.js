import { Box } from "@mui/material";
import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { caseManagementUrl } from "../../../../config";
import CasesForm from "./Form";
import { JudgeAssignmentViewsColumns } from "../../../../data/DynamicTable/Collumns";
import { useEffect, useState } from "react";
import { fetchDataEngine } from "../../../../data/Axios/DynamicService";
import JudgeAssignmentForm from "./Form";
import { PulseLoader } from "react-spinners";

const base_url = caseManagementUrl.uri;
const actions = {
  edit: {
    key: "EDIT",
    button_name: "Edit",
    Show_Button: true,
  },
  add: {
    key: "ADD",
    button_name: "Add",
    Show_Button: true,
  },
  activateDeactivate: {
    key: "ACTIVATEDEACTIVATE",
    button_name: "Deactivate",
    Show_Button: false,
  },
  ViewCase: {
    key: "VIEWDETAILS",
    button_name: "View Details",
    Show_Button: false,
  },
  ViewCase: {
    key: "AssignTask",
    button_name: "View Details",
    Show_Button: false,
  },
};
function JudgeAssignments() {
  const caseId = JSON.parse(localStorage.getItem("CaseId"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const returnFields = [
        "id",
        "caseId",
        "name",
        "assignedDate",
      ];
      const inputFields = {
        caseId: caseId,
      };
      const JudgeAssignmentsData = await fetchDataEngine(
        "judgeAssignmentViewsByColumnValues",
        "viewModel",
        inputFields,
        returnFields,
        base_url
      );
      setData(JudgeAssignmentsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <Box m="2px">
      <>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <PulseLoader size={15} color={"#3f51b5"} />
          </Box>
        ) : (
          <DynamicTable
            title="Judge Assignments"
            subtitle="View all JudgeAssignments, create or edit "
            columns={JudgeAssignmentViewsColumns}
            FormComponent={JudgeAssignmentForm}
            DataFromGetBy={data}
            actions={actions}
          />
        )}
      </>
    </Box>
  );
}

export default JudgeAssignments;
