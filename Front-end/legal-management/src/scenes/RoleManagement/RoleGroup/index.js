import {
  Box,
  IconButton,
  Button,
  Typography,
  MenuItem,
  Select, useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import BlockIcon from "@mui/icons-material/Block";
import { CheckCircleOutline } from "@mui/icons-material";
import { PlusOne } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { Suspense, useEffect, useState, useRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ALL_ROLEGROUPS } from "../../../data/RoleManagementData";
//import UsersForm from "./users-form";
import AnchorTemporaryDrawer from "../../../components/Drawer";

import swal from "sweetalert";
import RoleGroupForm from "./Forms";
function RoleGroups() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [EditData, SetEdetData] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const [dialogOpen, setDialogOpen] = useState(false);

  const colors = tokens(theme.palette.mode);
  //   const [activateUser] = useMutation(ACTIVATE_USER, {
  //     onCompleted: (data) => {
  //       data.deactivateUser === 1
  //         ? swal("Success!", "User has been Activated successfully", "success")
  //         : swal("Success!", "User has been deactivated successfully", "success");
  //     },
  //     onError: (error) => {
  //       swal(
  //         "Error!",
  //         "Unable to execute your request, try again later",
  //         "error"
  //       );
  //     },
  //   });

  const { loading, error, data } = useQuery(ALL_ROLEGROUPS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const dataArray = data.allRoleGroups

  const handleEdit = (id) => {
    const userToEdit = dataArray.find((user) => user.id === id);
    SetEdetData(userToEdit);
    setIsEditing(true);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    SetEdetData(null);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  };
  const handleActionSelect = (event, id) => {
    const action = event.target.value;

    switch (action) {
      case "edit":
        handleEdit(id);
        break;
      case "activate":
        // activateUser({
        //   variables: {
        //     id,
        //   },
        // });
        break;
      case "deactivate":
        // Handle deactivate action
        break;
      default:
        break;
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "roleGroup", headerName: "Role Group", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    {
      field: "isActive",
      headerName: "Status",
      flex: 0.5,
      renderCell: ({ row: { isActive } }) => {
        const statusText = isActive === 1 ? "Active" : "Blocked";
        const statusColor = isActive === 1 ? "green" : "red";
        return (
          <Typography variant="body1" style={{ color: statusColor }}>
            {statusText}
          </Typography>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { id, isActive } }) => {
        const buttonText = isActive === 1 ? "Deactivate" : "Activate";
        const buttonIcon =
          isActive === 1 ? <BlockIcon /> : <CheckCircleOutline />;

        return (
          <Box>
            <Select
              value=""
              onChange={(e) => handleActionSelect(e, id)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Actions
              </MenuItem>
              <MenuItem value="edit">
                <EditIcon color={colors.grey[100]} />
                <Typography variant="body1" color={colors.blueAccent[100]}>
                  Edit
                </Typography>
              </MenuItem>

              <MenuItem value="activate">
                <IconButton>{buttonIcon}</IconButton>
                <Typography variant="body1">{buttonText}</Typography>
              </MenuItem>
              {/* <MenuItem value="deactivate">
                Deactivate
                <BlockIcon />
              </MenuItem> */}
            </Select>
          </Box>
        );
      },
    },
  ];

  if (loading) return <CircularProgress />;

  return (
    <Box m="20px">
      <Header title="RoleGroup Management" subtitle="Manage RoleGroups" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[500],
                borderRadius: "4px",
              }}
              onClick={handleAdd}
            >
              <Typography sx={{ color: colors.primary[400], mx: 1 }}>
                Add Role Group
              </Typography>
            </Button>
          </Box>
        </Box>

        <DataGrid
          checkboxSelection
          rows={dataArray}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          style={{ minWidth: isMobile ? "auto" : "900px", width: "100%" }}
        />

        <AnchorTemporaryDrawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)} // Close the drawer
          FormComponent={() => (
            <RoleGroupForm isEditing={isEditing} roleData={EditData} />
          )}
        />
        {isMobile && (
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            fullScreen={isMobile}
          >
            <DialogTitle>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDialogOpen(false)}
                aria-label="close"
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <RoleGroupForm isEditing={isEditing} courtData={EditData} />
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}

export default RoleGroups;
