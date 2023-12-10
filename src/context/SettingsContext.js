import { createContext } from "react";

export const SettingsContext = createContext({
  settings: {
    searchGraphData: "/idiom_data/full_graph_data.json",
    otherGraphData: "/idiom_data/common_graph_data.json",
    searchGraphInfoHidden: false,
  },
  setSettings: (settings) => {},
});
