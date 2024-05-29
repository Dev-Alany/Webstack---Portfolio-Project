import React, { useContext, useEffect, useState } from "react"; // Added useState
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { tokens } from "../../theme";
import { useTheme, useMediaQuery, Select, MenuItem } from "@mui/material";
import { AddOnView, BranchesView, CompanyAddOnsView, CompanyView, DepartmentView, RegionsView, StorageUnitsView, SubscriptionPlansView } from "../AccountsAndFinanceManagement/Component/Components";


const CompanyManagementModule = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSelectChange = (event) => {
    handleChange(event, event.target.value);
  };

  const getTabStyle = (isSelected) => ({
    borderRadius: "0.75rem",
    border:
      theme.palette.mode === "dark" ? "1px solid #70d8bd" : "1px solid #1F2A40",
    m: 0.3,

    color: isSelected
      ? theme.palette.mode === "dark"
        ? colors.greenAccent[400]
        : colors.primary[100]
      : "inherit",
    bgcolor: isSelected
      ? theme.palette.mode === "light"
        ? colors.primary[200]
        : colors.greenAccent[400]
      : "inherit",
    "&.Mui-selected": {
      color:
        theme.palette.mode === "dark"
          ? colors.primary[400]
          : colors.primary[900],
    },
  });
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, bgcolor: `${colors.primary[400]}` }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const tabs = [
    { label: "Company", content: <CompanyView /> },
    { label: "Regions", content: <RegionsView /> },
    { label: "Branches", content: <BranchesView /> },
    { label: "Departments", content: <DepartmentView /> },
    { label: "Subscription Plans", content: <SubscriptionPlansView /> },
    { label: "AddOns", content: <AddOnView /> },
    { label: "Company AddOns", content: <CompanyAddOnsView /> },
    { label: "Storage Units", content: <StorageUnitsView /> },
  ];

  return (
    <div className="container-fluid">
      <Box sx={{ p: 1, m: 2, bgcolor: `${colors.primary[400]}` }}>
        <Card sx={{ borderRadius: "0.9em", height: "100%" }}>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: `${colors.primary[400]}`,
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              height: "max-content",
              p: 2,
              width: "100%",
            }}
          >
             {isSmallScreen ? (
              <Select
                value={value}
                onChange={handleSelectChange}
                fullWidth
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ bgcolor: `${colors.primary[400]}` }}
              >
                {tabs.map((tab, index) => (
                  <MenuItem key={index} value={index} sx={{ bgcolor: `${colors.primary[400]}` }}>
                    {tab.label}
                  </MenuItem>
                ))}
              </Select>
            ) : (
            <Tabs
              orientation={isSmallScreen ? "horizontal" : "vertical"}
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Court Setups"
              sx={{
                borderRight: isSmallScreen ? 0 : 2,
                borderBottom: isSmallScreen ? 2 : 0,
                //bgcolor: `${colors.blueAccent[400]}`,
                bgcolor: `${colors.primary[400]}`,
                width: isSmallScreen ? "100%" : "auto",
              }}
            >
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab.label}
                    {...a11yProps(index)}
                    className={value === index ? "custom-tab-active custom-tab" : "custom-tab"}
                    sx={getTabStyle(value === index)}
                  />
                ))}
              {/* <Tab
                label="Company"
                {...a11yProps(0)}
                className={
                  value === 0 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 0)}
              />
              <Tab
                label="Regions"
                {...a11yProps(1)}
                className={
                  value === 1 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 1)}
              />
              <Tab
                label="Branches"
                {...a11yProps(2)}
                className={
                  value === 2 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 2)}
              />

              <Tab
                label="Departments "
                {...a11yProps(3)}
                className={
                  value === 3 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 3)}
              />

              <Tab
                label="Subscription Plans"
                {...a11yProps(4)}
                className={
                  value === 4 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 4)}
              />
              <Tab
                label="AddOns"
                {...a11yProps(5)}
                className={
                  value === 5 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 5)}
              />
              <Tab
                label="Company AddOns"
                {...a11yProps(6)}
                className={
                  value === 6 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 6)}
              />
              <Tab
                label="Storage Units"
                {...a11yProps(7)}
                className={
                  value === 7 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 7)}
              /> */}
            </Tabs>
            )}
            
             {tabs.map((tab, index) => (
              <TabPanel key={index} value={value} index={index} className="w-100">
                {tab.content}
              </TabPanel>
            ))}
            {/* Tab Content
            // <TabPanel value={value} index={0} className="w-100">
            //   <CompanyView />
            // </TabPanel>
            // <TabPanel value={value} index={1} className="w-100">
            //   <RegionsView />
            // </TabPanel>
            // <TabPanel value={value} index={2} className="w-100">
            //   <BranchesView />
            // </TabPanel>
            // <TabPanel value={value} index={3} className="w-100">
            //   <DepartmentView />
            // </TabPanel>
            // <TabPanel value={value} index={3} className="w-100">
            //   <SubscriptionPlansView />
            // </TabPanel>
            // <TabPanel value={value} index={5} className="w-100">
            //   <AddOnView />
            // </TabPanel>
            // <TabPanel value={value} index={6} className="w-100">
            //   <CompanyAddOnsView />
            // </TabPanel>
            // <TabPanel value={value} index={6} className="w-100">
            //   <StorageUnitsView />
            // </TabPanel> */}
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default CompanyManagementModule;
