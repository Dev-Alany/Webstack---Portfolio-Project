import { useEffect, useState, useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Modal,
  Typography,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsModeOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
  ]); // Initialize items with your array of items
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = () => {
    // Filter the items based on the search text
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // You can now use the filteredItems for further processing
    console.log("Search results:", filteredItems);
  };

  const handleOpen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data");
      setUser(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Box display="flex" justifyContent={isSmallScreen ? "space-evenly" : "space-between"} p={2}>
      <Box display="flex" backgroundColor={colors.grey[800]} borderRadius="3px">
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <NotificationsModeOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleOpen}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            bgcolor: `${colors.greenAccent[400]}`,
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            height:'100vh',
          }}
        >
          <Typography variant="h6" component="h2">
            User Details
          </Typography>
          {user ? (
            <>
              <Typography sx={{ mt: 2, variant:'h2'}}>
                <strong>Username:</strong> {user.Username}
              </Typography>
              <Typography sx={{ mt: 2 , color:colors.grey[100]}}>
                <strong>Email:</strong> {user.User_email}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>First Name:</strong> {user.First_name}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Last Name:</strong> {user.Last_name}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Status:</strong> {user.status}
              </Typography>
            </>
          ) : (
            <Typography sx={{ mt: 2 }}>
              Loading user details...
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Topbar;