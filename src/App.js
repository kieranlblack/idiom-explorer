import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import IdiomSearchGraphPage from "./IdiomSearchGraphPage";
import FullIdiomGraphPage from "./FullIdiomGraphPage";
import ShortestPathPage from "./ShortestPathPage";

const App = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Search Graph" />
          <Tab label="Full Graph" />
          <Tab label="Shortest Path" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IdiomSearchGraphPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FullIdiomGraphPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ShortestPathPage />
      </CustomTabPanel>
    </>
  );
};

export default App;
