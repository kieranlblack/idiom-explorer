import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Stack style={{display: "flex", alignItems: "center", flex: 1}}>
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Stack>
  );
};

export default Loading;
