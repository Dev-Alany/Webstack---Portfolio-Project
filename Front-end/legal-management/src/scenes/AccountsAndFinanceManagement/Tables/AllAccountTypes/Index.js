import { Box } from "@mui/material";

import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { AccountsandFinanceurl } from "../../../../config";
import { AccountTypesColumns } from "../../../../data/DynamicTable/Collumns";
import { allAccountTypes } from "../../../../data/Axios/queries";
const base_url = AccountsandFinanceurl.uri;
const actions = {
  edit: {
    key: "EDIT",
    button_name: "Edit",
    Show_Button: false,
  },
  add: {
    key: "ADD",
    button_name: "Add",
    Show_Button: false,
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
function AccountTypesTable() {
  return (
    <Box m="2px">
      <DynamicTable
        title="All Account Types"
        subtitle="View account types"
        columns={AccountTypesColumns}
        //FormComponent={CasesForm}
        query={allAccountTypes}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default AccountTypesTable;
