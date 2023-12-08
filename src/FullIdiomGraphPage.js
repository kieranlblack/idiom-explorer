import React, { useEffect, useState } from "react";

import FullGraph from "./FullGraph";
import { Button, Stack, Typography } from "@mui/material";
import Loading from "./Loading";

const FullIdiomGraphPage = () => {
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
      <div style={{ flex: 1 }}>
        <FullGraph graphData={graphData} />
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <Stack style={{ flex: 1, textAlign: "center" }}>
      <Typography>
        你确定想要渲染吗？除非你的电脑配备了RTX 30或等效的显卡系列，否则很可能会导致你的浏览器崩溃。
      </Typography>
      <Button variant="outlined" color="error" onClick={() => setConfirmed(true)}>
        我确定
      </Button>
    </Stack>
  );
};

export default FullIdiomGraphPage;
