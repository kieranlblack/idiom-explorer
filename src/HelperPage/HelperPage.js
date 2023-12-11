import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getIdiomInfo } from "../idioms";
import OptionsDisplay from "./OptionsDisplay";
import { SettingsContext } from "../context/SettingsContext";

const HelperPage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [endCharToConnected, setEndCharToConnected] = useState({});
  const [foundIdioms, setFoundIdioms] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const response = await fetch(settings.otherGraphData);
      const rawData = await response.json();

      const endCharToConnected = Object.fromEntries(rawData.nodes.map((node) => [[...node].slice(-1), []]));
      for (const [srcIdiom, dstIdiom] of rawData.edges) {
        const mappedArray = endCharToConnected[[...srcIdiom].slice(-1)];
        if (!mappedArray.includes(dstIdiom)) {
          mappedArray.push(dstIdiom);
        }
      }

      if (isSubscribed) {
        setEndCharToConnected(endCharToConnected);
        setLoaded(true);
      }
    };

    fetchData().catch(console.error);
    return () => {
      isSubscribed = false;
    };
  }, [settings.otherGraphData]);

  const handleInputChange = (event) => {
    setError(false);
    setInput(event.target.value);
  };

  const onClick = () => {
    if (!input) {
      return;
    }
    const targetChar = [...input].slice(-1);
    const matchingIdioms = endCharToConnected[targetChar] || [];
    const sortedIdioms = Array.from(matchingIdioms).sort((idiom) => -1 * getIdiomInfo(idiom).frequency);
    if (sortedIdioms.length === 0) {
      setError(true);
    }
    setFoundIdioms(sortedIdioms);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        onClick();
        break;
      default:
    }
  };

  return (
    <Stack spacing={1} style={{ flex: 1, textAlign: "center", alignItems: "center", display: "flex" }}>
      <Stack spacing={2} style={{ textAlign: "center", alignItems: "stretch" }}>
        <Typography>输入成语或者字看可以用什么把它接起来。</Typography>
        <TextField
          variant="outlined"
          placeholder="输入成语或者字"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button variant="outlined" onClick={onClick} disabled={!loaded}>
          启动！
        </Button>
      </Stack>
      {error && <Typography color="error">无法连接"{input}"</Typography>}
      <OptionsDisplay idioms={foundIdioms} />
    </Stack>
  );
};

export default HelperPage;
