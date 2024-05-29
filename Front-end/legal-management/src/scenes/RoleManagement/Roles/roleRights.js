import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import {
  CREATE_ROLE_RIGHTS_BULK,
  CREATE_ROLE_RIGHTS,
} from "../../../data/RoleManagementData";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import UsersForm from "../../users/users-form";
import { roleManagemenUrl } from "../../../config";
import {
  GetRoleRightsByRoleId,
  fetchDataEngine,
  generateAndExecuteBulkMutation,
} from "../../../data/Axios/DynamicService";
import Swal from "sweetalert2";
const AssignRightsForm = ({ roleRightsData, roleId, roleRightByRoleData,onClose }) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedModules, setSelectedModules] = useState({});
  const [selectedRights, setSelectedRights] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [rolesbyroleiddata, setrolesbyroleiddata] = useState({});
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    try {
      const roleRightsDataByRole = await GetRoleRightsByRoleId(roleId);
      if (roleRightsDataByRole != null) {
        const cleanedRoleRightByRoleData = JSON.parse(
          roleRightsDataByRole.replace(/\\/g, "")
        );
        setrolesbyroleiddata(cleanedRoleRightByRoleData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log("roleRightsDataId:", rolesbyroleiddata);

  useEffect(() => {
    if (rolesbyroleiddata != null) {
      initializeSelections();
    }
  }, [rolesbyroleiddata]);

  const initializeSelections = () => {
    const initialSelectedModules = {};
    const initialSelectedRights = {};
    const initialSelectedPermissions = {};

    roleRightsData[0].forEach((module) => {
      initialSelectedModules[module.id] = false;
      initialSelectedRights[module.id] = {};
      initialSelectedPermissions[module.id] = {};

      if (!roleRightByRoleData) {
        return;
      }
      const moduleExists = roleRightByRoleData.some(
        (item) => item.id === module.id
      );

      if (moduleExists) {
        initialSelectedModules[module.id] = true;

        module.children.forEach((right) => {
          // Check if right exists in roleRightByRoleData's children
          const moduleData = roleRightByRoleData.find(
            (item) => item.id === module.id
          );
          if (moduleData && moduleData.children) {
            const rightExists = moduleData.children.some(
              (item) => item.id === right.id
            );
            if (rightExists) {
              initialSelectedRights[module.id][right.id] = true;

              // Initialize permissions for the right
              initialSelectedPermissions[module.id][right.id] = {};

              const rightData = moduleData.children.find(
                (item) => item.id === right.id
              );
              if (moduleData.children && rightData) {
                Object.entries(rightData.permissions).forEach(
                  ([permission, value]) => {
                    if (value === 1) {
                      initialSelectedPermissions[module.id][right.id][
                        permission
                      ] = true;
                    } else {
                      initialSelectedPermissions[module.id][right.id][
                        permission
                      ] = false;
                    }
                  }
                );
              }
            }
          }
        });
      }
    });

    setSelectedModules(initialSelectedModules);
    setSelectedRights(initialSelectedRights);
    setSelectedPermissions(initialSelectedPermissions);
  };

  const handleModuleCheckboxChange = (moduleId, isChecked) => {
    const updatedRights = { ...selectedRights[moduleId] };
    const updatedPermissions = { ...selectedPermissions[moduleId] };

    Object.keys(updatedRights).forEach((rightId) => {
      updatedRights[rightId] = isChecked;

      // Update permissions for each right
      Object.keys(updatedPermissions[rightId]).forEach((permission) => {
        updatedPermissions[rightId][permission] = isChecked;
      });
    });

    setSelectedModules((prevSelectedModules) => ({
      ...prevSelectedModules,
      [moduleId]: isChecked,
    }));
    setSelectedRights((prevSelectedRights) => ({
      ...prevSelectedRights,
      [moduleId]: updatedRights,
    }));
    setSelectedPermissions((prevSelectedPermissions) => ({
      ...prevSelectedPermissions,
      [moduleId]: updatedPermissions,
    }));
  };

  const handleRightCheckboxChange = (moduleId, rightId, isChecked) => {
    const updatedPermissions = { ...selectedPermissions[moduleId][rightId] };

    // Update permissions for the selected right
    Object.keys(updatedPermissions).forEach((permission) => {
      updatedPermissions[permission] = isChecked;
    });

    setSelectedRights((prevSelectedRights) => ({
      ...prevSelectedRights,
      [moduleId]: {
        ...prevSelectedRights[moduleId],
        [rightId]: isChecked,
      },
    }));
    setSelectedPermissions((prevSelectedPermissions) => ({
      ...prevSelectedPermissions,
      [moduleId]: {
        ...prevSelectedPermissions[moduleId],
        [rightId]: updatedPermissions,
      },
    }));
  };

  const handlePermissionCheckboxChange = (
    moduleId,
    rightId,
    permission,
    isChecked
  ) => {
    setSelectedPermissions((prevSelectedPermissions) => ({
      ...prevSelectedPermissions,
      [moduleId]: {
        ...prevSelectedPermissions[moduleId],
        [rightId]: {
          ...prevSelectedPermissions[moduleId][rightId],
          [permission]: isChecked,
        },
      },
    }));
  };

  const flattenPermissions = (permissions) => {
    const flattened = [];

    // Iterate through modules
    Object.keys(permissions).forEach((moduleId) => {
      // Iterate through rights
      Object.keys(permissions[moduleId]).forEach((rightId) => {
        // Extract permissions for the current right
        const currentPermissions = permissions[moduleId][rightId];

        // Create a permission object for the current right
        const permissionObject = {
          moduleId: parseInt(moduleId),
          rightId: parseInt(rightId),
          roleId,
          createdBy: userId,
          createPermission: currentPermissions.includes("CreatePermission")
            ? 1
            : 0,
          editPermission: currentPermissions.includes("EditPermission") ? 1 : 0,
          activatePermission: currentPermissions.includes("ActivatePermission")
            ? 1
            : 0,
          exportPermission: currentPermissions.includes("ExportPermission")
            ? 1
            : 0,
        };

        flattened.push(permissionObject);
      });
    });

    return flattened;
  };


  const handleSubmit = () => {
    try {
      const consolidatedPermissions = {};

      Object.keys(selectedModules).forEach((moduleId) => {
        if (selectedModules[moduleId]) {
          consolidatedPermissions[moduleId] = {};

          Object.keys(selectedRights[moduleId]).forEach((rightId) => {
            if (selectedRights[moduleId][rightId]) {
              consolidatedPermissions[moduleId][rightId] = [];

              Object.keys(selectedPermissions[moduleId][rightId]).forEach(
                (permission) => {
                  if (selectedPermissions[moduleId][rightId][permission]) {
                    consolidatedPermissions[moduleId][rightId].push(permission);
                  }
                }
              );
            }
          });
        }
      });
      const flattenedPermissions = flattenPermissions(consolidatedPermissions);
      const response = generateAndExecuteBulkMutation(
        "createRoleRightsBulk",
        "newRoleRights",
        flattenedPermissions,
        roleManagemenUrl.uri
      );
      if (Object.values(response)[0] != null) {
      onClose()
        Swal.fire({
          icon: "success",
          title: "successfully",
          text: `Role Right  has been updated successfully.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while processing your request. Please try again later.",
      });
    }

   
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="10px">
      <>
        <Header title="Role Rights" subtitle="Manage rights to a role" />

        {roleRightsData[0].map((module) => (
          <Box
            m="20px 0 0 0"
            //height="75vh"
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
                backgroundColor: colors.blueAccent[600],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[600],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
            key={module.id}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedModules[module.id] || false}
                  onChange={(e) =>
                    handleModuleCheckboxChange(module.id, e.target.checked)
                  }
                />
              }
              label={
                <Typography color={colors.greenAccent[400]} ms={2}>
                  {module.title}
                </Typography>
              }
            />

            {module.children &&
              module.children.map((right) => (
                <Box ml={2} key={right.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedRights[module.id]?.[right.id] || false}
                        onChange={(e) =>
                          handleRightCheckboxChange(
                            module.id,
                            right.id,
                            e.target.checked
                          )
                        }
                      />
                    }
                    label={
                      <Typography color={colors.blueAccent[400]} ms={2}>
                        {right.title}
                      </Typography>
                    }
                  />
                  <Box ml={3}>
                    {right.permissions &&
                      Object.entries(right.permissions).map(
                        ([permission, value]) => (
                          <FormControlLabel
                            key={permission}
                            control={
                              <Checkbox
                                checked={
                                  selectedPermissions[module.id]?.[right.id]?.[
                                    permission
                                  ] || false
                                }
                                onChange={(e) =>
                                  handlePermissionCheckboxChange(
                                    module.id,
                                    right.id,
                                    permission,
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={
                              <Typography variant="body2" component="span">
                                {permission}
                              </Typography>
                            }
                          />
                        )
                      )}
                  </Box>
                </Box>
              ))}
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </>
    </Box>
  );
};

export default AssignRightsForm;
