import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import OtherSetupsOutlinedIcon from "@mui/icons-material/OtherSetupsOutlinedIcon"
import { Groups2Outlined } from "@mui/icons-material";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import CasesIcon from '@mui/icons-material/Cases';
import AddchartIcon from '@mui/icons-material/Addchart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CheckIcon from '@mui/icons-material/Check';
import GavelIcon from '@mui/icons-material/Gavel';
import TerrainIcon from '@mui/icons-material/Terrain';
import MessageIcon from '@mui/icons-material/Message';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Axios from "axios";

function getIconByName(iconName) {
  switch (iconName) {
    case "home":
      return <HomeOutlinedIcon />;
    case "users":
      return <PeopleOutlinedIcon />;
    case "usermanagement":
      return <Groups2Outlined />;
    case "contacts":
      return <ContactsOutlinedIcon />;
    case "receipt":
      return <ReceiptOutlinedIcon />;
    case "Clients":
      return <PersonIcon />;
    case "calendar":
      return <CalendarTodayOutlinedIcon />;
    case "help":
      return <HelpOutlinedIcon />;
    case "barChart":
      return <BarChartOutlinedIcon />;
    case "pieChart":
      return <PieChartOutlinedIcon />;
    case "timeline":
      return <TimelineOutlinedIcon />;
    case "menu":
      return <MenuOutlinedIcon />;
    case "map":
      return <MapOutlinedIcon />;
    case "analytics":
      return <AnalyticsOutlinedIcon />;
    case "Accounts":
      return <ManageAccountsIcon />;
    case "Dashboard":
      return <DashboardIcon />;
    case "clients":
      return <GroupIcon />;
    case "Cases":
      return <CasesIcon />;
    case "chartofAccounta":
      return <AddchartIcon />;
    case "reports":
      return <SummarizeIcon />;
    case "companies":
      return <LocationCityIcon />;
    case "module":
      return <ViewModuleIcon />;
    case "role":
      return <ViewModuleIcon />;
    case "rolegroup":
      return <ViewModuleIcon />;
    case "rights":
      return <CheckIcon />;
      // setup Management
    case "Court Setup-icon":
      return <GavelIcon />;  
    case "Geography-icon":
      return <TerrainIcon />; 
    case "Message-icon":
      return <MessageIcon />; 
    case "othersetups":
      return <SettingsApplicationsIcon/>; 
    case "module":
      return <ViewModuleIcon />; 
    case "module":
      return <ViewModuleIcon />; 
    case "module":
      return <ViewModuleIcon />; 
    case "module":
      return <ViewModuleIcon />; 

    // default:
      // Return a default icon or handle the case when the iconName doesn't match any case
      // return <AnalyticsOutlinedIcon />;
  }
}

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  setMenuSelected,
  selectedMenu,
  submenuitems,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <SubMenu
      active={selectedMenu === title}
      style={{ color: colors.grey[100] }}
      icon={getIconByName(icon)}
      title={title}
      to={to}
    >
      {submenuitems.map((submenuitem, j) => (
        <MenuItem
          key={j}
          active={selected === submenuitem.title}
          style={{ color: colors.grey[100] }}
          onClick={() => setSelected(submenuitem.title)}
          icon={getIconByName(submenuitem.icon)}
        >
          <Typography>
            {submenuitem.title}
            <Link to={submenuitem.to} />
          </Typography>
        </MenuItem>
      ))}
    </SubMenu>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [selectedMenu, setMenuSelected] = useState("Dashboard");
  const [apiData, setData] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isButtonVisible, setButtonVisible] = useState(true);
  useEffect(() => {
    const rights = JSON.parse(localStorage.getItem("rights"));
    const cleanedData = JSON.parse(rights.replace(/\\/g, ""));
    setData(cleanedData);
  }, []);

  const sidebarContent = (
    <Box
      sx={{
        height: "150vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-sidebar-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-sidebar-inner:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      {isSmallScreen && (
        <IconButton
          style={{ margin: "10px", display: isSmallScreen ? "none" : "block",
          zIndex: isSmallScreen ? -1 : "auto", }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          
        >
          <MenuOutlinedIcon />
        </IconButton>
      )}
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="Center"
                alignItems="Center"
                ml="15px"
              >
                <Box display="flex" justifyContent="start" alignItems="start">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/m.svg`}
                    style={{ cursor: "pointer", borderRadius: "10%" }}
                  />
                </Box>

                <IconButton
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="10px" ms="10px">
              <Box ms="10px" textAlign="Center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 10px 0" }}
                >
                  Legal Management
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {apiData.map((menuitem, i) => (
              <Item
                key={i}
                title={menuitem.title}
                icon={menuitem.icon}
                selected={selected}
                setSelected={setSelected}
                setMenuSelected={setMenuSelected}
                selectedMenu={selectedMenu}
                submenuitems={menuitem.children}
              />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
  return (
    <Box>
      {isSmallScreen ? (
        <>
          {isButtonVisible && (
            <IconButton
              onClick={() => {
                setDrawerOpen(true);
                setButtonVisible(false);
              }}
              style={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
            >
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => {
              setDrawerOpen(false);
              setButtonVisible(true);
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        sidebarContent
      )}
    </Box>
  );
};

export default Sidebar;
