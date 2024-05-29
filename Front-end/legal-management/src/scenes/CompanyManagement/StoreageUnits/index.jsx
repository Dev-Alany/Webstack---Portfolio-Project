import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { companyManagementUrl } from "../../../config";

import { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import {
  AddOnColumns,
  StorageUnitsColumns,
  SubscriptionPlanColumns,
} from "../../../data/DynamicTable/CompanyManagementColumns";
import CompanyForm from "./form";
import { allAddOns, allStorageUnits, allSubscriptionPlans } from "../../../data/Axios/queries";

import AddOnForm from "./form";
import SubscriptionPlanForm from "./form";
import StorageUnitForm from "./form";

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
function StorageUnitsTable() {
  return (
    <Box m="2px">
      <>
        <DynamicTable
          title="Storage Units"
          subtitle="Create, view or edit  storage units"
          columns={StorageUnitsColumns}
          FormComponent={StorageUnitForm}
          query={allStorageUnits}
          base_url={base_url}
          actions={actions}
        />
      </>
    </Box>
  );
}

export default StorageUnitsTable;
