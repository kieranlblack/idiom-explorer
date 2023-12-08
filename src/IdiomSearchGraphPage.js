import React, { useEffect, useState } from "react";

import MultiSelectTextInput from "./MultiSelectTextInput";
import ExpandableGraph from "./ExpandableGraph";
import { Stack } from "@mui/material";

const IdiomSearchGraphPage = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const response = await fetch("/idiom_data/full_graph_data.json");
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

  const defaultIdioms = ["驾鹤西游"];
  const [selectedIdioms, setSelectedIdioms] = useState(defaultIdioms);

  return loaded ? (
    <Stack spacing={1} style={{ flex: 1, display: "flex" }}>
      <MultiSelectTextInput onValueChange={setSelectedIdioms} defaultValue={defaultIdioms} placeholder="输入成语" />
      <div style={{ flex: 1 }}>
        <ExpandableGraph graphData={graphData} forcedVisibleNodeIds={selectedIdioms} />
      </div>
    </Stack>
  ) : (
    <div>Loading...</div>
  );
};

export default IdiomSearchGraphPage;
