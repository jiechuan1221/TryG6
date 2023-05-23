import React, { FC } from "react";
import G6, { Item } from "@antv/g6";
import {
  Rect,
  Text,
  Circle,
  Image,
  Group,
  createNodeFromReact,
} from "@antv/g6-react-node";
interface TagProps {
  text: string;
  color: string;
}
interface CardProps {
  cfg: any;
}

export const Tag: FC<TagProps> = ({ text, color }) => (
  <Rect
    style={{
      fill: color,
      padding: [5, 10],
      width: "auto",
      radius: [4],
      margin: [0, 8],
    }}
  >
    <Text style={{ fill: "#fff", fontSize: 10 }}>{text}</Text>
  </Rect>
);

export const Card: FC<CardProps> = ({ cfg }) => {
  const { collapsed = true } = cfg;

  return (
    <Group draggable>
      <Rect
        style={{
          width: 400,
          height: "auto",
          fill: "#fff",
          stroke: "#ddd",
          shadowColor: "#eee",
          shadowBlur: 30,
          radius: [8],
          justifyContent: "center",
          padding: [18, 0],
        }} 
        draggable
      >
        <Text
          style={{
            fill: "#000",
            margin: [0, 24],
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          这是一个卡片
        </Text>
        <Text style={{ fill: "#ccc", fontSize: 12, margin: [12, 24] }}>
          我是一段特别特别特别特别特别特别特别长的描述
        </Text>
        {collapsed && (
          <Group>
            <Image
              style={{
                img:
                  "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
                width: 200,
                height: 200,
                margin: [24, "auto"],
              }}
            />
            <Rect
              style={{ width: "auto", flexDirection: "row", padding: [4, 12] }}
            >
              <Tag color="#66ccff" text="我是" />
              <Tag color="#66ccff" text="很多个" />
              <Tag color="#66ccff" text="很多个的" />
              <Tag color="#66ccff" text="标签" />
            </Rect>
          </Group>
        )}
        <Circle
          style={{
            position: "absolute",
            x: 380,
            y: 20,
            r: 5,
            fill: collapsed ? "blue" : "green",
          }}
        >
          <Text
            style={{
              fill: "#fff",
              fontSize: 10,
              margin: [-6, -3, 0],
              cursor: "pointer",
            }}
            onClick={(evt: any, node: any, shape: any, graph: any) => {
              graph.updateItem(node, {
                collapsed: !collapsed,
              });
            }}
          >
            {collapsed ? "-" : "+"}
          </Text>
        </Circle>
      </Rect>
    </Group>
  );
};
