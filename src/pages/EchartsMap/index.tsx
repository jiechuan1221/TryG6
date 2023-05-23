import React, { useEffect, useRef } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import chineseMap from "./chinese.svg";
import chinaGeoJson from "./geoJson.json"
// import {GeoJSONCompressed}
// echarts.registerMap("ChineseMap", { svg: chineseMap });
// echarts.registerMap("ChineseMap", { geoJSON: chinaGeoJson });

// console.log(chinaGeoJson);

const Chinese = () => {
  const ref = useRef(null);

  useEffect(() => {
    const chart = echarts.init(ref.current!);

    const option = {
      series: [
        {
          type: "map",
          map: "ChineseMap",
        },
      ],
    };
    chart.setOption(option);
  }, []);

  return <div ref={ref} id="test" style={{ height: "500px" }}></div>;
};

export default Chinese;
