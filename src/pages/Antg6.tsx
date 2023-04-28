import React, { useEffect, useRef } from "react";
import G6, { Util } from "@antv/g6";
import styled from "styled-components";
// import {
//   createNodeFromReact,
//   appenAutoShapeListener,
// } from "@antv/g6-react-node";
// import Card from "./Card";

// G6.registerNode("test", createNodeFromReact(Card));

const CanvasContainer = styled.div`
  width: 800px;
  height: 600px;
  border: 1px solid black;
  display: flex;

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const AntG6 = () => {
  const ref = useRef(null);
  let graph: any = null;

  // const data = {
  //   nodes: [
  //     {
  //       id: "node1",
  //       label: "1",
  //     },
  //     {
  //       id: "node2",
  //       label: "2",
  //     },
  //     {
  //       id: "node3", // node3 不属于任何 combo
  //       label: "3",
  //     },
  //   ],
  // };

  // const data2 = {
  //   nodes: [
  //     {
  //       id: "node1",
  //       label: "Node1",
  //       comboId: "rect_combo",
  //     },
  //     {
  //       id: "node2",
  //       label: "Node 2",
  //     },
  //   ],
  //   combos: [
  //     {
  //       id: "circle_combo",
  //       type: "circle",
  //       label: "Circle",
  //     },
  //     {
  //       id: "rect_combo",
  //       type: "rect",
  //       label: "Rect",
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   if (graph === null) {
  //     graph = new G6.Graph({
  //       container: ref.current!,
  //       modes: {
  //         default: ["drag-canvas", "drag-node", "zoom-canvas"],
  //         test: ["drag-canvas"],
  //       },
  //       defaultNode: {
  //         type: "circle",
  //         size: 50,
  //         style: {
  //           fill: "#bae637",
  //           stroke: "#eaff8f",
  //           lineWidth: 5,
  //         },
  //       },
  //       layout: {
  //         type: 'grid',
  //       },
  //       fitView: true,
  //     });
  //   }


  //   graph.setMode("default");

  //   graph.on("node:click", (ev: any) => {
  //     const node = ev.item;
  //     console.log("ttrrrrrrttt");

  //     graph.changeData(data2);
  //   });

  //   appenAutoShapeListener(graph); // 对节点绑定的事件（点击等）进行监听

  //   graph.read(data);
  // });

  return <CanvasContainer ref={ref} />;
};

export default AntG6;
