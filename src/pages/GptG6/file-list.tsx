import { INode } from "@antv/g6";
import React, { FC, useState } from "react";
import styled from "styled-components";

interface CustomProps {
  node?: INode;
  nodeXY: number[];
}

interface StyleProps {
  nodeXY: number[];
}
const FileListContainer = styled.div<StyleProps>`
  position: absolute;
  background: #ffffff;
  top: ${(props) => (props.nodeXY ? props.nodeXY[1] : 0)}px;
  left: ${(props) => (props.nodeXY ? props.nodeXY[0] : 0)}px;
  z-index: 2;
`;

const FleList: FC<CustomProps> = (props) => {
    const { node, nodeXY } = props;
  
    return (
      <FileListContainer nodeXY={nodeXY}>
        sdhciudshcudvyugfudrgyuegruyyuer
      </FileListContainer>
    );
  };
  
  export default FleList;