import React, { useEffect, useState } from "react";

import FullGraph from "./FullGraph";
import { Button, Typography } from "@mui/material";

const IdiomSearchGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      //   const response = await fetch("/idiom_data/full_graph_data.json");
      const response = await fetch("/idiom_data/common_graph_data.json");
      const rawData = await response.json();

      const data = {
        nodes: rawData.nodes.map((node) => ({ id: node })),
        links: rawData.edges.map(([src_idiom, dst_idiom]) => ({
          source: src_idiom,
          target: dst_idiom,
        })),
      };

      if (isSubscribed) {
        setGraphData(data);
        setLoaded(true);
      }
    };

    fetchData().catch(console.error);
    return () => {
      isSubscribed = false;
    };
  }, []);

  const [confirmed, setConfirmed] = useState(false);

  return confirmed ? (
    loaded ? (
      <FullGraph graphData={graphData} />
    ) : (
      <div>Loading...</div>
    )
  ) : (
    <>
      <Typography sx={{ textTransform: "capitalize" }}>
        Are you sure you want to render this? It will probably crash your browser unless you have an RTX 3000+ gen or
        equivalent gpu.
      </Typography>
      <Button variant="outlined" color="error" onClick={() => setConfirmed(true)}>
        确认
      </Button>
    </>
  );
};

export default IdiomSearchGraph;
