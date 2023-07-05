import { Tooltip } from "@arco-design/web-react";
import React, { FC, useState } from "react";
import styled from "styled-components";

import { ReactComponent as DragCanvas } from "../../reset1/3.svg";
import { ReactComponent as HandleCanvas } from "../../reset1/2.svg";
import { ReactComponent as EnlargeCanvas } from "../../reset1/5.svg";
import { ReactComponent as ZoomOut } from "../../reset1/1.svg";
import { IconMinus, IconPlus } from "@arco-design/web-react/icon";
import { Graph } from "@antv/g6";

interface CustomProps {
  bottomBarVisiable?: boolean;
  graph: Graph | undefined;
  setCursor: (cursor: string) => void;
  setWidth?: (width: number) => void;
  setHeight?: (height: number) => void;
}
interface BarProps {
  visiable?: boolean;
}
const BottomBarContainer = styled.div<BarProps>`
  width: 244px;
  height: 40px;
  padding: 2px 0;
  box-sizing: border-box;
  position: absolute;
  background: #ffffff;
  right: 12px;
  bottom: 18px;

  box-shadow: 0px 1px 2px 0px #1a22331a;
  font-size: 12px;
  cursor: default;
  border-radius: 2px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  .bar-item {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .svg: hover {
    rect {
      fill: #f2f3f8;
    }
  }

  .svg-container {
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle {
    color: #42464e;
    width: 18px;
  }
  .svg-container:hover {
    background: #f2f3f8;
  }
`;

const BottomBar: FC<CustomProps> = (props) => {
  const { graph, setCursor } = props;
  const [drag_canvas, setDragCanvas] = useState<boolean>(false);
  const [zoom_percent, setZoomPercent] = useState(100);
  const [enlarge_canvas, setEnlargeCanvas] = useState<boolean>(false);

  const dragCanvas = () => {
    if (!drag_canvas) {
      setCursor("grab");
      graph?.setMode("dragCanvas");
    } else {
      setCursor("default");
      graph?.setMode("default");
    }

    setDragCanvas(!drag_canvas);
  };

  const reduceZoom = (evt: any) => {
    evt.stopPropagation();

    const percent = (graph?.getZoom() || 0) - 0.05;
    if (percent < 0) {
      return;
    }
    graph?.zoomTo(percent);

    setZoomPercent(Number(percent.toFixed(2)) * 100);
  };

  const addZoom = (evt: any) => {
    evt.stopPropagation();

    const percent = (graph?.getZoom() || 0) + 0.05;
    if (percent > 3) {
      return;
    }
    graph?.zoomTo(percent);

    setZoomPercent(Number(percent.toFixed(2)) * 100);
  };

  const enLargeScreen = () => {
    const ele = document.getElementById("test-enlarge");
    if (ele) {
      if (!enlarge_canvas) {
        ele.style.width = 800 + "px";
        ele.style.height = 800 + "px";
        graph?.changeSize(ele.clientWidth, ele.clientHeight);
      } else {
        ele.style.width = 800 + "px";
        ele.style.height = 600 + "px";
        graph?.changeSize(800, 600);
      }
      setEnlargeCanvas(!enlarge_canvas);
    }
  };

  return (
    <BottomBarContainer>
      <div className="bar-item" onClick={dragCanvas}>
        {drag_canvas ? (
          <HandleCanvas className="svg" />
        ) : (
          <DragCanvas className="svg" />
        )}
      </div>
      {/* 分割线 */}
      <div style={{ borderRight: "1px solid #f2f3f8", height: "15px" }}></div>

      <div className="bar-item" onClick={reduceZoom}>
        <div className="svg-container">
          <IconMinus className="svg middle" />
        </div>
      </div>
      <div className="bar-item" style={{ cursor: "text" }}>
        {zoom_percent.toFixed(0)}%
      </div>
      <div className="bar-item" onClick={addZoom}>
        <Tooltip content="放大">
          <div className="svg-container">
            <IconPlus className="svg middle" />
          </div>
        </Tooltip>
      </div>

      {/* 分割线 */}
      <div style={{ borderLeft: "1px solid #f2f3f8", height: "15px" }}></div>

      <div className="bar-item" onClick={enLargeScreen}>
        {enlarge_canvas ? (
          <Tooltip content="恢复">
            <ZoomOut className="svg" />
          </Tooltip>
        ) : (
          <Tooltip content="全屏">
            <EnlargeCanvas className="svg" />
          </Tooltip>
        )}
      </div>
    </BottomBarContainer>
  );
};

export default BottomBar;
