import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import IdiomChain from "./IdiomChain";
import { findShortestPath } from "./idioms";
import Path from "./Path";
import { Link, createSearchParams } from "react-router-dom";
import { SettingsContext } from "./context/SettingsContext";

const ShortestPathPage = () => {
  const [startIdiom, setStartIdiom] = useState("");
  const [endIdiom, setEndIdiom] = useState("");
  const [rawGraphData, setRawGraphData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const response = await fetch(settings.otherGraphData);
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
  }, [settings.otherGraphData]);

  const [avoidRareIdioms, setAvoidRareIdioms] = useState(true);

  const handleAvoidRareIdiomsChange = (event) => {
    setAvoidRareIdioms(event.target.checked);
  };
  const [shortestPath, setShortestPath] = useState([]);

  const onClick = () => {
    if (!startIdiom || !endIdiom) {
      return;
    }

    if (!rawGraphData.nodes.includes(startIdiom) || !rawGraphData.nodes.includes(endIdiom)) {
      setError(true);
      return;
    }

    const newShortestPath = findShortestPath(startIdiom, endIdiom, rawGraphData, avoidRareIdioms);
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
        <Typography>找出连接两个成语的最短路径。</Typography>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <TextField
            label="开头"
            variant="outlined"
            placeholder="输入成语"
            onKeyDown={handleKeyDown}
            onChange={(event) => setIdiom(event, setStartIdiom)}
          />
          <IdiomChain length={3} />
          <TextField
            label="结尾"
            variant="outlined"
            placeholder="输入成语"
            onKeyDown={handleKeyDown}
            onChange={(event) => setIdiom(event, setEndIdiom)}
          />
        </Stack>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={onClick} disabled={!loaded} style={{ flex: 1 }}>
            启动！
          </Button>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={avoidRareIdioms} onChange={handleAvoidRareIdiomsChange} />}
              label="避免生僻的成语"
            />
          </FormGroup>
        </Stack>
      </Stack>
      {error && (
        <Typography color="error">
          无法把"{startIdiom}"与"{endIdiom}"接起来
        </Typography>
      )}
      {shortestPath.length !== 0 && (
        <>
          <Stack spacing={3} direction="row" style={{alignItems: "center"}}>
            <Link
              to={{
                pathname: "/search_graph",
                search: createSearchParams(shortestPath.map((idiom) => ["idiom", idiom])).toString(),
              }}
            >
              <Button>点击去看在图里</Button>
            </Link>
            <Typography>接龙长度：{shortestPath.length}</Typography>
          </Stack>
          <Path path={shortestPath} />
        </>
      )}
    </Stack>
  );
};

export default ShortestPathPage;
