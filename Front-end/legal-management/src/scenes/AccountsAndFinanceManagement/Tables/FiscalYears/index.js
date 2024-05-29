import { Box } from "@mui/material";

import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { AccountsandFinanceurl } from "../../../../config";
import { AccountTypesColumns } from "../../../../data/DynamicTable/Collumns";
import { allBankAccounts, allFiscalYears } from "../../../../data/Axios/queries";
import { BankAccountsColumns, FiscalYearsColumns } from "../../../../data/DynamicTable/AccountsColumns";


import FiscalYearForm from "./form";
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
function FiscalYearTable() {
  return (
    <Box m="2px">
      <DynamicTable
        title="Fiscal Years"
        subtitle="Create, view or edit Fiscal Years
        "
        columns={FiscalYearsColumns}
        FormComponent={FiscalYearForm}
        query={allFiscalYears}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default FiscalYearTable;
