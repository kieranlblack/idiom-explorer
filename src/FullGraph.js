import React from "react";

import { ForceGraph3D } from "react-force-graph";
import { SizeMe } from "react-sizeme";
// import { getIdiomInfo } from "./idioms";
import SpriteText from "three-spritetext";

const FullGraph = ({ graphData }) => {
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
    <SizeMe monitorHeight noPlaceholder>
      {({ size }) => (
        <ForceGraph3D
          graphData={graphData}
          nodeThreeObject={nodeRenderObject}
          warmupTicks={100}
          cooldownTicks={0}
          d3VelocityDecay={0.8}
          nodeResolution={2}
          enablePointerInteraction={false}
          width={size.width || 800}
          height={size.height || 800}
        />
      )}
    </SizeMe>
  );
};

export default FullGraph;
