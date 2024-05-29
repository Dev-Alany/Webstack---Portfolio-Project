// src/hocs/withLayout.js
import React from "react";
import { Grid } from "@mui/material";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

const withLayout = (Component) => (props) =>
  (
    <Grid container>
      <Grid item>
        <Sidebar />
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid item>
            <Topbar />
          </Grid>
          <Grid item>
            <Component {...props} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

export default withLayout;
