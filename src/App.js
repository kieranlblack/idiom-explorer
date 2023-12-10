import React, { useState } from "react";
import { Box } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import IdiomSearchGraphPage from "./IdiomSearchGraphPage";
import FullIdiomGraphPage from "./FullIdiomGraphPage";
import ShortestPathPage from "./ShortestPathPage";

import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyTabs from "./MyTabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HelperPage from "./HelperPage/HelperPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import { SettingsContext } from "./context/SettingsContext";

const App = () => {
  const [settings, setSettings] = useState({
    searchGraphData: "/idiom_data/full_graph_data.json",
    otherGraphData: "/idiom_data/common_graph_data.json",
  });
  const value = { settings, setSettings };

  return (
    <SettingsContext.Provider value={value}>
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
            <Route
              path="/helper"
              element={
                <CustomTabPanel>
                  <HelperPage />
                </CustomTabPanel>
              }
            />
            <Route
              path="/settings"
              element={
                <CustomTabPanel>
                  <SettingsPage />
                </CustomTabPanel>
              }
            />
            <Route path="*" element={<Navigate to="/search_graph" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </SettingsContext.Provider>
  );
};

export default App;
