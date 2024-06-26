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
import { getallCases, createUser, deleteUser } from "../../api/userservice";  // Import service functions\

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
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const data = await getallCases();
      setUsers(data.data); // Adjust based on your API response structure
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditData(userToEdit);
    setIsEditing(true);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  };

  const handleAddCase = () => {
    setIsEditing(false);
    setEditData(null);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  };

  const handleActionSelect = async (event, id) => {
    const action = event.target.value;

    try {
      switch (action) {
        case "edit":
          handleEdit(id);
          break;
        // case "activate":
        //   await userManagementClient.post(`/activate/${id}`);
        //   swal("Success!", "User has been activated successfully", "success");
        //   break;
        case "deactivate":
          await userManagementClient.post(`/delete/${id}`);
          swal("Success!", "User has been deactivated successfully", "success");
          break;
        // case "resetpassword":
        //   await userManagementClient.post(`/resetpassword/${id}`);
        //   swal("Success!", "User password has been reset successfully", "success");
        //   break;
        default:
          break;
      }
      // Refetch users data after action
      fetchCases();
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
      fetchCases();
      setDrawerOpen(false);
      setDialogOpen(false);
    } catch (error) {
      swal("Error!", "Unable to save the user, try again later", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchCases();
    } catch (error) {
      swal("Error!", "Unable to delete the user, try again later", "error");
    }
  };

  const columns = [
    { field: "id", type: "number", headerName: "ID", flex: 0.5 },
    { field: "Name", headerName: "SubCategoryName", flex: 0.5 },
    // { field: "name", headerName: "Client_Type", flex: 0.5 },
    // { field: "name", headerName: "CaseCategory", flex: 0.5 },
    // { field: "name", headerName: "Email", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { id, isActive } }) => {
        const buttonText = isActive === 1 ? "Deactivate" : "Activate";
        const buttonIcon = isActive === 1 ? <BlockIcon /> : <CheckCircleOutline />;

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
                <EditIcon />
                <Typography variant="body1">Edit</Typography>
              </MenuItem>
              {/* <MenuItem value={isActive === 1 ? "deactivate" : "activate"}>
                <IconButton>{buttonIcon}</IconButton>
                <Typography variant="body1">{buttonText}</Typography>
              </MenuItem> */}
              {/* <MenuItem value="resetpassword">
                <LockResetRounded />
                <Typography variant="body1">Reset Password</Typography>
              </MenuItem> */}
              <MenuItem value="delete">
                <IconButton onClick={() => handleDelete(id)}>
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
            onClick={handleAddCase}
          >
            <Typography sx={{ color: colors.primary[400], mx: 1 }}>
              Add Case
            </Typography>
          </Button>
        </Box>

        <DataGrid
          checkboxSelection
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          style={{ minWidth: isMobile ? "auto" : "900px", width: "100%" }}
          getRowId={(row) => row.id}
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