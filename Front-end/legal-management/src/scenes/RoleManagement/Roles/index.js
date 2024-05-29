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
import {
  CheckCircleOutline,
  ManageAccountsOutlined as ManageAccountsOutlinedIcon,
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AssignRight from "./AssignRoleRights";
import AssignRightsForm from "./roleRights";
import {
  ALL_ROLE,
  ALL_ROLE_RIGHTS,
  ALL_ROLE_RIGHTS_BY_ROLE,
} from "../../../data/RoleManagementData";
import UsersForm from "../../users/users-form";
import AnchorTemporaryDrawer from "../../../components/Drawer";
import RolesForm from "./Forms";
const useAssignDrawer = () => {
  const [roleId, setRoleId] = useState(null);
  const [roleRightData, setRoleRightData] = useState(null);
  const [roleRightByRoleData, setRoleRightByRoleData] = useState(null);
  const [rightsDrawerOpen, setRightsDrawerOpen] = useState(false);

  const handleAssignDrawer = (
    id,
    dataArray,

    allRoleRightsData
  ) => {
    const roleToAssignRight = dataArray.find((role) => role.id === id);
    setRoleId(id);

    // Process fetched data and set state
    const jsonData = allRoleRightsData.allModuleRights;
    console.log("jsonData:", jsonData);
    const AllModuleRights = JSON.parse(jsonData);
    AllModuleRights.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          child.permissions = JSON.parse(child.permissions);
        });
      }
    });

    setRoleRightData(AllModuleRights);
    setRightsDrawerOpen(true);
  };

  return {
    roleId,
    roleRightData,
    rightsDrawerOpen,
    handleAssignDrawer,
    setRightsDrawerOpen,
  };
};

function Role() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [skipQuery, setSkipQuery] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [EditData, SetEdetData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    roleId,
    roleRightData,
    rightsDrawerOpen,
    handleAssignDrawer,
    setRightsDrawerOpen,
  } = useAssignDrawer();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [roleRightByRoleData, setRoleRightByRoleData] = useState(null);

  const colors = tokens(theme.palette.mode);

  const { loading, error, data: roleData } = useQuery(ALL_ROLE);
  const {
    loading: allRoleRightsLoading,
    error: allRoleRightsError,
    data: allRoleRightsData,
  } = useQuery(ALL_ROLE_RIGHTS);
  const {
    loading: allRoleRightsByIdLoading,
    error: allRoleRightsByIdError,
    data: allRoleRightsDataById,
    refetch: refetchRoleRightsById,
  } = useQuery(ALL_ROLE_RIGHTS_BY_ROLE, {
    variables: { roleId: roleId },
    skip: skipQuery,
  });

  useEffect(() => {
    if (allRoleRightsDataById != null) {
      const cleanedRoleRightByRoleData = JSON.parse(
        allRoleRightsDataById.moduleRightsByRoleId.replace(/\\/g, "")
      );
      // cleanedRoleRightByRoleData.forEach((item) => {
      //   if (item.children) {
      //     item.children.forEach((child) => {
      //       child.permissions = JSON.parse(child.permissions);
      //     });
      //   }
      // });
      setRoleRightByRoleData(cleanedRoleRightByRoleData);
    }
  }, [allRoleRightsDataById]);
  const handleAdd = () => {
    setIsEditing(false);
    SetEdetData(null);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }; 
  };
  useEffect(() => {
    if (!skipQuery && roleId != null) {
      refetchRoleRightsById({ roleId });
      setSkipQuery(true);
    }
  }, [skipQuery, roleId, refetchRoleRightsById]);

  if (loading || allRoleRightsLoading || allRoleRightsByIdLoading)
    return <CircularProgress />;

  if (error || allRoleRightsError)
    return <p>Error: {error ? error.message : allRoleRightsError.message}</p>;

  const dataArray = roleData.allRoles;

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

  const handleActionSelect = (event, id) => {
    const action = event.target.value;

    switch (action) {
      case "edit":
        handleEdit(id);
        break;
      case "AddPermision":
        handleAssignDrawer(id, dataArray, allRoleRightsData);
        setSkipQuery(false); // Set skipQuery to false to trigger the query
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
    { field: "role", headerName: "Role", flex: 1 },
    { field: "roleDescription", headerName: "Description", flex: 1 },
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
              <MenuItem value="deactivate">
                {buttonIcon}
                <Typography variant="body1">{buttonText}</Typography>
              </MenuItem>
              <MenuItem value="AddPermision">
                <ManageAccountsOutlinedIcon />
                <Typography variant="body1" color={colors.blueAccent[100]}>
                  Manage Permissions
                </Typography>
              </MenuItem>
            </Select>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Role Management" subtitle="Manage Roles" />

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
                Add Role
              </Typography>
            </Button>
          </Box>
        </Box>
        <DataGrid
          checkboxSelection
          rows={dataArray}
          columns={columns}
          style={{ minWidth: isMobile ? "auto" : "900px", width: "100%" }} components={{ Toolbar: GridToolbar }}

        />
        <AnchorTemporaryDrawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)} // Close the drawer
          FormComponent={() => (
            <RolesForm isEditing={isEditing} roleData={EditData} />
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
              <RolesForm onClick={() => setDialogOpen(false)} isEditing={isEditing} courtData={EditData} />
            </DialogContent>
          </Dialog>
        )}
        <AssignRight
          anchor="right"
          open={rightsDrawerOpen}
          onClose={() => setRightsDrawerOpen(false)}
          FormComponent={() => (
            <AssignRightsForm
              onClose={() => setRightsDrawerOpen(false)}
              roleId={roleId}
              roleRightByRoleData={roleRightByRoleData}
              roleRightsData={[roleRightData]}
            />
          )}
        />
      </Box>
    </Box>
  );
}

export default Role;
