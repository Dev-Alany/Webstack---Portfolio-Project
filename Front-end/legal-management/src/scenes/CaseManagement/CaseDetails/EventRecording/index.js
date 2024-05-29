import { Box } from "@mui/material";
import { caseManagementUrl } from "../../../../config";
import { useEffect, useState } from "react";
import { fetchDataEngine } from "../../../../data/Axios/DynamicService";
import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { CaseEventColumns } from "../../../../data/DynamicTable/Collumns";
import CaseEventForm from "./Form";
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
    Show_Button: true,
  },
  ViewCase: {
    key: "VIEWDETAILS",
    button_name: "View Details",
    Show_Button: false,
  },
};

function CaseEvents() {
  const caseId = JSON.parse(localStorage.getItem("CaseId"));
  if (!caseId) {
    console.error("No caseId found in localStorage");
  }

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const returnFields = [
        "id",
        "caseId",
        "eventTypeId",
        "eventType",
        "eventDate",
        "outcome",
        "hearingDate",
        "description",
        "createdBy",
        "createdDate",
        "companyId",
        "company",
      ];

      const inputFields = {
        caseId: caseId,
      };
      const caseEventsData = await fetchDataEngine(
        "allCaseEventsByColumnValues",
        "caseEvent",
        inputFields,
        returnFields,
        base_url
      );
      setData(caseEventsData);
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
            title="Case Events"
            subtitle="View all Case Events, create or edit"
            columns={CaseEventColumns}
            FormComponent={CaseEventForm}
            DataFromGetBy={data}
            actions={actions}
          />
        )}
      </>
    </Box>
  );
}

export default CaseEvents;
