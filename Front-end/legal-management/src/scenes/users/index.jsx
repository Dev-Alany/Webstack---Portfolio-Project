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
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USERS, RESET_PASSWORD, ACTIVATE_USER, DEACTIVATE_USER } from "../../data/userData";
import UsersForm from "./users-form";
import AnchorTemporaryDrawer from "../../components/Drawer";
import swal from "sweetalert";

function Users() {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [EditData, SetEdetData] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const [activateUser] = useMutation(ACTIVATE_USER, {
    onCompleted: () => {
      swal("Success!", "User has been activated successfully", "success");
      refetch(); // Refetch users data after activation
    },
    onError: (error) => {
      swal("Error!", "Unable to activate user, try again later", "error");
    },
  });

  const [deactivateUser] = useMutation(DEACTIVATE_USER, {
    onCompleted: () => {
      swal("Success!", "User has been deactivated successfully", "success");
      refetch(); // Refetch users data after deactivation
    },
    onError: (error) => {
      swal("Error!", "Unable to deactivate user, try again later", "error");
    },
  });

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      swal("Success!", "User password has been reset successfully", "success");
    },
    onError: (error) => {
      swal("Error!", "Unable to reset password, try again later", "error");
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loadingScreen) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PulseLoader size={15} color={"#3f51b5"} />
      </Box>
    );
  }

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const dataArray = data.allUsers;

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

  const handleAddUser = () => {
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
        activateUser({
          variables: {
            id,
          },
        });
        break;
      case "deactivate":
        deactivateUser({
          variables: {
            id,
          },
        });
        break;
      case "resetpassword":
        resetPassword({
          variables: {
            id,
          },
        });
        break;
      default:
        break;
    }
  };

  const columns = [
    { field: "id", type: "number", headerName: "ID", flex: 0.5 },
    { field: "username", headerName: "Username", flex: 0.5 },
    { field: "firstName", headerName: "First Name", flex: 0.5 },
    { field: "lastName", headerName: "Last Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "phone", headerName: "Phone Number", flex: 0.5 },
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
              <MenuItem value={isActive === 1 ? "deactivate" : "activate"}>
                <IconButton>{buttonIcon}</IconButton>
                <Typography variant="body1">{buttonText}</Typography>
              </MenuItem>
              <MenuItem value="resetpassword">
                <LockResetRounded />
                <Typography variant="body1">Reset Password</Typography>
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
          rows={dataArray}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          style={{ minWidth: isMobile ? "auto" : "900px", width: "100%" }}
        />

        <AnchorTemporaryDrawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          FormComponent={() => (
            <UsersForm onClose={() => setDrawerOpen(false)} isEditing={isEditing} userData={EditData} />
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
              <UsersForm  onClick={() => setDialogOpen(false)} isEditing={isEditing} courtData={EditData} />
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}

export default Users;
