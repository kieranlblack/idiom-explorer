import React, { useContext, useEffect, useState } from "react";

import FullGraph from "./FullGraph";
import { Button, Stack, Typography } from "@mui/material";
import Loading from "./Loading";
import { SettingsContext } from "./context/SettingsContext";
import Measure from "react-measure";

const FullIdiomGraphPage = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loaded, setLoaded] = useState(false);

  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const response = await fetch(settings.otherGraphData);
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
  }, [settings.otherGraphData]);

  const [confirmed, setConfirmed] = useState(false);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  return loaded ? (
    confirmed ? (
      <Measure
        bounds
        onResize={(contentRect) => {
          setDimensions(contentRect.bounds);
        }}
      >
        {({ measureRef }) => (
          <div style={{ flex: 1 }} ref={measureRef}>
            {dimensions.width !== 0 && <FullGraph graphData={graphData} size={dimensions} />}
          </div>
        )}
      </Measure>
    ) : (
      <Stack style={{ flex: 1, textAlign: "center", alignItems: "center", display: "flex" }}>
        <Stack style={{ textAlign: "center", alignItems: "stretch" }}>
          <Typography>你确定想要渲染吗？很可能会导致你的浏览器崩溃。</Typography>
          <Button variant="outlined" color="error" onClick={() => setConfirmed(true)}>
            我确定
          </Button>
        </Stack>
      </Stack>
    )
  ) : (
    <Loading />
  );
};

export default FullIdiomGraphPage;
