import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

export default function AnchorTemporaryDrawer({
  anchor,
  open,
  onClose,
  FormComponent,
}) {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box
        sx={{
          width:
            anchor === "top" || anchor === "bottom" || anchor === "bottom"
              ? "auto"
              : 600,
        }}
        role="presentation"
      >
        <FormComponent />
      </Box>
    </Drawer>
  );
}
