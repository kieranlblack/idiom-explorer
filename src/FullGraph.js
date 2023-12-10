import React from "react";

import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";

const FullGraph = ({ graphData, size }) => {
  const nodeRenderObject = (node) => {
    const sprite = new SpriteText(node.id);
    sprite.color = "green";
    sprite.textHeight = 4;
    sprite.padding = 0.5;
    // sprite.backgroundColor = "black";
    // sprite.borderWidth = 0.5;
    return sprite;
  };

  return (
    <ForceGraph3D
      graphData={graphData}
      nodeThreeObject={nodeRenderObject}
      warmupTicks={100}
      cooldownTicks={0}
      d3VelocityDecay={0.8}
      nodeResolution={2}
      enablePointerInteraction={false}
      width={size.width}
      height={size.height}
    />
  );
};

export default FullGraph;
