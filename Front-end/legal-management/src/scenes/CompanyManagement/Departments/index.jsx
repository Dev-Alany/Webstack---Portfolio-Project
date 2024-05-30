import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { companyManagementUrl } from "../../../config";

import { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import {
  BranchColumns,
  CompanyColumns,
  DepartmentColumns,
  RegionsColumns,
} from "../../../data/DynamicTable/CompanyManagementColumns";
import {
  allBranches,
  allCompanies,
  allDepartments,
  allRegions,
} from "../../../data/Axios/queries";
import RegionForm from "./form";
import BranchForm from "./form";
import DepartmentForm from "./form";

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
function DepartmetsTable() {
  return (
    <Box m="2px">
      <>
        <DynamicTable
          title="Departmets"
          subtitle="Create, view or edit account Departmets"
          columns={DepartmentColumns}
          FormComponent={DepartmentForm}
          query={allDepartments}
          base_url={base_url}
          actions={actions}
        />
      </>
    </Box>
  );
}

export default DepartmetsTable;
