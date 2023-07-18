import React, { Fragment, useEffect, useRef, useState } from "react";
import G6, { Graph, IEdge, IEvent, INode, Item, ModelConfig } from "@antv/g6";
import DefaultGraphCfg from "./defaultGraphCfg";
import styled from "styled-components";
import image from "./uid-flag.svg";
import img from "./relation-flag.svg";
import ContextMenu from "./contextmenu";
import BottomBar from "./bottom-bar";

interface G6ContainerProps {
  cursor: string;
}
const G6Container = styled.div<G6ContainerProps>`
  position: relative;
  margin: 50px;
  background: #f6f7fb;

  div {
    canvas {
      cursor: ${(props) => {
        if (props.cursor === "grab") {
          return props.cursor + "!important";
        } else {
          return props.cursor;
        }
      }};
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

      graph.refreshItem(self.edge);
      self.edge = null;
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
G6.registerBehavior("click-del-edge", {
  // Set the events and the corresponding responsing function for this behavior
  getEvents() {
    return {
      "edge:click": "onEdgeClick", // The event is edge:click, the responsing function is onEdgeClick
    };
  },
  onEdgeClick(ev: any) {
    const self = this;
    const currentEdge = ev.item as IEdge;
    const graph = self.graph as any;
    graph.removeItem(currentEdge);
    graph.setMode("default");
  },
});
G6.registerBehavior("click-change-edge", {
  getEvents() {
    return {
      "edge:click": "onEdgeClick",
    };
  },
  onEdgeClick(ev: any) {
    const self = this;
    const currentEdge = ev.item as IEdge;
    const graph = self.graph as any;
    const model = currentEdge.getModel();
    graph.updateItem(currentEdge, {
      style: {
        stroke: "lightBlue", // 边的颜色改为红色
        lineDash: [5, 5], // 边的线型改为实线
        lineWidth: 10,
      },
      label: "修改的文本test",
      labelCfg: {
        style: {
          fill: "#1890ff",
          fontSize: 14,
          background: {
            fill: "#ffffff",
            stroke: "#9EC9FF",
            padding: [2, 2, 2, 2],
            radius: 2,
          },
          fontFamily: "Italic",
        },
      },
    });
    graph.setMode("default");
  },
});
G6.registerBehavior("click-add-nodeTag", {
  getEvents() {
    return {
      "node:click": "onClick",
    };
  },
  onClick(evt: any) {
    const self = this;
    const node = evt.item as INode;
    const graph = self.graph as any;
    const group = node.getContainer();

    const badge = group.addShape("image", {
      attrs: {
        x: -17,
        y: 10,
        width: 20,
        height: 20,
        stroke: "#bfc",
        img:
          "https://images.pexels.com/photos/16117986/pexels-photo-16117986.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      icon: true,
      name: "marker",
    });

    graph.setMode("default");
  },
});

G6.registerNode("uid-node", {
  draw: (cfg: any, group: any) => {
    const keyShape = group!.addShape("circle", {
      attrs: {
        r: 12,
        stroke: "#f6f7fb",
        fill: "red",
        cursor: "pointer",
      },
      isKeyShape: true,
      name: "circle",
    });
    if (cfg!.extra.flag) {
      group!.addShape("image", {
        attrs: {
          x: -5,
          y: -4.5,
          width: 10,
          height: 10,
          stroke: "#bfc",
          cursor: "pointer",
          img: image,
        },
        draggable: true,
        icon: true,
        name: "tag",
      });
    }
    return keyShape;
  },
  setState(name, value, item: Item | undefined) {
    const group = (item as Item).getContainer();
    const shape = group.get("children")[0];

    // 只要有一个状态就是高亮的
    const hasSelected = (item as Item).hasState("selected");
    const hasActive = (item as Item).hasState("active");
    const hasHover = (item as Item).hasState("hover");
    const hasFocus = (item as Item).hasState("focus");
    if (hasSelected || hasActive || hasHover || hasFocus) {
      shape.attr("fill", "grey");
    } else {
      shape.attr("fill", "red");
    }
  },
});
const NODE_TEXT = {
  uid: "UID",
  did: "DID",
  wifimac: "WIFIMAC",
  ip: "IP",
  group: "同群",
  mobile: "手机号",
  shop: "店铺",
  identity: "身份证",
  txt: "TXT",
  follow: "互关",
};

G6.registerNode("relation-node", {
  draw: (cfg: any, group: any) => {
    const node_text: string =
      NODE_TEXT[(cfg!.id as string).split("-")[0] as keyof typeof NODE_TEXT];

    let strockColor = "rgba(0, 0, 0, 0)";
    let fillColor = "rgba(0, 0, 0, 0)";
    if (cfg!.extra.flag) {
      strockColor = "#E5E8EF";
      fillColor = "#fff";
    }

    const keyShape = group!.addShape("rect", {
      attrs: {
        width: node_text.length * 11,
        height: 20,
        stroke: strockColor,
        fill: fillColor,
        radius: 3,
        cursor: "pointer",
        textAlign: "center",
        textBaseline: "middle",
        shadowBlur: 12,
      },
      draggable: true,
      name: "rect",
    });

    group!.addShape("text", {
      attrs: {
        x: (node_text.length * 11) / 2,
        y: 10,
        text: node_text,
        fontSiz: 12,
        stroke: "#f6f7fb",
        fill: "grey",
        cursor: "pointer",
        textAlign: "center",
        textBaseline: "middle",
      },
      draggable: true,
      name: "text",
    });

    if (cfg!.extra.flag) {
      group!.addShape("image", {
        attrs: {
          x: -5,
          y: -4.5,
          width: 10,
          height: 10,
          stroke: "#bfc",
          cursor: "pointer",
          img: img,
        },
        // icon: true,
        draggable: true,
        name: "tag",
      });
    }

    return keyShape;
  },
  setState(name, value, item: Item | undefined) {
    const group = (item as Item).getContainer();
    const shape = group.get("children")[1];

    const hasSelected = (item as Item).hasState("selected");
    const hasActive = (item as Item).hasState("active");
    const hasHover = (item as Item).hasState("hover");
    const hasFocus = (item as Item).hasState("focus");
    if (hasSelected || hasActive || hasHover || hasFocus) {
      shape.attr("fill", "red");
    } else {
      shape.attr("fill", "grey");
    }
  },
});
// Scale Animation
G6.registerNode(
  "circle-animate",
  {
    afterDraw(cfg, group) {
      const shape = group?.get("children")[0];
      shape.animate(
        (ratio: any) => {
          const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
          return {
            r: (cfg?.size as number) / 2 + diff,
          };
        },
        {
          repeat: true,
          duration: 3000,
          easing: "easeCubic",
        }
      );
    },
  },
  "circle"
);

const get30Day = () => {
  const date1 = new Date();
  const date2 = new Date(date1);
  date2.setDate(date1.getDate() - 30);

  const agoDay = `${date2.getFullYear()}-${
    date2.getMonth() + 1 < 10
      ? `0${date2.getMonth() + 1}`
      : date2.getMonth() + 1
  }-${
    date2.getDate() + 1 < 10 ? `0${date2.getDate() + 1}` : date2.getDate() + 1
  }`;

  const nowDay = `${date1.getFullYear()}-${
    date1.getMonth() + 1 < 10
      ? `0${date1.getMonth() + 1}`
      : date1.getMonth() + 1
  }-${
    date1.getDate() + 1 < 10 ? `0${date1.getDate() + 1}` : date1.getDate() + 1
  }`;

  // return [dayj(agoDay), dayjs(nowDay)];
};

const GptG6 = () => {
  const ref = useRef(null);

  const [dbClickMenuVisiable, setDbClickMenuVisiable] = useState<boolean>(
    false
  );
  const [dbNode, setDbNode] = useState<INode | undefined>();
  const [nodeXY, setNodeXY] = useState<number[]>([]);
  const [nodeId, setNodeId] = useState<string>("");

  const [bottomBarVisiable, setBottomBarVisiable] = useState(false);
  const [graph, setGraph] = useState<Graph | undefined>();
  const [cursor, setCursor] = useState<string>("default");
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const ele = document.getElementById("test-enlarge");

  const nodes = [
    {
      id: "did-1201079237751822",
      type: "relation-node",
      label: "",
      extra: {},
      cluster: 1,
    },
    {
      id: "follow-1128_4327323071940039-1128_84721266885",
      type: "relation-node",
      label: "",
      extra: {},
      cluster: 1,
    },
    {
      id: "txt-1128_84721266885-1128_4327323071940039",
      type: "relation-node",
      label: "",
      extra: {},
      cluster: 1,
    },
    {
      id: "uid-1128_4327323071940039",
      type: "uid-node",
      label: "",
      extra: {},
      cluster: 1,
    },
    {
      id: "uid-1128_84721266885",
      type: "uid-node",
      label: "",
      extra: {},
      cluster: 1,
    },
    {
      id: "wifimac-fc:2e:19:0f:9f:de",
      type: "relation-node",
      label: "",
      extra: {},
      cluster: 1,
    },
  ];
  const edges = [
    {
      id: "1128_4327323071940039_1201079237751822",
      type: "uid_did",
      label: "",
      extra: "",
      source: "uid-1128_4327323071940039",
      target: "did-1201079237751822",
    },
    {
      id: "1128_84721266885_1201079237751822",
      type: "uid_did",
      label: "",
      extra: "",
      source: "uid-1128_84721266885",
      target: "did-1201079237751822",
    },
    {
      id: "3",
      type: "uid_follow",
      label: "",
      extra: "",
      source: "uid-1128_4327323071940039",
      target: "follow-1128_4327323071940039-1128_84721266885",
    },
    {
      id: "",
      type: "uid_follow",
      label: "",
      extra: "",
      source: "uid-1128_84721266885",
      target: "follow-1128_4327323071940039-1128_84721266885",
    },
    {
      id: "4",
      type: "uid_txt",
      label: "",
      extra: "",
      source: "uid-1128_84721266885",
      target: "txt-1128_84721266885-1128_4327323071940039",
    },
    {
      id: "5",
      type: "uid_txt",
      label: "",
      extra: "",
      source: "uid-1128_4327323071940039",
      target: "txt-1128_84721266885-1128_4327323071940039",
    },
    {
      id: "1128_4327323071940039_fc:2e:19:0f:9f:de",
      type: "uid_wifimac",
      label: "",
      extra: "",
      source: "uid-1128_4327323071940039",
      target: "wifimac-fc:2e:19:0f:9f:de",
    },
    {
      id: "1128_84721266885_fc:2e:19:0f:9f:de",
      type: "uid_wifimac",
      label: "",
      extra: "",
      source: "uid-1128_84721266885",
      target: "wifimac-fc:2e:19:0f:9f:de",
    },
  ];
  const data2 = {
    nodes,
    edges,
  };

  const data = {
    nodes: [
      {
        id: "uid-c9329749475",
        label: "n0",
        class: "c0",
        type: "uid-node",
        extra: {
          flag: true,
        },
      },
      {
        id: "did-c93297u3984u75",
        label: "n0",
        class: "c0",
        type: "relation-node",
        extra: {
          flag: true,
        },
      },
    ],
  };
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
    G6.Util.processParallelEdges(data1.edges);

    const graph = new G6.Graph({
      container: ref.current!,
      width: ele?.clientWidth || 800,
      height: ele?.clientHeight || 600,
      ...DefaultGraphCfg,
    });

    setGraph(graph);

    graph.data(data2);

    graph.on("node:contextmenu", (evt) => {
      evt.preventDefault();

      setDbClickMenuVisiable(false);
      const node = evt.item as INode;

      const { x, y } = node.getModel(); // 获得该节点的位置，对应 pointX/pointY 坐标
      const clientXY = graph.getCanvasByPoint(x!, y!);
      setNodeXY([clientXY.x, clientXY.y]);
      setDbNode(node);
      setDbClickMenuVisiable(true);
    });

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
    graph.on("canvas:contextmenu", (evt: any) => {
      evt.stopPropagation();
    });
    graph.on("canvas:click", (evt: any) => {
      // evt.stopPropagation();
      clearAllStates();
      // graph.off("click-add-edge")
      // graph.setMode("default");
    });
    graph.on("node:mouseenter", (e) => {
      const nodeItem = e.item!;
      // 设置目标节点的 hover 状态 为 true
      graph.setItemState(nodeItem, "hover", true);
    });
    graph.on("node:mouseleave", (e) => {
      // if(graph.getCurrentMode() === 'dragCanvas') {
      //   console.log(graph.getCurrentMode());

      //   setCursor('grab');
      // }
      const nodeItem = e.item!;
      // 设置目标节点的 hover 状态 false
      graph.setItemState(nodeItem, "hover", false);
    });
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

    graph.on("edge:click", (e) => {
      const clickEdges = graph.findAllByState("edge", "click");
      clickEdges.forEach((cn) => {
        graph.setItemState(cn, "click", false);
      });
      const edgeItem = e.item!;
      graph.setItemState(edgeItem, "click", true);
    });
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
      <G6Container cursor={cursor}>
        <div
          ref={ref}
          style={{
            width: "800px",
            height: "600px",
            position: "absolute",
            border: "1px solid grey",
          }}
          id="test-enlarge"
          onClick={(evt) => {
            evt.stopPropagation();
          }}
        >
          <BottomBar
            bottomBarVisiable={bottomBarVisiable}
            graph={graph}
            setCursor={setCursor}
            setWidth={setWidth}
            setHeight={setHeight}
          />
        </div>
      </G6Container>
      {dbClickMenuVisiable && (
        <ContextMenu
          node={dbNode as INode}
          nodeXY={nodeXY}
          setDbClickMenuVisiable={setDbClickMenuVisiable}
        />
      )}
    </Fragment>
  );
};

export default GptG6;
