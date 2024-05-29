import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners"; // Importing the loader
import meinInSuits from "../../Assets/Images/MenInSuits.jpg";
import { jwtDecode } from "jwt-decode";
import { loginCallApi } from "../../data/userData";
import swal from "sweetalert";

function saveTokenToStorage(decodedToken) {
  localStorage.setItem("decodedToken", JSON.stringify(decodedToken)); // Example: Using local storage
}
async function saveDataToLocalStorage(response) {
  const token = response.data.token;
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("rights", JSON.stringify(response.data.rights));
  const decodedToken = jwtDecode(token);
  saveTokenToStorage(decodedToken);
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sheria Pro
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide({ onLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false); // Adding a loading state
  // const handleSubmit = async (event) => {
  //   navigate("/teams");
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = "devalanyi"; //formData.get("email");
    const HashedPassword = "Nigri01"; //formData.get("HashedPassword");

    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await loginCallApi(username, HashedPassword);
      if (response === "ERR_NETWORK") {
        throw new Error(
          "Network error. Please check your internet connection and try again!"
        );
      }
      if (response === "ERR_BAD_RESPONSE" || response === "ERR_BAD_REQUEST") {
        swal("Error!", "Invalid credentials, Kindly check your username or password", "error");
      }
      if (response.status === 200) {
        if (response.data.changepassword === 1) {
          navigate("/changepassword");
          return;
        }
        else {
          // const token = response.data.token;
          // localStorage.setItem("token", JSON.stringify(token));
          // localStorage.setItem("rights", JSON.stringify(response.data.rights));// Assuming the token is in response.data
          // const decodedToken = jwtDecode(token);
          // saveTokenToStorage(decodedToken);
          // onLogin();
          // navigate("/super-admin-dashboard");
           saveDataToLocalStorage(response)
          .then(() => {
            onLogin();
            navigate("/super-admin-dashboard");
          })
          .catch(error => {
            console.error("Login error: ", error);
            // Handle the error (e.g., show a message to the user)
          });
                  
        }
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      setLoading(false); // Set loading to false when the request is finished
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <PulseLoader size={15} color={"#3f51b5"} />
        </Box>
      )}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${meinInSuits})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="HashedPassword"
                label="Password"
                type="password"
                id="HashedPassword"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading} // Disable the button while loading
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
