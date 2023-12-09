import React, { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import IdiomChain from "./IdiomChain";
import { findShortestPath } from "./idioms";
import Path from "./Path";
import { Link, createSearchParams } from "react-router-dom";

const ShortestPathPage = () => {
  const [startIdiom, setStartIdiom] = useState("");
  const [endIdiom, setEndIdiom] = useState("");
  const [rawGraphData, setRawGraphData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

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
    if (!startIdiom || !endIdiom) {
      return;
    }

    if (!rawGraphData.nodes.includes(startIdiom) || !rawGraphData.nodes.includes(endIdiom)) {
      setError(true);
      return;
    }

    const newShortestPath = findShortestPath(startIdiom, endIdiom, rawGraphData);
    if (!newShortestPath.length) {
      setError(true);
      return;
    }
    setShortestPath(newShortestPath);
  };

  const setIdiom = (event, setter) => {
    setError(false);
    setShortestPath([]);
    setter(event.target.value);
  };

  return (
    <Stack spacing={2} style={{ flex: 1, textAlign: "center" }}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <TextField
          label="开头"
          variant="outlined"
          placeholder="输入成语"
          onChange={(event) => setIdiom(event, setStartIdiom)}
        />
        <IdiomChain length={3} />
        <TextField
          label="结尾"
          variant="outlined"
          placeholder="输入成语"
          onChange={(event) => setIdiom(event, setEndIdiom)}
        />
      </Stack>
      <Button variant="outlined" onClick={onClick} disabled={!loaded}>
        启动！
      </Button>
      {error && (
        <Typography color="error">
          无法把"{startIdiom}"与"{endIdiom}"接起来
        </Typography>
      )}
      {shortestPath.length !== 0 && (
        <Link
          to={{
            pathname: "/search_graph",
            search: createSearchParams(shortestPath.map((idiom) => ["idiom", idiom])).toString(),
          }}
        >
          <Button>
            点击去看在图里
          </Button>
        </Link>
      )}
      <Path path={shortestPath} />
    </Stack>
  );
};

export default ShortestPathPage;
