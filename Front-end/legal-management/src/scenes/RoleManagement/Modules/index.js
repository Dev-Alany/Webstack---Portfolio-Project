import React from "react";
import {
  Box,
  IconButton,
  Button,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Edit as EditIcon,
  Block as BlockIcon,
  CheckCircleOutline,
  PlusOne,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import swal from "sweetalert";
import Header from "../../../components/Header";
import AnchorTemporaryDrawer from "../../../components/Drawer";
import { ALL_MODULES, CREATE_MODULE } from "../../../data/RoleManagementData";
import { tokens } from "../../../theme";
import { useState } from "react";
import ModuleForm from "./forms";
import { Modulecolumns } from "../../../data/DynamicTable/Collumns";
import { AllModules } from "../../../data/Axios/queries";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { roleManagemenUrl } from "../../../config";
const base_url = roleManagemenUrl.uri;
const actions = {
  edit: {
    key: "EDIT",
    button_name: "Edit",
    Show_Button: true,
  },
  add: {
    key: "ADD Module",
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
function Modules() {
  return (
    <Box m="20px">
      <DynamicTable
        title="Module Management"
        subtitle="Manage Modules"
        columns={Modulecolumns}
        FormComponent={ModuleForm}
        query={AllModules}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default Modules;