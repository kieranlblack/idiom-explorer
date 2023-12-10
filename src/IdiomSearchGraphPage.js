import React, { useContext, useEffect, useState } from "react";

import MultiSelectTextInput from "./MultiSelectTextInput";
import ExpandableGraph from "./ExpandableGraph";
import { Button, Stack, Typography } from "@mui/material";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { SettingsContext } from "./context/SettingsContext";
import Measure from "react-measure";

const IdiomSearchGraphPage = () => {
  const [allIdioms, setAllIdioms] = useState([]);
  const [graphData, setGraphData] = useState();
  const [loaded, setLoaded] = useState(false);

  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const response = await fetch(settings.searchGraphData);
      const rawData = await response.json();

      const data = {
        nodes: rawData.nodes.map((node) => ({ id: node })),
        links: rawData.edges.map(([srcIdiom, dstIdiom]) => ({
          source: srcIdiom,
          target: dstIdiom,
        })),
      };

      if (isSubscribed) {
        setAllIdioms(rawData.nodes);
        setGraphData(data);
        setLoaded(true);
      }
    };

    fetchData().catch(console.error);
    return () => {
      isSubscribed = false;
    };
  }, [settings.searchGraphData]);

  const [searchParams] = useSearchParams();
  const [selectedIdioms, setSelectedIdioms] = useState([]);

  useEffect(() => {
    const idioms = searchParams.getAll("idiom");
    if (idioms.length) {
      setSelectedIdioms(idioms);
    } else {
      setSelectedIdioms(["记忆犹新"]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (allIdioms.length === 0) {
      return;
    }

    for (const idiom of selectedIdioms) {
      if (!allIdioms.includes(idiom)) {
        toast.error(`"${idiom}" 不在图中`, { pauseOnHover: false, autoClose: 2500 });
      }
    }
  }, [allIdioms, selectedIdioms]);

  const setRandomIdiom = () => {
    const randomIdiom = allIdioms[Math.floor(Math.random() * allIdioms.length)];
    setSelectedIdioms([randomIdiom]);
  };

  const hideInfo = () => {
    setSettings((oldSettings) => ({ ...oldSettings, searchGraphInfoHidden: true }));
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  return loaded ? (
    <Stack spacing={1} style={{ flex: 1, display: "flex" }}>
      {!settings.searchGraphInfoHidden && (
        <div style={{ border: "1px dashed" }} onClick={hideInfo}>
          <Typography style={{ padding: 3 }}>
            点击顶点以探索图。如果起始顶点的最后一个字和结束顶点的第一个字相同，那么两个成语就通过一条有向边相连。<span style={{ color: "fuchsia" }}>粉色</span>
            的顶点属于接龙，<span style={{ color: "green" }}>绿色</span>表示还隐藏了边，
            <span style={{ color: "red" }}>红色</span>表示没有边，<span style={{ color: "orange" }}>橙色</span>
            表示被展开的。顶点的大小取决于成语的出现频率。点击关闭信息。
          </Typography>
        </div>
      )}
      <Stack spacing={2} direction={"row"} style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 0 }}>
          <Button variant="outlined" onClick={setRandomIdiom}>
            随机
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <MultiSelectTextInput value={selectedIdioms} setValue={setSelectedIdioms} placeholder="输入成语" />
        </div>
      </Stack>
      <Measure
        bounds
        onResize={(contentRect) => {
          setDimensions(contentRect.bounds);
        }}
      >
        {({ measureRef }) => (
          <div style={{ flex: 1 }} ref={measureRef}>
            {dimensions.width !== 0 && (
              <ExpandableGraph graphData={graphData} forcedVisibleNodeIds={selectedIdioms} size={dimensions} />
            )}
          </div>
        )}
      </Measure>
    </Stack>
  ) : (
    <Loading />
  );
};

export default IdiomSearchGraphPage;
