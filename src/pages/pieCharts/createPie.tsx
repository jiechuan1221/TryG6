import React, { CSSProperties, FC } from "react";

import ReactEChartsCore from "echarts-for-react/lib/core";
// 引入 echarts 的核心模块
import * as echarts from "echarts/core";
// 按需导入图表
import { PieChart, PieSeriesOption } from "echarts/charts";
// 按需导入图表相关的组件
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
} from "echarts/components";

// 引入底层的渲染引擎
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | DatasetComponentOption
>;

interface CustomProps {
  chartStyle?: CSSProperties;
  chartOptions: ECOption;
}

const CustomCaseStatisticPieChart: FC<CustomProps> = (props) => {
  const { chartOptions, chartStyle = {} } = props;

  const initialChartStyle = {
    width: "300px",
    height: "300px",
  };

  // 注册必要组件
  echarts.use([
    TitleComponent,
    TooltipComponent,
    PieChart,
    DatasetComponent,
    CanvasRenderer,
  ]);


  return (
    <ReactEChartsCore
      style={{ ...initialChartStyle, ...chartStyle }}
      echarts={echarts}
      option={chartOptions}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default CustomCaseStatisticPieChart;
