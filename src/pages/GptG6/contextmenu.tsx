import { INode } from "@antv/g6";
import React, { FC, useState } from "react";
import styled from "styled-components";

interface CustomProps {
  node: INode;
  nodeXY: number[];
  setDbClickMenuVisiable: (params: boolean) => void;
}

interface ClickMenuStyleProps {
  nodeXY: number[];
}
const ContextMenuContainer = styled.div<ClickMenuStyleProps>`
  position: absolute;
  background: #ffffff;
  top: ${(props) => (props.nodeXY ? props.nodeXY[1] : 0)}px;
  left: ${(props) => (props.nodeXY ? props.nodeXY[0] : 0)}px;
  z-index: 2;

  width: 72px;
  height: 44px;
  border: 1px solid #e5e8ef;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  font-size: 12px;

  .item {
    text-align: center;
    line-height: 42px;
  }
  .item: hover {
    cursor: pointer;
    background: #F2F3F8;
  }
`;

const ContextMenu: FC<CustomProps> = (props) => {
  const { node, nodeXY, setDbClickMenuVisiable } = props;

  console.log(node);
  const tagged = (node.getModel() as any).extra.flag;

  return (
    <ContextMenuContainer nodeXY={nodeXY}>
      <div
        className="item"
        onClick={() => {
          (node.getModel() as any).extra.flag = !tagged;
          node.refresh();
          setDbClickMenuVisiable(false);
        }}
      >
        {tagged ? "取消标记" : "标记风险"}
      </div>
    </ContextMenuContainer>
  );
};

export default ContextMenu;
