import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { PulseLoader } from "react-spinners"; // Importing the loader
import DynamicTable from "../../data/DynamicTable/dynamicTable";
import { allCasesDynamic } from "../../data/Axios/queries";
import { caseManagementUrl } from "../../config";
import CasesForm from "./Form";
import { CasesColumns } from "../../data/DynamicTable/Collumns";

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
    Show_Button: true,
  },
};

function Cases() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a 3-second loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Box m="2px">
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
          title="Case Management"
          subtitle="View all cases, create edit or view details"
          columns={CasesColumns}
          FormComponent={CasesForm}
          query={allCasesDynamic}
          base_url={base_url}
          actions={actions}
        />
      )}
    </Box>
  );
}

export default Cases;
