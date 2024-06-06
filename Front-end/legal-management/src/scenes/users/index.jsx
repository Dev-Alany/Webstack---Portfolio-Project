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
import UsersForm from "./users-form";
import { getAllUsers, createUser, deleteUser } from "../../api/userservice";  // Import service functions

function Users() {
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers("data");
      setUsers(data.data); // Adjust based on your API response structure
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return;
  // <CircularProgress />
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <PulseLoader size={10} color={"#3f51b5"} />
  </Box>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (User_Id) => {
    const userToEdit = users.find((user) => user.User_Id === User_Id);
    setEditData(userToEdit);
    setIsEditing(true);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setEditData(null);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  };

  const handleActionSelect = async (event, User_Id) => {
    const action = event.target.value;
  
    try {
      switch (action) {
        case "edit":
          handleEdit(User_Id);
          break;
        case "activate":
          await userManagementClient.post(`/activate/${User_Id}`);
          swal("Success!", "User has been activated successfully", "success");
          break;
        case "deactivate":
          await userManagementClient.post(`/delete/${User_Id}`);
          swal("Success!", "User has been deactivated successfully", "success");
          break;
        case "resetpassword":
          await userManagementClient.post(`/resetpassword/${User_Id}`);
          swal("Success!", "User password has been reset successfully", "success");
          break;
        default:
          break;
      }
      // Refetch users data after action
      fetchUsers();
    } catch (error) {
      swal("Error!", "Unable to complete the action, try again later", "error");
    }
  };
  
  const handleFormSubmit = async (user) => {
    try {
      if (isEditing) {
        // Update user logic here
        // await updateUser(user); // Uncomment and implement this if update functionality is available
      } else {
        await createUser(user);
      }
      fetchUsers();
      setDrawerOpen(false);
      setDialogOpen(false);
    } catch (error) {
      swal("Error!", "Unable to save the user, try again later", "error");
    }
  };

  const handleDelete = async (User_Id) => {
    try {
      await deleteUser(User_Id);
      fetchUsers();
    } catch (error) {
      swal("Error!", "Unable to delete the user, try again later", "error");
    }
  };

  const columns = [
    { field: "User_Id", type: "number", headerName: "ID", flex: 0.5 },
    { field: "Username", headerName: "Username", flex: 0.5 },
    { field: "First_name", headerName: "First Name", flex: 0.5 },
    { field: "Last_name", headerName: "Last Name", flex: 0.5 },
    { field: "User_email", headerName: "Email", flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: ({ row: { status } }) => {
        const statusText = status === "Active" ? "Active" : "Blocked";
        const statusColor = status === "Active" ? colors.greenAccent[500]: "red";
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
      renderCell: ({ row: { User_Id, isActive } }) => {
        const buttonText = isActive === 1 ? "Deactivate" : "Activate";
        const buttonIcon = isActive === 1 ? <BlockIcon /> : <CheckCircleOutline />;

        return (
          <Box>
            <Select
              value=""
              onChange={(e) => handleActionSelect(e, User_Id)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Actions
              </MenuItem>
              <MenuItem value="edit">
                <EditIcon />
                <Typography variant="body1">Edit</Typography>
              </MenuItem>
              <MenuItem value={isActive === 1 ? "deactivate" : "activate"}>
                <IconButton>{buttonIcon}</IconButton>
                <Typography variant="body1">{buttonText}</Typography>
              </MenuItem>
              <MenuItem value="resetpassword">
                <LockResetRounded />
                <Typography variant="body1">Reset Password</Typography>
              </MenuItem>
              <MenuItem value="delete">
                <IconButton onClick={() => handleDelete(User_Id)}>
                  <BlockIcon />
                </IconButton>
                <Typography variant="body1">Delete</Typography>
              </MenuItem>
            </Select>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="User Management" subtitle="Manage Users" />
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[500],
              borderRadius: "4px",
            }}
            onClick={handleAddUser}
          >
            <Typography sx={{ color: colors.primary[400], mx: 1 }}>
              Add User
            </Typography>
          </Button>
        </Box>

        <DataGrid
          checkboxSelection
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          style={{ minWidth: isMobile ? "auto" : "900px", width: "100%" }}
          getRowId={(row) => row.User_Id}
        />

        <AnchorTemporaryDrawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          FormComponent={() => (
            <UsersForm onClose={() => setDrawerOpen(false)} onSubmit={handleFormSubmit} isEditing={isEditing} userData={editData} />
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
              <UsersForm onClose={() => setDialogOpen(false)} onSubmit={handleFormSubmit} isEditing={isEditing} userData={editData} />
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}

export default Users;