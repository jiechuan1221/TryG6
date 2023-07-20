import React, { Fragment } from "react";
import G6 from "@antv/g6";

const data2 = {
  // 点集
  nodes: [
    {
      id: "node1",
      label: "node1你好",
    },
    {
      id: "node2",
      label: "node2",
      style: {
        fill: "pink",
        stroke: "red",
      },
      labelCfg: {
        position: "bottom",
      },
      size: 50,
    },
    {
      id: "node3",
      label: "node3",
    },
    {
      id: "node4",
      label: "node4",
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: "node2",
      target: "node1",
    },
    {
      source: "node2",
      target: "node3",
    },
    {
      source: "node3",
      target: "node4",
    },
  ],
};

// 尝试配置工具栏工具，并暴露出去
export const getContextMenu = () =>
  new G6.Menu({
    getContent(evt: any) {
      let header;
      if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
        header = "Canvas ContextMenu";
      } else if (evt.item) {
        const itemType = evt.item.getType();
        header = `${itemType.toUpperCase()} ContextMenu`;
      }
      return `
        <h3>${header}</h3>
        <ul>
          <li title='1'>li 1</li>
          <li title='2'>li 2</li>
          <li>li 3</li>
          <li>li 4</li>
          <li>li 5</li>
        </ul>`;
    },
    handleMenuClick: (target, item) => {
      console.log(target, item);
    },
    // offsetX and offsetY include the padding of the parent container
    // 需要加上父级容器的 padding-left 16 与自身偏移量 10
    offsetX: 16 + 10,
    // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
    offsetY: 0,
    // the types of items that allow the menu show up
    // 在哪些类型的元素上响应
    itemTypes: ["node", "edge", "canvas"],
  });
export const getMiniMap = () => new G6.Minimap();
export const getToolBar = () => new G6.ToolBar({ container: "toolBar" });
export const getToolbar = () =>
  new G6.ToolBar({
    container: "toolBar",
    getContent: () => {
      return `
        <ul>
            <li code='addEdge'>新增线</li>
            <li code='shift' title='请按住"shift"键进行节点圈选'>sft</li>
            <li code='delEdge'>删除线</li>
            <li code='changeEdge'>改变线样式</li>
            <li code='addNodeTag'>节点打标</li>
        </ul>`;
    },
    handleClick: (code, graph) => {
      if (code === "addEdge") {
        graph.setMode("addEdge");
      } else if (code === "delEdge") {
        graph.setMode("delEdge");
      } else if (code === "changeEdge") {
        graph.setMode("changeEdge");
      } else if (code === "addNodeTag") {
        graph.setMode("addNodeTag");
      } else {
        // 其他操作保持默认不变
        getToolbar().handleDefaultOperator(code);
      }
    },
  });

const DefaultGraphCfg = {

  defaultNode: {
    type: "circle",
    size: 40,
    style: {
      fill: "steelBlue",
      stroke: "blue",
      shadowColor: "black",
      shadowBlur: 20
    },
    labelCfg: {
      position: "bottom",
      style: {
        fill: "black",
        fontFamily: "KaiTi",
      },
    },
    
  },
  defaultEdge: {
    style: {
      opacity: 0.8,
      stroke: "grey",
      endArrow: { path: G6.Arrow.triangle(6, 8), fill: "lightGrey" },
    },
    // labelCfg: {
    //   autoRotate: true,
    // },
    labelCfg: {
        autoRotate: true,
        style: {
        fill: "#1890ff",
        fontSize: 10,
        background: {
          fill: "#ffffff",
          // stroke: "#9EC9FF",
          padding: [2, 2, 2, 2],
          radius: 2,
        },
        fontFamily: "Italic",
      },
    },
  },
  nodeStateStyles: {
    hover: {
      fill: "lightsteelblue",
      cursor: "pointer",
    },
    click: {
      stroke: "#000",
      lineWidth: 3,
    },
    selected: {
      stroke: "#bfc",
      lineWidth: 2,
    },
    active: {
      fillOpacity: 0.8,
      strokeOpacity: 0.8,
    },
  },
  edgeStateStyles: {
    hover: {
      cursor: "pointer",
    },
    click: {
      stroke: "steelblue",
    },
    selected: {
      stroke: "#bfc",
      lineWidth: 1,
      shadowBlur: 2,
    },
    active: {
      stroke: "#6f9fff",
      lineWidth: 1,
      shadowBlur: 2,
    },
  },
  modes: {
    default: [
      "drag-node",
      // "drag-canvas",
      // "zoom-canvas",
      "select-node",
      "lasso-select",
    ],
    dragCanvas: ['drag-canvas'],
    // addEdge: ["click-add-edge", "click-select"],
    // delEdge: ["click-del-edge", "drag-node", "zoom-canvas"],
    // changeEdge: ["click-change-edge", "drag-node", "zoom-canvas"],
    // addNodeTag: ['click-add-nodeTag', 'drag-node', 'zoom-canvas']
  },
  layout: {
    type: "forceAtlas2",
    preventOverlap: true,
    linkDistance: 300,
  },
  animate: true,
  //   配置工具toolBar的时候用于回退和重做的操作
  enabledStack: true,
  //   监听一组节点跟随移动，开启多选模式
  multiple: true,
  fitCenter: false,
  // type: "comboCombined",
  //   preventOverlap: true,
  //   linkDistance: 30,
  //   outerLayout: new G6.Layout['grid']({}),
  //   innerLayout: new G6.Layout['forceAtlas2']({
  //     preset: 'radial',
  //     linkDistance: 40,
  //     nodeStrength: 30,    
  //     edgeStrength: 0.1, 
  //     dissuadeHubs: true,
  //     preventOverlap: true
  //   })
};

export default DefaultGraphCfg;
