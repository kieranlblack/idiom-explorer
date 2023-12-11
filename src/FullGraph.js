import React, { useEffect, useRef } from "react";

import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";

const FullGraph = ({ graphData, size }) => {
  const nodeRenderObject = (node) => {
    const sprite = new SpriteText(node.id);
    sprite.color = "green";
    sprite.textHeight = 4;
    sprite.padding = 0.5;
    sprite.fontSize = 30;
    // sprite.backgroundColor = "black";
    // sprite.borderWidth = 0.5;
    return sprite;
  };

  const forceGraphRef = useRef();

  useEffect(() => {
    if (!forceGraphRef.current) {
      return;
    }
    forceGraphRef.current.d3Force("charge").strength(-600);
  }, [forceGraphRef]);

  return (
    <ForceGraph3D
      ref={forceGraphRef}
      graphData={graphData}
      nodeThreeObject={nodeRenderObject}
      warmupTicks={150}
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
