import React, { useState }  from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";
import { useTheme, useMediaQuery, Select, MenuItem } from "@mui/material";
import CasesRoundedIcon from "@mui/icons-material/CasesRounded";
import EventIcon from "@mui/icons-material/Event";
import AssignmentTurnedInSharpIcon from "@mui/icons-material/AssignmentTurnedInSharp";
import AddTaskIcon from "@mui/icons-material/AddTask";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GavelIcon from '@mui/icons-material/Gavel';
import TeamAssignments from "../CaseManagement/CaseDetails/TeamAssignments";
import CaseTasks from "../CaseManagement/CaseDetails/CaseTasks";
import CaseEvents from "../CaseManagement/CaseDetails/EventRecording";
import JudgeAssignments from "../CaseManagement/CaseDetails/JudgeAssignments";
import CaseDashboard from "../CaseManagement/CaseDetails/CaseDashBoard";



const tabContents = [
  <CaseDashboard/>,
  <TeamAssignments />,
  <CaseTasks />,
  <CaseEvents />,
  <JudgeAssignments />,
  "Fact Recording content",
  "Fact Recording content",
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{ p: 3, bgcolor: `${colors.primary[400]}`, minHeight: "80vh" }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CaseDetails() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectChange = (event) => {
    handleChange(event, event.target.value);
  };


  const getTabStyle = (isSelected) => ({
    mx: 1,
    color: theme.palette.mode === "dark" ? "white" : "black",
    bgcolor: isSelected
      ? theme.palette.mode === "light"
        ? colors.primary[200]
        : colors.greenAccent[400]
      : "inherit",
    "&.Mui-selected": {
      color: theme.palette.mode === "dark" ? "white" : colors.primary[900],
    },
    borderRadius: "0.75rem",
    border:
      theme.palette.mode === "dark" ? "1px solid #70d8bd" : "1px solid #1F2A40",
  });

  const getIconStyle = () => ({
    color: theme.palette.mode === "dark" ? "dark" : "inherit",
  });

  const tabs = [
    { label: "Case Dashboard", icon: CasesRoundedIcon, content: <CaseDashboard /> },
    { label: "Team Assignment", icon: AssignmentTurnedInSharpIcon, content: <TeamAssignments /> },
    { label: "Task allocation", icon: AddTaskIcon, content: <CaseTasks /> },
    { label: "Event Recording", icon: EventIcon, content: <CaseEvents /> },
    { label: "Judge Assignment", icon: GavelIcon, content: <JudgeAssignments /> },
  ];

  return (
    <Box
      sx={{
        margin: 2,
        // width: "100%",
        bgcolor: `${colors.primary[400]}`,
        // height: "100%",
        height: "100vh",
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
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          p: 1,
          bgcolor: `${colors.primary[400]}`,
        }}
      >

{tabs.map((tab, index) => (
            <Tab
              key={index}
              sx={getTabStyle(value === index)}
              icon={<tab.icon sx={getIconStyle()} />}
              label={tab.label}
              {...a11yProps(index)}
            />
          ))}
        {/* {[
          { label: "Case Dashboard", icon: CasesRoundedIcon },
          { label: "Team Assignment", icon: AssignmentTurnedInSharpIcon },
          { label: "Task allocation", icon: AddTaskIcon },
          { label: "Event Recording", icon: EventIcon },
          { label: "Judge Assignment", icon: GavelIcon },
          { label: "Fact Recording", icon: FactCheckIcon },
          { label: "Court Assignment", icon: AssignmentTurnedInIcon },
          { label: "Document Uploads", icon: FolderSharedIcon },
          { label: "Fact Recording", icon: FactCheckIcon },
        ].map((tab, index) => (
          <Tab
            key={index}
            sx={getTabStyle(value === index)}
            icon={<tab.icon sx={getIconStyle()} />}
            label={tab.label}
            {...a11yProps(index)}
          />
        ))} */}
      </Tabs>
      )}

{tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
      {/* <CustomTabPanel value={value} index={0}>
        <Typography>{tabContents[0]}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography>{tabContents[1]}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography>{tabContents[2]}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Typography>{tabContents[3]}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Typography>{tabContents[4]}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Typography>{tabContents[5]}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <Typography>{tabContents[6]}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <Typography>{tabContents[7]}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        <Typography>{tabContents[8]}</Typography>
      </CustomTabPanel> */}
    </Box>
  );
}

export default CaseDetails;
