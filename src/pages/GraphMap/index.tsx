import React, { useEffect, useRef } from "react";
import ChartSpace, { IScatterMapSpec } from "@arco-design/chart-space";
import { ScatterMapChart } from "@arco-design/chart-space/esm/domain/chart/map";
import data from "./test.json";

const GraphMap = () => {
  const ref = useRef(null);
  ChartSpace.useChart([ScatterMapChart]);

  const typeOneData = data.stat_data.map((item) => {
    return {
      point_name: item.province,
      point_value: item.user_cnt,
      longitude: item.longitude,
      latitude: item.latitude,
      city: item.city,
      area: item.area,
      location: item.location,
    };
  });

  const ScatterMapSpec = {
    type: "scatterMap",
    stroke: "#f4f8ff",
    strokeWidth: 2,
    background: "#f6f9fe",
    url: "https://tosv.byted.org/obj/gis/topojson/china.json",
    color: {
      field: "value",
      type: "linear",
      range: ["#e1edfd"],
    },
    format: {
      type: "topojson",
      property: "china",
    },
    indexField: "point_name",
    valueField: "point_value",
    latitudeField: "latitude",
    longitudeField: "longitude",
    zoom: 1,
    roam: true,
    center: [106, 39],
    pointFillOpacity: 1,
    pointStrokeWidth: 0,
    pointSize: {
      type: "linear",
      range: [5, 5],
    },
    pointColor: {
      type: "linear",
      range: ["pink", "darkblue"],
    },
    data: [
      {
        name: "source",
        values: [...typeOneData],
      },
    ],
    tooltip: {
      visible: true,
      target: {
        visible: true,
        content: [
          {
            hasShape: true,
            valueFormatMethod: (fileds, value, item) => {
              return `${item.city}-${item.area}   ${item.point_value} 个`;
            },
          },
        ],
      },
      dimension: {},
    },
    // labels: {
    //   visible: true,
    //   offset: 2,
    //   anchor: ["right", "bottom"],
    //   position: "right",
    //   defaultAnchor: "right",
    //   formatMethod: function (pointFiled: any, value: any, pointDt: any) {
    //     return `${pointDt.city + "-" + pointDt.area}-${value}人`;
    //   },
    //   coverEnable: true,
    // },
    nameMap: {
      广东: "广东省",
      江苏: "江苏省",
      山东: "山东省",
      河南: "河南省",
      河北: "河北省",
      浙江: "浙江省",
      四川: "四川省",
      安徽: "安徽省",
      辽宁: "辽宁省",
      陕西: "陕西省",
      山西: "山西省",
      湖北: "湖北省",
      北京: "北京市",
      湖南: "湖南省",
      黑龙江: "黑龙江省",
      福建: "福建省",
      内蒙古: "内蒙古自治区",
      云南: "云南省",
      江西: "江西省",
      重庆: "重庆市",
      上海: "上海市",
      贵州: "贵州省",
      吉林: "吉林省",
      天津: "天津市",
      广西: "广西壮族自治区",
      甘肃: "甘肃省",
      新疆: "新疆维吾尔自治区",
      宁夏: "宁夏回族自治区",
      海南: "海南省",
      青海: "青海省",
      西藏: "西藏自治区",
      中国香港: "香港特别行政区",
      中国台湾: "台湾省",
      澳门: "澳门特别行政区",
    },
  } as IScatterMapSpec;

  useEffect(() => {
    const chart = new ChartSpace(ref.current, ScatterMapSpec);
    chart.renderAsync();
    return () => {
      chart.release();
    };
  }, []);

  return (
    <div
      id="chart"
      style={{ width: "800px", height: "700px", margin: 30 }}
      className="map"
      ref={ref}
    ></div>
  );
};

export default GraphMap;
