// 因为没有做 external，避免多个版本react冲突，统一从window对象中获取
import React, { useEffect } from "react";
import {
  GI_PROJECT_CONFIG,
  SERVER_ENGINE_CONTEXT,
  GI_ASSETS_PACKAGE,
  GI_LOCAL_DATA,
  GI_SCHEMA_DATA,
} from "./GI_EXPORT_FILES";

//@ts-ignore
const { getCombineServices, loaderCombinedAssets } = window.GISDK.utils;
const { GI_SITE_PROJECT_ID } = SERVER_ENGINE_CONTEXT;

// 设置引擎上下文
localStorage.setItem(
  "SERVER_ENGINE_CONTEXT",
  JSON.stringify(SERVER_ENGINE_CONTEXT)
);
// 将用户本地上传的数据，存储到 IndexedDB 中
localforage.setItem(GI_SITE_PROJECT_ID, {
  data: { transData: GI_LOCAL_DATA },
  schemaData: GI_SCHEMA_DATA,
});

const DemoG6 = (props) => {
  const [state, setState] = React.useState({
    isReady: false,
    assets: null,
    config: {},
    services: [],
  });
  useEffect(() => {
    loaderCombinedAssets(GI_ASSETS_PACKAGE).then((res) => {
      /** 生成服务 */
      const services = getCombineServices(res.services);
      setState((preState) => {
        return {
          ...preState,
          isReady: true,
          assets: res,
          services,
          config: GI_PROJECT_CONFIG,
        };
      });
    });
  }, []);
  const { assets, isReady, config, services } = state;
  if (!isReady) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div style={{ height: "100vh" }}>
        {/** @ts-ignore */}
        <window.GISDK.default
          config={config}
          assets={assets}
          services={services}
        />
      </div>
    </div>
  );
};

// 因为没有做 external，避免多个版本react冲突，统一从window对象中获取

export default DemoG6;
