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
    sprite.backgroundColor = "black";
    sprite.borderWidth = 0.5;
    return sprite;
  };

  // const nodeCanvasObject = (node, ctx, globalScale) => {
  //   const label = node.id;
  //   const fontSize = 16 / globalScale;
  //   ctx.font = `${fontSize}px Sans-Serif`;
  //   const textWidth = ctx.measureText(label).width;
  //   const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2); // some padding

  //   ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  //   ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

  //   ctx.textAlign = "center";
  //   ctx.textBaseline = "middle";
  //   ctx.fillText(label, node.x, node.y);

  //   node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
  // };

  // const nodePointerAreaPaint = (node, color, ctx) => {
  //   ctx.fillStyle = color;
  //   const bckgDimensions = node.__bckgDimensions;
  //   bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
  // };

  // const getNodeLabel = (node) => {
  //   const idiomInfo = getIdiomInfo(node.id);
  //   return `拼音：${idiomInfo["pinyin"]}<br />解释：${idiomInfo["explanation"]}`;
  // };

  return (
    <SizeMe monitorHeight>
      {({ size }) => {
        console.log(size);
        return (
          <ForceGraph3D
            graphData={graphData}
            // nodeCanvasObject={nodeCanvasObject}
            nodeThreeObject={nodeRenderObject}
            // nodePointerAreaPaint={nodePointerAreaPaint}
            warmupTicks={100}
            nodeResolution={2}
            enablePointerInteraction={false}
            width={size.width || undefined}
            height={size.height || undefined}
          />
        );
      }}
    </SizeMe>
  );
};

export default FullGraph;
