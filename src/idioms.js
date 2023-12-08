import { find_path } from "dijkstrajs";
import idiomData from "./full_idioms.json";

const idiomLookup = Object.fromEntries(idiomData.map((idiom) => [idiom["word"], idiom]));
const allIdioms = idiomData.map((idiom) => idiom["word"]);

export const getIdiomInfo = (idiom) => {
  return idiomLookup[idiom];
};

export const findShortestPath = (startIdiom, endIdiom, graphData) => {
  const graph = Object.fromEntries(graphData.nodes.map((node) => [node, {}]));
  for (const [src, dst] of graphData.edges) {
    graph[src][dst] = 1;
  }

  try {
    return find_path(graph, startIdiom, endIdiom);
  } catch {}
  return [];
};

export const getRandomIdiom = () => {
  return allIdioms[Math.floor(Math.random() * allIdioms.length)];
};
