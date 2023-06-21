import React, { useRef, useContext, useState } from "react";
import { message, Menu, Input } from "antd";
import { TooltipValue } from "@antv/graphin";
import Graphin, {
  GraphinContext,
  Behaviors,
  G6,
  Components,
  IG6GraphEvent,
  ContextMenuValue,
} from "@antv/graphin";
import { EdgeConfig, IEdge } from "@antv/g6";

import styled from "styled-components";
import ToolBar from "./ToolBar";

const { ActivateRelations, FitView, BrushSelect, LassoSelect } = Behaviors;
const { MiniMap, Tooltip, ContextMenu } = Components;

const GraphinContainer = styled.div`
  position: relative;
  width: 800px;
  margin: 50px;
`;

Graphin.registerBehavior("changeEdgesLabel", {
  getEvents() {
    return {
      "edge:dblclick": "changeLabel",
    };
  },
  changeLabel(evt: IG6GraphEvent) {
    const edge = evt.item as any;
    const model = edge.getModel() as EdgeConfig;
    model.style = { label: { value: model.id } };
    edge.updateShape("style");
  },
});

export default function GraphinDemo() {
  const graphinRef = useRef(null);

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

  const style = {
    width: "800px",
    height: "600px",
    border: "1px solid red",
  };

  const MyMenu = (value: ContextMenuValue) => {
    const [labelChange, setLabelChange] = useState(false);
    const [label, setLabel] = useState("");
    const { onClose, item } = value;

    const handleClick = (e: { key: unknown }) => {
      const { key } = e;

      //  获取到label的值
      const labelCfg = (item?.getModel().style as any).label;
      const labelValue = labelCfg?.value || "";
      setLabel(labelValue);

      if (key === "addLabel") {
        setLabelChange(true);
      }

      if (key === "hide") {
        item?.changeVisibility(false);
        onClose();
      }
    };

    return (
      <Menu onClick={handleClick}>
        {labelChange ? (
          <Input
            placeholder="请输入标签名称"
            defaultValue={`${label}`}
            style={{ width: "150px" }}
            onBlur={(e) => {
              const model = item?.getModel() as EdgeConfig;
              model.style = {
                label: {
                  value: e.target.value,
                },
              };
              // item?.setOriginStyle()
              console.log(item);

              item?.updateShape("style");
            }}
          />
        ) : (
          <>
            <Menu.Item key="addLabel">修改标签</Menu.Item>
            <Menu.Item key="hide">隐藏</Menu.Item>
          </>
        )}
      </Menu>
    );
  };

  return (
    <GraphinContainer>
      <ToolBar />
      <Graphin
        data={data}
        layout={{ type: "grid" }}
        ref={graphinRef}
        style={style}
        modes={{
          default: ["drag-node", "drag-canvas", "zoom-canvas"],
        }}
      >
        <MiniMap />
        <ActivateRelations trigger="click" />
        <FitView />
        <BrushSelect trigger="shift" includeEdges={true} />
        <LassoSelect />
        <ContextMenu style={{ background: "#fff" }} bindType="edge">
          {(value) => {
            return <MyMenu {...value} />;
          }}
        </ContextMenu>
      </Graphin>
    </GraphinContainer>
  );
}
