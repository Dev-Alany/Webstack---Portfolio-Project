import React, { useContext, useEffect, useState } from "react"; // Added useState
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { tokens } from "../../theme";
import { useTheme, useMediaQuery } from "@mui/material";
import { AccountCategoryView, AccountSubcategoryView, AccountsView, BankAccountsView, BankBranchView, BanksView } from "./Component/Components";

const ChartOfAccounts = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            {/* Tabs */}
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
             
              <Tab
                label="Account Category "
                {...a11yProps(0)}
                className={
                  value === 0 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 0)}
              />
              <Tab
                label="Account Subcategory"
                {...a11yProps(1)}
                className={
                  value === 1 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 1)}
              />
              <Tab
                label=" Accounts"
                {...a11yProps(2)}
                className={
                  value === 2 ? "custom-tab-active custom-tab" : "custom-tab"
                }
                sx={getTabStyle(value === 2)}
              />
          
            </Tabs>
            {/* Tab Content */}
            
            <TabPanel value={value} index={0} className="w-100">
              <AccountCategoryView />
            </TabPanel>
            <TabPanel value={value} index={1} className="w-100">
              <AccountSubcategoryView />
            </TabPanel>
            <TabPanel value={value} index={2} className="w-100">
              <AccountsView />
            </TabPanel>
         
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default ChartOfAccounts;
