import React, { useEffect, useState } from "react";

import MultiSelectTextInput from "./MultiSelectTextInput";

import ExpandableIdiomGraph from "./ExpandableIdiomGraph";

const App = () => {
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
    <>
      <MultiSelectTextInput onValueChange={setSelectedIdioms} defaultValue={defaultIdioms} />
      <ExpandableIdiomGraph graphData={graphData} forcedVisibleNodeIds={selectedIdioms} />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
