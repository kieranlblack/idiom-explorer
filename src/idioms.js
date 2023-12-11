import { find_path } from "dijkstrajs";
import idiomData from "./full_idioms.json";

const idiomLookup = Object.fromEntries(idiomData.map((idiom) => [idiom["word"], idiom]));

export const getIdiomInfo = (idiom) => {
  return idiomLookup[idiom];
};

export const weightFunction = (frequency) => {
  if (frequency === 0) {
    return 1 / 1e-15;
  }
  if (frequency < 1e-4) {
    return 1 / frequency;
  }
  return 1;
};

export const findShortestPath = (startIdiom, endIdiom, graphData) => {
  const graph = Object.fromEntries(graphData.nodes.map((node) => [node, {}]));
  for (const [src, dst] of graphData.edges) {
    graph[src][dst] = weightFunction(getIdiomInfo(dst).frequency);
  }

  try {
    return find_path(graph, startIdiom, endIdiom);
  } catch {}
  return [];
};
