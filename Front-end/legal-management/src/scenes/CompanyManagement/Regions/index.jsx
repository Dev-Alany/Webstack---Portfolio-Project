import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { companyManagementUrl } from "../../../config";

import { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import { CompanyColumns, RegionsColumns } from "../../../data/DynamicTable/CompanyManagementColumns";
import CompanyForm from "./form";
import { allCompanies, allRegions } from "../../../data/Axios/queries";
import RegionForm from "./form";

const base_url = companyManagementUrl.uri;
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
};
function RegionTable() {
  return (
    <Box m="2px">
      <>
        <DynamicTable
          title="Region"
          subtitle="Create, view or edit account Region"
          columns={RegionsColumns}
          FormComponent={RegionForm}
          query={allRegions} 
          base_url={base_url}
          actions={actions}
        />
      </>
    </Box>
  );
}

export default RegionTable;
