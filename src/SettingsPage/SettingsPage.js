import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

const SettingsPage = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const handleSearchGraphDataChange = (event) => {
    setSettings((oldSettings) => ({ ...oldSettings, searchGraphData: event.target.value }));
  };

  const handleOtherGraphDataChange = (event) => {
    setSettings((oldSettings) => ({ ...oldSettings, otherGraphData: event.target.value }));
  };

  return (
    <Stack spacing={2}>
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>搜索图用的数据集</InputLabel>
        <Select
          value={settings.searchGraphData}
          label="搜索图用的数据集"
          onChange={handleSearchGraphDataChange}
          style={{ width: "fit-content" }}
        >
          <MenuItem value={"/idiom_data/full_graph_data.json"}>所有的成语</MenuItem>
          <MenuItem value={"/idiom_data/common_graph_data.json"}>只有使用率比较高的成语</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>其他图用的数据集</InputLabel>
        <Select value={settings.otherGraphData} label="其他图用的数据集" onChange={handleOtherGraphDataChange}>
          <MenuItem value={"/idiom_data/full_graph_data.json"}>所有的成语</MenuItem>
          <MenuItem value={"/idiom_data/common_graph_data.json"}>只有使用率比较高的成语</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SettingsPage;
