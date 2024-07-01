import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { createUser } from "../../../api/userservice"; // Import service functions
import DynamicTable from "../../../data/DynamicTable/dynamicTable";

import { tokens } from "../../../theme";
import IndividualClientsForm from "./form";
import { IndividualClientsColumns } from "../../../data/columns/clientManagement";

function IndividualClients() {
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
        title="IndividualClients"
        subtitle="View all IndividualClients, create edit or Deactivate"
        columns={IndividualClientsColumns}
        FormComponent={IndividualClientsForm}
        // query ={allIndividualClients}
        base_url={"individualclients"}
        actions={actions}
      />
    </Box>
  );
}

export default IndividualClients;
