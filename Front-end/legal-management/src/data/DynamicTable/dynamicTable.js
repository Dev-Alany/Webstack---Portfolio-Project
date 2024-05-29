import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AnchorTemporaryDrawer from "../../components/Drawer";
import { graphqlQuery } from "../Axios/DynamicService";
import { useNavigate } from "react-router-dom";
import AssignTaskModal from "../../scenes/CaseManagement/CaseDetails/CaseTasks/Modal";
import { useDispatch } from "react-redux";
import { UpdateDataToStore } from "../../store/Actions/CustomAction";
import { Card, CardBody } from "react-bootstrap";

const DynamicTable = ({
  title,
  subtitle,
  columns,
  FormComponent,
  query,
  base_url,
  actions,
  DataFromGetBy,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  async function fetchAllData() {
    try {
      if (query && base_url) {
        const data = await graphqlQuery(query, base_url);
        if (data !== null) {
          setData(data);
        }
      } else {
        setData(DataFromGetBy);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  useEffect(() => {
    fetchAllData();
  }, [query, base_url]);

  useEffect(() => {
    if (refreshTable) {
      fetchAllData();
      setRefreshTable(false);
    }
  }, [refreshTable]);
  const columnsWithActions = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <Select
            value=""
            displayEmpty
            onChange={(e) => handleAction(e.target.value, row.id, row)}
          >
            <MenuItem value="" disabled>
              Actions
            </MenuItem>
            {Object.keys(actions)
              .filter(
                (action) => action !== "add" && actions[action].Show_Button
              ) // Exclude "add" action and actions with Show_Button false
              .map(
                (action) =>
                  actions[action] && ( // Check if the action is defined
                    <MenuItem key={actions[action].key} value={action}>
                      {actions[action].button_name}
                    </MenuItem>
                  )
              )}
          </Select>
        </Box>
      ),
    },
  ];

  const handleAdd = () => {
    setIsEditing(false);
    setEditData(null);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  };
  const handleOpenTaskModal = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setTaskModalOpen(true);
    setEditData(itemToEdit);
  };
  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setEditData(itemToEdit);
    setIsEditing(true);
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  };
  const handleAction = async (action, id, row) => {
    switch (action) {
      case "edit":
        handleEdit(id);
        break;
      case "add":
        handleAdd();
        break;
      case "ViewCase":
        localStorage.setItem("CaseId", JSON.stringify(id));
        navigate("/case-details");
        break;
      case "AssignTask":
        handleOpenTaskModal(id);
        break;
      case "viewDocument":
        dispatch(UpdateDataToStore(row?.document));
        break;
      default:
        break;
    }
  };
  return (
    <Box m="20px">
      <Box
        height="75vh"
        m="40px 0 0 0"
        // width="100%"
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Header title={title} subtitle={subtitle} />
          {actions.add && actions.add.Show_Button && (
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                variant="contained"
                size={isMobile ? "small" : "medium"} // Use "small" for small screens and "medium" for others
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  borderRadius: "4px",
                  padding: isMobile ? "4px 8px" : "8px 16px", // Adjust padding based on screen size
                  minWidth: isMobile ? "auto" : "64px", // Adjust minWidth for small screens
                }}
                onClick={() => handleAction("add")}
              >
                <Typography sx={{ color: colors.primary[400], mx: 1 }}>
                  {actions.add.button_name}
                </Typography>
              </Button>
            </Box>
          )}
        </Box>
        <DataGrid
          checkboxSelection
          rows={data || DataFromGetBy || null}
          columns={columnsWithActions}
          components={{ Toolbar: GridToolbar }}
          sx={{ minWidth: isMobile ? "auto" : "900px", width: "100%" }}
        />
        {taskModalOpen && (
          <AssignTaskModal
            data={editData}
            open={taskModalOpen}
            onClose={() => setTaskModalOpen(false)}
            onAction={() => setRefreshTable(true)}
          />
        )}

        <AnchorTemporaryDrawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          FormComponent={() => (
            <FormComponent
              isEditing={isEditing}
              data={editData}
              onAction={() => setRefreshTable(true)}
              onClose={() => setDrawerOpen(false)}
            />
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
              <FormComponent
                onClick={() => setDialogOpen(false)}
                isEditing={isEditing}
                courtData={editData}
              />
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default DynamicTable;
