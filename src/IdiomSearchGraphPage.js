import React, { useEffect, useState } from "react";

import MultiSelectTextInput from "./MultiSelectTextInput";
import ExpandableGraph from "./ExpandableGraph";
import { Button, Stack } from "@mui/material";
import { getRandomIdiom } from "./idioms";
import Loading from "./Loading";
import { toast } from "react-toastify";

const IdiomSearchGraphPage = () => {
  const [allIdioms, setAllIdioms] = useState();
  const [graphData, setGraphData] = useState();
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
        setAllIdioms(new Set(rawData.nodes));
        setGraphData(data);
        setLoaded(true);
      }
    };

    fetchData().catch(console.error);
    return () => {
      isSubscribed = false;
    };
  }, []);

  const [selectedIdioms, setSelectedIdioms] = useState(["记忆犹新"]);

  useEffect(() => {
    if (!allIdioms) {
      return;
    }

    for (const idiom of selectedIdioms) {
      if (!allIdioms.has(idiom)) {
        toast.error(`"${idiom}" 不在图中`, { pauseOnHover: false, autoClose: 2500 });
      }
    }
  }, [allIdioms, selectedIdioms]);

  const setRandomIdiom = () => {
    const randomIdiom = getRandomIdiom();
    setSelectedIdioms((prev) => [...prev, randomIdiom]);
  };

  return (
    <>
      {loaded ? (
        <Stack spacing={1} style={{ flex: 1, display: "flex" }}>
          <Stack spacing={2} direction={"row"} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <MultiSelectTextInput value={selectedIdioms} setValue={setSelectedIdioms} placeholder="输入成语" />
            </div>
            <div style={{ flex: 0 }}>
              <Button variant="outlined" onClick={setRandomIdiom}>
                随机
              </Button>
            </div>
          </Stack>
          <div style={{ flex: 1 }}>
            <ExpandableGraph graphData={graphData} forcedVisibleNodeIds={selectedIdioms} />
          </div>
        </Stack>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default IdiomSearchGraphPage;
