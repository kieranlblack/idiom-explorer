import React from "react";
import { Box } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import IdiomSearchGraphPage from "./IdiomSearchGraphPage";
import FullIdiomGraphPage from "./FullIdiomGraphPage";
import ShortestPathPage from "./ShortestPathPage";

import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyTabs from "./MyTabs";

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <BrowserRouter>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <MyTabs />
        </Box>
        <Routes>
          <Route
            path="/search_graph"
            element={
              <CustomTabPanel>
                <IdiomSearchGraphPage />
              </CustomTabPanel>
            }
          />
          <Route
            path="/full_graph"
            element={
              <CustomTabPanel>
                <FullIdiomGraphPage />
              </CustomTabPanel>
            }
          />
          <Route
            path="/shortest_path"
            element={
              <CustomTabPanel>
                <ShortestPathPage />
              </CustomTabPanel>
            }
          />
          <Route path="*" element={<Navigate to="/search_graph" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
