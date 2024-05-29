import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { allIndividualClients } from "../../../data/Axios/queries";
import { clientManagementUrl } from "../../../config";
import IndividualClientsForm from "./form";
import { IndividualClientsColumns } from "../../../data/DynamicTable/Collumns";
const base_url = clientManagementUrl.uri;
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
  // ViewCase: {
  //   key: "VIEWDETAILS",
  //   button_name: "View Details",
  //   Show_Button: true,
  // },
};
function IndividualClients() {
  return (
    <Box m="2px">
      <DynamicTable
        title="Individual Clients"
        subtitle="View all Individual Clients, create edit or view details"
        columns={IndividualClientsColumns}
        FormComponent={IndividualClientsForm}
        query ={allIndividualClients}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default IndividualClients;


