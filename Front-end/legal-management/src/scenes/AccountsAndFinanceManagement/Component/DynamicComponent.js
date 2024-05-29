import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
const DynamicCard = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Get the background color based on the current mode
  const bgColor = colors.primary[400];
  return (
    <Card sx={{ bgcolor: bgColor }}>
      <CardContent>
        <div className="col-xl-12">{children}</div>
      </CardContent>
    </Card>
  );
};

DynamicCard.propTypes = {
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DynamicCard;
