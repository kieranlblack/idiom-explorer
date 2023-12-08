import React, { useEffect, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import IdiomChain from "./IdiomChain";
import { findShortestPath } from "./idioms";
import Path from "./Path";

const ShortestPathPage = () => {
  const [startIdiom, setStartIdiom] = useState("");
  const [endIdiom, setEndIdiom] = useState("");
  const [rawGraphData, setRawGraphData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      //   const response = await fetch("/idiom_data/full_graph_data.json");
      const response = await fetch("/idiom_data/common_graph_data.json");
      const rawData = await response.json();

      if (isSubscribed) {
        setRawGraphData(rawData);
        setLoaded(true);
      }
    };

    fetchData().catch(console.error);
    return () => {
      isSubscribed = false;
    };
  }, []);

  const [shortestPath, setShortestPath] = useState([]);

  const onClick = () => {
    const newShortestPath = findShortestPath(startIdiom, endIdiom, rawGraphData);
    setShortestPath(newShortestPath);
  };

  return (
    <Stack spacing={2} textAlign="center">
      <Stack direction="row" alignItems="center" justifyContent="center">
        <TextField
          label="输入成语"
          variant="outlined"
          placeholder="输入成语"
          onChange={(event) => setStartIdiom(event.target.value)}
        />
        <IdiomChain length={3} />
        <TextField
          label="输入成语"
          variant="outlined"
          placeholder="输入成语"
          onChange={(event) => setEndIdiom(event.target.value)}
        />
      </Stack>

      <Button variant="outlined" onClick={onClick} disabled={!loaded} fullWidth={false}>
        启动！
      </Button>

      <Path path={shortestPath} />
    </Stack>
  );
};

export default ShortestPathPage;
