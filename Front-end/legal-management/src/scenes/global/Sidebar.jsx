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
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
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
import { Groups2Outlined } from "@mui/icons-material";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CasesIcon from "@mui/icons-material/Cases";
import AddchartIcon from "@mui/icons-material/Addchart";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import CheckIcon from "@mui/icons-material/Check";
import GavelIcon from "@mui/icons-material/Gavel";
import TerrainIcon from "@mui/icons-material/Terrain";
import MessageIcon from "@mui/icons-material/Message";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

const menuItems = [
  {
    id: 1007,
    title: "Dashboard",
    icon: "dashboard",
    children: [
      {
        id: 2005,
        title: "SuperAdmin Dashboard",
        icon: "dashboard",
        to: "/super-admin-dashboard",
      },
    ],
  },
  {
    id: 1,
    title: "Case Management",
    icon: "casemanagement",
    children: [{ id: 2006, title: "Cases", icon: "Cases", to: "/Cases" }],
  },
  {
    id: 3,
    title: "Client Management",
    icon: "clientmanagement",
    children: [
      {
        id: 2,
        title: "Corporate Clients",
        icon: "clients",
        to: "/corporate-clients",
      },
      {
        id: 1,
        title: "Individual Clients",
        icon: "Individualclients",
        to: "/individual-clients",
      },
    ],
  },
  {
    id: 5,
    title: "User Management",
    icon: "usermanagement",
    children: [{ id: 1, title: "Users", icon: "users", to: "/users" }],
  },
  {
    id: 1012,
    title: "Accounts and Finance Management",
    icon: "accountsandfinancemanagement",
    children: [
      {
        id: 2007,
        title: "Account Setups",
        icon: "Accounts",
        to: "/accounts-setups",
      },
    ],
  },
];

function getIconByName(iconName) {
  switch (iconName) {
    case "companymanagement":
      return <LocationCityIcon />;
    case "dashboard":
      return <DashboardIcon />;
    case "casemanagement":
      return <CasesIcon />;
    case "clientmanagement":
      return <PersonIcon />;
    case "usermanagement":
      return <Groups2Outlined />;
    case "rolemanagement":
      return <ViewModuleIcon />;
    case "accountsandfinancemanagement":
      return <ManageAccountsIcon />;
    case "clients":
      return <ReceiptOutlinedIcon />;
    case "Individualclients":
      return <PersonOutlinedIcon />;
    case "users":
      return <PeopleOutlinedIcon />;
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
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isButtonVisible, setButtonVisible] = useState(true);

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
          style={{
            margin: "10px",
            display: isSmallScreen ? "none" : "block",
            zIndex: isSmallScreen ? -1 : "auto",
          }}
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
                    src={`../..//M.png`}
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
            {menuItems.map((menuitem, i) => (
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
