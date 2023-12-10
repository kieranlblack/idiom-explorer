import { Tab, Tabs } from "@mui/material";
import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

const MyTabs = () => {
  const useRouteMatch = (patterns) => {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i];
      const possibleMatch = matchPath(pattern, pathname);
      if (possibleMatch !== null) {
        return possibleMatch;
      }
    }

    return null;
  };

  const routeMatch = useRouteMatch(["/search_graph", "/full_graph", "/shortest_path", "/helper", "/settings"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab || false}>
      <Tab label="搜索图" value="/search_graph" component={Link} to={"/search_graph"} />
      <Tab label="整个图" value="/full_graph" component={Link} to={"/full_graph"} />
      <Tab label="最短路径" value="/shortest_path" component={Link} to={"/shortest_path"} />
      <Tab label="接龙助手" value="/helper" component={Link} to={"/helper"} />
      <Tab label="设置" value="/settings" component={Link} to={"/settings"} />
    </Tabs>
  );
};

export default MyTabs;
