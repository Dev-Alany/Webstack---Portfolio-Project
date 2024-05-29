import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { companyManagementUrl } from "../../../config";

import { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import {
    AddOnColumns,

} from "../../../data/DynamicTable/CompanyManagementColumns";
import CompanyForm from "./form";
import {
    allAddOns,

} from "../../../data/Axios/queries";

import AddOnForm from "./form";

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
function AddOnsTable() {
  return (
    <Box m="2px">
      <>
        <DynamicTable
          title="Add-ons"
          subtitle="Create, view or edit  Add-ons"
          columns={AddOnColumns}
          FormComponent={AddOnForm}
          query={allAddOns}
          base_url={base_url}
          actions={actions}
        />
      </>
    </Box>
  );
}

export default AddOnsTable;
