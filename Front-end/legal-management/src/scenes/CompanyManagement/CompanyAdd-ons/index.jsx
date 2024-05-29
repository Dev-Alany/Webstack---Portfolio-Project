import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { companyManagementUrl } from "../../../config";

import { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import { CompanyAddOnColumns, CompanyColumns } from "../../../data/DynamicTable/CompanyManagementColumns";
import CompanyForm from "./form";
import { allCompanies, allCompanyAddOns } from "../../../data/Axios/queries";
import CompanyAddOnForm from "./form";

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
function CompanyAddOnTable() {
  return (
    <Box m="2px">
      <>
        <DynamicTable
          title="Company AddOns"
          subtitle="Create, view or edit account Company AddOns"
          columns={CompanyAddOnColumns}
          FormComponent={CompanyAddOnForm}
          query={allCompanyAddOns} //{allAccountCategories}
          base_url={base_url}
          actions={actions}
        />
      </>
    </Box>
  );
}

export default CompanyAddOnTable;
