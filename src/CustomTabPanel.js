import React from "react";
import { Box } from "@mui/material";

const CustomTabPanel = ({ children, ...other }) => (
  <div style={{ display: "flex", flexDirection: "column", flex: 1 }} {...other}>
    <Box sx={{ p: 2, flex: 1, display: "flex" }}>{children}</Box>
  </div>
);

export default CustomTabPanel;
