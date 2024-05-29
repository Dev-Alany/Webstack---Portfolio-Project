import { Box } from "@mui/material";

import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { AccountsandFinanceurl } from "../../../../config";
import { AccountTypesColumns } from "../../../../data/DynamicTable/Collumns";
import {
  allAccountCategories,
  allAccountTypes,
  allAccounts,
  allPaymentTypes,
} from "../../../../data/Axios/queries";
import {
  AccountCategoriesColumns,
  AccountSubCategoriesColumns,
  AccountsColumns,
  PaymentTypesColumns,
} from "../../../../data/DynamicTable/AccountsColumns";
import AccountCategoryForm from "./form";
import AccountsForm from "./form";
import PaymentTypeForm from "./form";
const base_url = AccountsandFinanceurl.uri;
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
function PaymentTypesTable() {
  return (
    <Box m="2px">
      <DynamicTable
        title="Payment Types"
        subtitle="Create, view or edit payment types
        "
        columns={PaymentTypesColumns}
        FormComponent={PaymentTypeForm}
        query={allPaymentTypes}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default PaymentTypesTable;
