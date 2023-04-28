import React from "react";
import Graphin, { GraphinContext } from "@antv/graphin";
// import { Grid } from '@antv/graphin-components';
// import "@antv/graphin/dist/index.css";
// import dagreLayout from '@antv/layout-dagre';

// const { MiniMap, Tooltip, ContextMenu,  } = Components;

function GptGrapin() {
    const data = {
        // 点集
        nodes: [
          {
            id: "node1",
            style: {
              keyshape: {
                size: 80,
                stroke: "red",
                fill: "red",
                fillOpacity: 0.2,
              },
              label: {
                value: "设置 \n keyshape",
              },
            },
          },
          {
            id: "node2",
            style: {
              label: { value: "node2" },
            },
          },
          {
            id: "node3",
            style: {
              label: { value: "node3" },
            },
          },
          {
            id: "node4",
            style: {
              label: { value: "node4" },
            },
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: "node1",
            target: "node2",
            style: {
              label: { value: "node1node2" },
            },
          },
          {
            source: "node1",
            target: "node3",
          },
          {
            source: "node4",
            target: "node2",
          },
        ],
      };

  const layout = {
    rankDir: "LR",
  };

  return <Graphin data={data} layout={{type: "grid"}}>

  </Graphin>;
}

export default GptGrapin;
