import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { companyManagementUrl } from "../../../config";

import { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import {
  BranchColumns,
  CompanyColumns,
  RegionsColumns,
} from "../../../data/DynamicTable/CompanyManagementColumns";
import CompanyForm from "./form";
import { allBranches, allCompanies, allRegions } from "../../../data/Axios/queries";
import RegionForm from "./form";
import BranchForm from "./form";

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
function BranchTable() {
  return (
    <Box m="2px">
      <>
        <DynamicTable
          title="Branch"
          subtitle="Create, view or edit account Branch"
          columns={BranchColumns}
          FormComponent={BranchForm}
          query={allBranches}
          base_url={base_url}
          actions={actions}
        />
      </>
    </Box>
  );
}

export default BranchTable;
