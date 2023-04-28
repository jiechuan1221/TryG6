import React, { Fragment, useEffect, useRef } from "react";
import G6, { IEdge, IEvent, INode, Item } from "@antv/g6";
import DefaultGraphCfg, {
  getContextMenu,
  getMiniMap,
  getToolbar,
  getToolBar,
} from "./defaultGraphCfg";
import styled from "styled-components";

const G6Container = styled.div`
  position: relative;
  margin: 50px;
  div {
    canvas {
      border: 1px solid lightBlue;
    }
  }
  .toolBar {
    position: absolute;
    width: 800px;
    background-color: white;
    border: 1px solid lightBlue;
    display: flex;
    ul {
      position: relative;
      border: none;
      display: flex;
      padding-left: 0;
      li {
        width: auto;
        margin-left: 10px;
        font-size: 15px;
      }
    }
  }
`;

const GptG6 = () => {
  const ref = useRef(null);
  const data1 = {
    nodes: [
      { id: "0", label: "n0", class: "c0", x: 1000, y: -100 },
      { id: "1", label: "n1", class: "c0", x: 300, y: -10 },
      { id: "2", label: "n2", class: "c0", x: 10, y: 10 },
      { id: "3", label: "n3", class: "c0", x: 320, y: -100 },
      { id: "4", label: "n4", class: "c0", x: 100, y: 900 },
      { id: "5", label: "n5", class: "c0", x: 120, y: 213 },
      { id: "6", label: "n6", class: "c1", x: 543, y: 12 },
      { id: "7", label: "n7", class: "c1", x: 543, y: -100 },
      { id: "8", label: "n8", class: "c1", x: 1, y: 0 },
      { id: "9", label: "n9", class: "c1", x: 0, y: -222 },
      { id: "10", label: "n10", class: "c1", x: 435, y: 69 },
      { id: "11", label: "n11", class: "c1", x: 23, y: 10 },
      { id: "12", label: "n12", class: "c1", x: -129, y: 39 },
      { id: "13", label: "n13", class: "c2", x: 234, y: 843 },
      { id: "14", label: "n14", class: "c2", x: -301, y: 129 },
      { id: "15", label: "n15", class: "c2", x: -20, y: -76 },
      { id: "16", label: "n16", class: "c2", x: 1220, y: -34 },
      { id: "17", label: "n17", class: "c2", x: -10, y: 954 },
      { id: "18", label: "n18", class: "c2", x: 492, y: 123 },
      { id: "19", label: "n19", class: "c2", x: 123, y: -241 },
    ],
    edges: [
      { source: "0", target: "1", label: "e0-1", weight: 1 },
      { source: "0", target: "1", label: "e0-1", weight: 1 },
      { source: "0", target: "2", label: "e0-2", weight: 2 },
      { source: "0", target: "3", label: "e0-3", weight: 3 },
      { source: "0", target: "4", label: "e0-4", weight: 1.4 },
      { source: "0", target: "5", label: "e0-5", weight: 2 },
      { source: "0", target: "7", label: "e0-7", weight: 2 },
      { source: "0", target: "8", label: "e0-8", weight: 2 },
      { source: "0", target: "9", label: "e0-9", weight: 1.3 },
      { source: "0", target: "10", label: "e0-10", weight: 1.5 },
      { source: "0", target: "11", label: "e0-11", weight: 1 },
      { source: "0", target: "13", label: "e0-13", weight: 10 },
      { source: "0", target: "14", label: "e0-14", weight: 2 },
      { source: "0", target: "15", label: "e0-15", weight: 0.5 },
      { source: "0", target: "16", label: "e0-16", weight: 0.8 },
      { source: "2", target: "3", label: "e2-3", weight: 1 },
      { source: "4", target: "5", label: "e4-5", weight: 1.4 },
      { source: "4", target: "6", label: "e4-6", weight: 2.1 },
      { source: "5", target: "6", label: "e5-6", weight: 1.9 },
      { source: "7", target: "13", label: "e7-13", weight: 0.5 },
      { source: "8", target: "14", label: "e8-14", weight: 0.8 },
      { source: "9", target: "10", label: "e9-10", weight: 0.2 },
      { source: "10", target: "14", label: "e10-14", weight: 1 },
      { source: "10", target: "12", label: "e10-12", weight: 1.2 },
      { source: "11", target: "14", label: "e11-14", weight: 1.2 },
      { source: "12", target: "13", label: "e12-13", weight: 2.1 },
      { source: "16", target: "17", label: "e16-17", weight: 2.5 },
      { source: "16", target: "18", label: "e16-18", weight: 3 },
      { source: "17", target: "18", label: "e17-18", weight: 2.6 },
      { source: "18", target: "19", label: "e18-19", weight: 1.6 },
    ],
  };

  useEffect(() => {
    const ContextMenu = getContextMenu();
    const miniMap = getMiniMap();
    const ToolBar = getToolBar();
    const Toolbar = getToolbar();

    G6.Util.processParallelEdges(data1.edges);

    const graph = new G6.Graph({
      container: ref.current!,
      ...DefaultGraphCfg,
      plugins: [miniMap, ToolBar, Toolbar, ContextMenu],
    });

    graph.data(data1);

    G6.registerBehavior("click-add-edge", {
      // Set the events and the corresponding responsing function for this behavior
      getEvents() {
        return {
          "node:click": "onClick", // The event is canvas:click, the responsing function is onClick
          mousemove: "onMousemove", // The event is mousemove, the responsing function is onMousemove
          "edge:click": "onEdgeClick", // The event is edge:click, the responsing function is onEdgeClick
        };
      },
      // The responsing function for node:click defined in getEvents
      onClick(ev: IEvent) {
        const self = this;
        const node = ev.item as any;
        const graph = self.graph as any;
        // The position where the mouse clicks
        const point = { x: ev.x, y: ev.y };
        const model = node.getModel();
        if (self.addingEdge && self.edge) {
          graph.updateItem(self.edge, {
            target: model.id,
          });

          self.edge = null;
          self.addingEdge = false;
          graph.setMode("default");
        } else {
          // Add anew edge, the end node is the current node user clicks
          self.edge = graph.addItem("edge", {
            source: model.id,
            target: model.id,
          });
          self.addingEdge = true;
        }
      },
      // The responsing function for mousemove defined in getEvents
      onMousemove(ev: IEvent) {
        const self = this;
        // The current position the mouse clicks
        const point = { x: ev.x, y: ev.y };
        if (self.addingEdge && self.edge) {
          // Update the end node to the current node the mouse clicks
          (self.graph as any).updateItem(self.edge, {
            target: point,
          });
        }
      },
      // The responsing function for edge:click defined in getEvents
      onEdgeClick(ev: IEvent) {
        const self = this;
        const currentEdge = ev.item;
        if (self.addingEdge && self.edge === currentEdge) {
          (self.graph as any).removeItem(self.edge);
          self.edge = null;
          self.addingEdge = false;
        }
      },
    });
    // 用于清除所有状态
    const clearAllStates = () => {
      graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
      });
      graph.getEdges().forEach(function (edge) {
        graph.clearItemStates(edge);
      });
      graph.paint();
      graph.setAutoPaint(true);
    };
    // 监听鼠标左击画布，清除边和节点的所有状态
    graph.on("canvas:click", () => {
      clearAllStates();
      // graph.off("click-add-edge")
      graph.setMode("default");
    });
    // 监听鼠标进入节点
    graph.on("node:mouseenter", (e) => {
      const nodeItem = e.item!;
      // 设置目标节点的 hover 状态 为 true
      graph.setItemState(nodeItem, "hover", true);
    });
    // 监听鼠标离开节点
    graph.on("node:mouseleave", (e) => {
      const nodeItem = e.item!;
      // 设置目标节点的 hover 状态 false
      graph.setItemState(nodeItem, "hover", false);
    });
    // 监听鼠标点击节点
    graph.on("node:click", (e) => {
      clearAllStates();
      //   设置当前节点状态为被选中
      const { item } = e;
      const itemId = item!.get("id");
      graph.setItemState(itemId, "selected", true);

      // 遍历与当前节点相连的所有节点 并设置高亮状态
      const edges = item?._cfg?.edges;
      edges.forEach((edge: IEdge) => {
        const target = edge.getTarget();
        const source = edge.getSource();
        if (target.get("id") !== itemId) {
          graph.setItemState(target.get("id"), "active", true);
        }
        if (source.get("id") !== itemId) {
          graph.setItemState(source.get("id"), "active", true);
        }
        graph.setItemState(edge, "active", true);
      });
    });
    // 监听鼠标拖拽节点
    // graph.on("node:dragstart", (evt) => {
    //   if (evt.item?.getStates()[0] === "selected") {
    //     // 如果点击则拖拽一组节点
    //     const node = evt.item as INode;
    //     const originX = evt.canvasX;
    //     const originY = evt.canvasY;

    //     // 获取相关节点
    //     const getRelatedNodes = (node: INode) => {
    //       const edges = node?._cfg?.edges;
    //       const dragNodes: INode[] = [];
    //       edges.forEach((edge: IEdge) => {
    //         const target = edge.getTarget();
    //         const source = edge.getSource();
    //         if (target.get("id") !== node.get("id")) {
    //           dragNodes.push(graph.findById(target.get("id")) as INode);
    //         }
    //         if (source.get("id") !== node.get("id")) {
    //           dragNodes.push(graph.findById(source.get("id")) as INode);
    //         }
    //       });
    //       return dragNodes;
    //     };
    //     const relatedNodes = getRelatedNodes(node);
    //     graph.set("relatedNodes", relatedNodes);
    //     graph.set("relatedEdges", false);

    //     // 拖拽时，相关节点跟随移动
    //     graph.on("node:drag", (evt) => {
    //       const relatedNodes = graph.get("relatedNodes");
    //       relatedNodes.forEach((rnode: INode) => {
    //         const x = rnode.getCanvasBBox().x + evt.clientX - originX;
    //         const y = rnode.getCanvasBBox().y + evt.clientY - originY;
    //         graph.updateItem(rnode, { x: x, y: y });
    //         graph.set("relatedEdges", true);
    //       });
    //       // 设置与该节点相关的所有边也需要跟随移动
    //     });
    //     graph.on("afterupdate", () => {
    //       const relatedEdges = graph.get("relatedEdges");
    //       if (relatedEdges) {
    //         // 遍历所有边并重新设置起点和终点的位置
    //         const edges = graph.getEdges();
    //         edges.forEach((e) => {
    //           const source = e.getSource();
    //           const target = e.getTarget();
    //           if (
    //             relatedNodes.includes(source) ||
    //             relatedNodes.includes(target)
    //           ) {
    //             const sourceModel = source.getModel();
    //             const targetModel = target.getModel();
    //             graph.updateItem(e, {
    //               source: {
    //                 x: sourceModel.x,
    //                 y: sourceModel.y,
    //               },
    //               target: {
    //                 x: targetModel.x,
    //                 y: targetModel.y,
    //               },
    //             });
    //           }
    //         });
    //         // 重置 relatedEdges
    //         graph.set("relatedEdges", false);
    //       }
    //     });
    //     // graph.on("node:dragend", () => {
    //     //   graph.off("node:drag");
    //     // });
    //   }
    // });

    // 监听鼠标点击边
    graph.on("edge:click", (e) => {
      const clickEdges = graph.findAllByState("edge", "click");
      clickEdges.forEach((cn) => {
        graph.setItemState(cn, "click", false);
      });
      const edgeItem = e.item!;
      graph.setItemState(edgeItem, "click", true);
    });
    // 监听鼠标hover边
    graph.on("edge:mouseenter", (e) => {
      const edgeItem = e.item!;
      graph.setItemState(edgeItem, "hover", true);
    });

    graph.render();

    return () => {
      graph.destroy();
    };
  }, []);

  return (
    <Fragment>
      <G6Container>
        <div ref={ref}>
          <div className="toolBar" id="toolBar"></div>
        </div>
      </G6Container>
    </Fragment>
  );
};

export default GptG6;
