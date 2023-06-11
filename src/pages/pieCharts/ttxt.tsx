import React, { FC } from "react";
import { Spin, Empty } from "@arco-design/web-react";
import { IconLeft } from "@arco-design/web-react/icon";
import styled from "styled-components";

import CustomCaseStatisticPieChart, { ECOption } from "./createPie";

interface ChartDataItem {
  name?: string; //数据名称
  value?: number; //数据值
}
interface CaseStatisticData {
  chart_type?: string; //图表类型
  chart_title?: string; //图表标题
  chart_legend?: Array<string>; //图例
  chart_data?: Array<ChartDataItem>; //图表数据
}

interface CustomProps {
  loading?: boolean;
  chartData: CaseStatisticData;
}

const ChartContainer = styled.div`
  .panda-react-tabs-card > .panda-react-tabs-content,
  .panda-react-tabs-card-gutter > .panda-react-tabs-content {
    border: none;
  }
`;
const CustomSpin = styled(Spin)`
  .panda-react-spin-children {
    width: 100%;
  }
`;

const PieChart: FC<CustomProps> = (props) => {
  let { loading, chartData = [] } = props;

  const spinStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const chartStyle = {
    width: "380px",
    height: "196px",
    background: "#f6f9ff",
  };

  const {
    chart_type,
    chart_title,
    chart_legend,
    chart_data,
  } = chartData as CaseStatisticData;

  const chartOptions: ECOption = {
    title: {
      text: chart_title || "",
      textStyle: {
        fontFamily: "PingFang SC",
        fontSize: "14px",
        fontWeight: 500,
      },
      padding: [10, 0, 0, 20],
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      type: "scroll",
      width: 320,
      bottom: "4%",
      itemWidth: 8,
      itemHeight: 8,
      orient: "horizontal",
      pageButtonItemGap: 0,
      pageIcons: {
        horizontal: [
          "M670.165333 268.501333a42.666667 42.666667 0 0 0-60.330666 0l-213.333334 213.333334a42.666667 42.666667 0 0 0 0 60.330666l213.333334 213.333334a42.666667 42.666667 0 0 0 60.330666-60.330667L486.997333 512l183.168-183.168a42.666667 42.666667 0 0 0 0-60.330667z",
          "M396.501333 268.501333a42.666667 42.666667 0 0 1 60.330667 0l213.333333 213.333334a42.666667 42.666667 0 0 1 0 60.330666l-213.333333 213.333334a42.666667 42.666667 0 0 1-60.330667-60.330667L579.669333 512 396.501333 328.832a42.666667 42.666667 0 0 1 0-60.330667z",
        ],
      },
      pageIconSize: 8,
      tooltip: {
        show: true,
        formatter: function (params: any) {
          const data = chart_data?.filter(
            (item) => params.name === item.name
          )[0];
          return `${data?.name}: ${data?.value}  (${(
            (data?.value || 0) / 10000
          ).toFixed(2)}%)`;
        },
      },
    },
    series: [
      {
        name: undefined,
        type: "pie",
        data: chart_data,
        left: "center",
        top: "-20%",
        radius: ["50%", "70%"],
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: "center",
          formatter: ["{a|23746}", "{b|合计/个}"].join("\n"),
          rich: {
            a: {
              fontSize: 20,
              color: "#1D2129",
              fontWeight: "bold",
            },
            b: {
              fontSize: 12,
              color: "#4E5969",
              lineHeight: 20,
            },
          },
        },
      },
    ],
    color: [
      "#398E89",
      "#2E75D2",
      "#42A0DF",
      "#656EC8",
      "#9DA9CC",
      "#00BFDB",
      "#4BC7A2",
      "#98DD62",
      "#F2C351",
      "#CE6638",
    ],
  };

  return (
    <CustomSpin loading={loading} style={spinStyle}>
      <ChartContainer>
        {!loading && chartData ? (
          <CustomCaseStatisticPieChart
            chartStyle={chartStyle}
            chartOptions={chartOptions}
          />
        ) : (
          <Empty description="暂无统计数据" />
        )}
      </ChartContainer>
    </CustomSpin>
  );
};

export default PieChart;
