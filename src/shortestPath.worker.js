import { findShortestPath } from "./idioms";

export const worker_findShortestPath = (startIdiom, endIdiom, graphData, avoidRareIdioms) => {
  return findShortestPath(startIdiom, endIdiom, graphData, avoidRareIdioms);
};
