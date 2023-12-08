import React, { useCallback, useState, useMemo, useEffect } from "react";

import { ForceGraph2D } from "react-force-graph";
import { getIdiomInfo } from "./idioms";
// import SpriteText from "three-spritetext";

const ExpandableGraph = ({ graphData, forcedVisibleNodeIds }) => {
  const nodeIdToNode = useMemo(() => {
    const nodeIdToNode = Object.fromEntries(graphData.nodes.map((node) => [node.id, node]));

    for (const node of graphData.nodes) {
      node.collapsed = !forcedVisibleNodeIds.includes(node.id);
      node.outEdges = [];
    }

    for (const edge of graphData.links) {
      const sourceNode = typeof edge.source === "object" ? edge.source : nodeIdToNode[edge.source];
      sourceNode.outEdges.push(edge);
    }

    return nodeIdToNode;
  }, [graphData, forcedVisibleNodeIds]);

  const getPrunedGraphData = useCallback(() => {
    if (!Object.keys(nodeIdToNode).length) {
      return;
    }

    const nodeToObject = (node) => (typeof node === "object" ? node : nodeIdToNode[node]);

    const visibleNodes = new Set();

    const visited = new Set();
    const queue = [...forcedVisibleNodeIds.map((nodeId) => nodeIdToNode[nodeId])];
    // dfs to discover all nodes which should be displayed
    while (queue.length > 0) {
      const currNode = queue.pop();
      if (visited.has(currNode)) {
        continue;
      }

      visited.add(currNode);
      visibleNodes.add(currNode);

      if (currNode.collapsed) {
        continue;
      }

      for (const outEdge of currNode.outEdges) {
        queue.push(nodeToObject(outEdge.target));
      }
    }

    // compute the edges which need to be displayed
    const visibleEdges = [];
    for (const node of visibleNodes) {
      for (const edge of node.outEdges) {
        if (visibleNodes.has(nodeToObject(edge.target))) {
          visibleEdges.push(edge);
        }
      }
    }

    return { nodes: Array.from(visibleNodes), links: visibleEdges };
  }, [nodeIdToNode, forcedVisibleNodeIds]);

  const [prunedGraphData, setPrunedGraphData] = useState(getPrunedGraphData());

  const handleNodeClick = useCallback(
    (node) => {
      if (forcedVisibleNodeIds.includes(node.id)) {
        return;
      }
      node.collapsed = !node.collapsed;
      if (!node.outEdges.length) {
        return;
      }
      setPrunedGraphData(getPrunedGraphData());
    },
    [forcedVisibleNodeIds, getPrunedGraphData]
  );

  useEffect(() => {
    setPrunedGraphData(getPrunedGraphData());
  }, [forcedVisibleNodeIds, getPrunedGraphData]);

  // const nodeRenderObject = (node) => {
  //   const sprite = new SpriteText(node.id);
  //   sprite.color = !node.outEdges.length ? "red" : node.collapsed ? "green" : "yellow";
  //   sprite.textHeight = 4;
  //   sprite.padding = 0.5;
  //   sprite.backgroundColor = "black";
  //   sprite.borderWidth = 0.5;
  //   return sprite;
  // };

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.id;
    const fontSize = 16 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2); // some padding

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = !node.outEdges.length ? "red" : node.collapsed ? "green" : "orange";
    ctx.fillText(label, node.x, node.y);

    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
  };

  const nodePointerAreaPaint = (node, color, ctx) => {
    ctx.fillStyle = color;
    const bckgDimensions = node.__bckgDimensions;
    bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
  };

  const getNodeLabel = (node) => {
    const idiomInfo = getIdiomInfo(node.id);
    return idiomInfo["pinyin"];
  }

  return (
    // <ForceGraph3D
    //   graphData={prunedGraphData}
    //   nodeThreeObject={nodeRenderObject}
    //   linkDirectionalParticles={1}
    //   onNodeClick={handleNodeClick}
    //   enableNodeDrag={false}
    // />
    <ForceGraph2D
      graphData={prunedGraphData}
      nodeCanvasObject={nodeCanvasObject}
      nodePointerAreaPaint={nodePointerAreaPaint}
      linkDirectionalParticles={1}
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      nodeLabel={getNodeLabel}
      onNodeClick={handleNodeClick}
      enableNodeDrag={false}
    />
  );
};

export default ExpandableGraph;
