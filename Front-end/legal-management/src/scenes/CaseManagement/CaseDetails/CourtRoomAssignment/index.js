import { Box } from "@mui/material";
import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { caseManagementUrl } from "../../../../config";
import CourtAssignmentsForm from "./Form";
import { CourtAssignmentsColumns } from "../../../../data/DynamicTable/Collumns";
import { useEffect, useState } from "react";
import { fetchDataEngine } from "../../../../data/Axios/DynamicService";
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
};

function CourtAssignments() {
  const caseId = JSON.parse(localStorage.getItem("CaseId"));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const returnFields = [
        "id",
        "caseId",
        "courtId",
        "assignedDate",
        "createdBy",
        "createdDate",
        "companyId",
        "company",
      ];

      const inputFields = {
        caseId: caseId,
      };
      const courtAssignmentsData = await fetchDataEngine(
        "allCourtAssignmentsByColumnValues",
        "courtAssignmentModel",
        inputFields,
        returnFields,
        base_url
      );
      if (courtAssignmentsData) {
        setData(courtAssignmentsData);
      }
    } catch (error) {
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
            title="Court Assignments"
            subtitle="View all Court Assignments, create or edit"
            columns={CourtAssignmentsColumns}
            FormComponent={CourtAssignmentsForm}
            DataFromGetBy={data}
            actions={actions}
          />
        )}
      </>
    </Box>
  );
}
export default CourtAssignments;
