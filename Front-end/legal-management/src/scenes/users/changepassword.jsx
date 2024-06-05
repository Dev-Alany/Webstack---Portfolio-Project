// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import meinInSuits from "../../Assets/Images/MenInSuits.jpg";
// // import { CHANGE_PASSWORD } from "../../data/userData"; // Import your mutation
// import { useMutation } from "@apollo/client";
// import swal from "sweetalert";

// // Define a theme
// const defaultTheme = createTheme();

// // export default function ChangePasswordForm() {
// //   const navigate = useNavigate();

// // const [changePasswordMutation, { loading, error, data }] = useMutation(
// //   CHANGE_PASSWORD,
// //   {
// //     onCompleted: (data) => {
// //       // Handle successful password change
// //       swal.fire({
// //         title: "Success",
// //         text: "Password changed successfully!",
// //         icon: "success",
// //         confirmButtonText: "OK",
// //       }).then(() => {
// //         navigate("/super-admin-dashboard");
// //       });
// //     },
// //     onError: (error) => {
// //       // Handle password change errors
// //       swal.fire({
// //         title: "Error",
// //         text: "Password change failed. Please try again later.",
// //         icon: "error",
// //         confirmButtonText: "OK",
// //       });
// //       console.error("Password change failed:", error);
// //     },
// //   }
// // );

// const handleSubmit = async (event) => {

//   event.preventDefault();
//   const formData = new FormData(event.currentTarget);
//   const oldPassword = formData.get("oldPassword");
//   const password = formData.get("password");
//   const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
//   const username = decodedToken.Username;
//   try {
//     // Call the mutation with variables
//     await changePasswordMutation({
//       variables: {
//         identifier: username,
//         oldPassword,
//         password,
//       },
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     // Handle error
//   }
// };

// return (
//   <ThemeProvider theme={defaultTheme}>
//     <Grid container component="main" sx={{ height: "100vh" }}>
//       <CssBaseline />
//       <Grid
//         item
//         xs={false}
//         sm={4}
//         md={7}
//         sx={{
//           backgroundImage: `url(${meinInSuits})`,
//           backgroundRepeat: "no-repeat",
//           backgroundColor: (t) =>
//             t.palette.mode === "light"
//               ? t.palette.grey[50]
//               : t.palette.grey[900],
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       />
//       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <Box
//           sx={{
//             my: 8,
//             mx: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Change Password
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="oldPassword"
//               label="Old Password"
//               name="oldPassword"
//               type="password"
//               autoComplete="current-password"
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="New Password"
//               type="password"
//               id="password"
//               autoComplete="new-password"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={loading}
//             >
//               {loading ? "Changing Password..." : "Change Password"}
//             </Button>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   </ThemeProvider>
// );
// }
