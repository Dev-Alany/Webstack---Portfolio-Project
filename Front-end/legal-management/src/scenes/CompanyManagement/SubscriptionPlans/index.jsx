import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { companyManagementUrl } from "../../../config";

import { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import { AddOnColumns, SubscriptionPlanColumns } from "../../../data/DynamicTable/CompanyManagementColumns";
import CompanyForm from "./form";
import { allAddOns, allSubscriptionPlans } from "../../../data/Axios/queries";

import AddOnForm from "./form";
import SubscriptionPlanForm from "./form";

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
function SubscriptionPlansTable() {
  return (
    <Box m="2px">
      <>
        <DynamicTable
          title="Subscription Plans"
          subtitle="Create, view or edit  subscription plans"
          columns={SubscriptionPlanColumns}
          FormComponent={SubscriptionPlanForm}
          query={allSubscriptionPlans}
          base_url={base_url}
          actions={actions}
        />
      </>
    </Box>
  );
}

export default SubscriptionPlansTable;
