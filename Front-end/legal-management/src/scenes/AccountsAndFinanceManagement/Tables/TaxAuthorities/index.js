import { Box } from "@mui/material";

import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { AccountsandFinanceurl } from "../../../../config";
import { AccountTypesColumns } from "../../../../data/DynamicTable/Collumns";
import {
  allBankAccounts,
  allFiscalYears,
  allTaxAuthorities,
} from "../../../../data/Axios/queries";
import {
  BankAccountsColumns,
  FiscalYearsColumns,
  TaxAuthoritiesColumns,
} from "../../../../data/DynamicTable/AccountsColumns";

import BankAccountForm from "./form";
import FiscalYearForm from "./form";
import TaxAuthorityForm from "./form";
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
function TaxAuthorityTable() {
  return (
    <Box m="2px">
      <DynamicTable
        title="Tax Authorities"
        subtitle="Create, view or edit Tax Authorities
        "
        columns={TaxAuthoritiesColumns}
        FormComponent={TaxAuthorityForm}
        query={allTaxAuthorities}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default TaxAuthorityTable;
