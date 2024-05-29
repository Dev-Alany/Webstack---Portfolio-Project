// import { Box, useTheme } from "@mui/material";
// import Header from "../../components/Header";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { tokens } from "../../theme";

// const FAQ = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <Box m="20px">
//       <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

//       <Accordion defaultExpanded>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography color={colors.greenAccent[500]} variant="h5">
//             An Important Question
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion defaultExpanded>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography color={colors.greenAccent[500]} variant="h5">
//             Another Important Question
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion defaultExpanded>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography color={colors.greenAccent[500]} variant="h5">
//             Your Favorite Question
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion defaultExpanded>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography color={colors.greenAccent[500]} variant="h5">
//             Some Random Question
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion defaultExpanded>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography color={colors.greenAccent[500]} variant="h5">
//             The Final Question
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//     </Box>
//   );
// };

// export default FAQ;
// /

import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import CasesRoundedIcon from "@mui/icons-material/CasesRounded";
import EventIcon from "@mui/icons-material/Event";
import AssignmentTurnedInSharpIcon from "@mui/icons-material/AssignmentTurnedInSharp";
import AddTaskIcon from "@mui/icons-material/AddTask";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import GavelIcon from "@mui/icons-material/Gavel";

const tabContents = [
  "Task Test cases",
  "Task Test content",
  "Task allocation content",
  "Event Recording content",
  "Judge Assignment content",
  "Fact Recording content",
  "Documents content",
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
          sx={{ p: 1, bgcolor: `${colors.primary[400]}`, minHeight: "100vh" }}
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

function Cases4() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabStyle = (isSelected) => ({
    // mx: 1,
    // color: theme.palette.mode === "dark" ? "white" : "black",
    // bgcolor: isSelected
    //   ? theme.palette.mode === "light"
    //     ? colors.primary[100]
    //     : colors.primary[100]
    //   : "inherit",
    // "&.Mui-selected": {
    //   color: theme.palette.mode === "dark" ? "white" : colors.primary[900],
    // },
  });

  const getIconStyle = () => ({
    color: theme.palette.mode === "dark" ? "dark" : "inherit",
  });

  return (
    <Box
      sx={{
        margin: 2,
        // width: "100%",
        bgcolor: `${colors.primary[400]}`,
        height: "100%",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          p: 2,
          bgcolor: `${colors.primary[400]}`,
        }}
      >
        {[
          { label: "Case", icon: CasesRoundedIcon },
          { label: "Team Assignment", icon: AssignmentTurnedInSharpIcon },
          { label: "Task allocation", icon: AddTaskIcon },
          { label: "Event Recording", icon: EventIcon },
          { label: "Judge Assignment", icon: GavelIcon },
          { label: "Fact Recording", icon: FactCheckIcon },
          { label: "Documents", icon: FolderSharedIcon },
          { label: "Fact Recording", icon: FactCheckIcon },
          { label: "Fact Recording", icon: FactCheckIcon },
        ].map((tab, index) => (
          <Tab
            key={index}
            sx={getTabStyle(value === index)}
            icon={<tab.icon sx={getIconStyle()} />}
            label={tab.label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      <CustomTabPanel value={value} index={0}>
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
      </CustomTabPanel>
    </Box>
  );
}

export default Cases4;
