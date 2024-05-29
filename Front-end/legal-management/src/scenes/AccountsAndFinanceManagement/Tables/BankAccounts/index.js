import { Box } from "@mui/material";

import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { AccountsandFinanceurl } from "../../../../config";
import { AccountTypesColumns } from "../../../../data/DynamicTable/Collumns";
import {

  allBankAccounts,
 
} from "../../../../data/Axios/queries";
import {

  BankAccountsColumns,

} from "../../../../data/DynamicTable/AccountsColumns";

import BankAccountForm from "./form";
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
function BanksAccountTable() {
  return (
    <Box m="2px">
      <DynamicTable
        title="Bank Accounts"
        subtitle="Create, view or edit bank accounts
        "
        columns={BankAccountsColumns}
        FormComponent={BankAccountForm}
        query={allBankAccounts}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default BanksAccountTable;
