import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AssignRightsForm from "./roleRights";

export default function AssignRight({ anchor, open, onClose, FormComponent }) {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          onClick: onClose, // Close the drawer when clicking outside of it
        },
      }}
    >
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
