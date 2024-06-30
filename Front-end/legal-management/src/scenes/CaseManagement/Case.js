import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Button,
  Typography,
  MenuItem,
  Select,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { PulseLoader } from "react-spinners";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import BlockIcon from "@mui/icons-material/Block";
import { CheckCircleOutline, LockResetRounded } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnchorTemporaryDrawer from "../../components/Drawer";
import swal from "sweetalert";
import { userManagementClient } from "../../config";
import UsersForm from "../users/users-form";
import { getallCases, createUser, deleteUser } from "../../api/userservice"; // Import service functions\
import CasesForm from "./Form";
import { userColumns } from "../../data/columns/usersColumns";
import { CaseColumns } from "../../data/columns/caseColumns";
import DynamicTable from "../../data/DynamicTable/dynamicTable";
import casesForm from "./Form";

function Cases() {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const handleFormSubmit = async (user) => {
    try {
      if (isEditing) {
        // Update user logic here
        // await updateUser(user); // Uncomment and implement this if update functionality is available
      } else {
        await createUser(user);
      }

      setDrawerOpen(false);
      setDialogOpen(false);
    } catch (error) {
      swal("Error!", "Unable to save the user, try again later", "error");
    }
  };

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
      key: "deletion",
      button_name: "Deactivate",
      Show_Button: true,
    },
    // ViewCase: {
    //   key: "VIEWDETAILS",
    //   button_name: "View Details",
    //   Show_Button: true,
    // },
  };

  return (
    <Box m="20px">
      <DynamicTable
        title="Cases"
        subtitle="View all Cases, create edit or Deactivate"
        columns={CaseColumns}
        FormComponent={CasesForm}
        // query ={allIndividualClients}
        base_url={"cases"}
        actions={actions}
      />
    </Box>
  );
}

export default Cases;
