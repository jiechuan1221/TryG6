import G6 from "@antv/g6";

const graph = new G6.Graph({
  container: "containerG6",
  width: 800,
  height: 600,
  defaultNode: {
    labelCfg: {
      style: {
        fill: "#fff"
      }
    }
  },
  defaultEdge: {
    type: "line",
    labelCfg: {
      autoRotate: true
    }
  },
  nodeStateStyles: {
    hover: {
      fill: "lightsteelblue"
    },
    click: {
      stroke: "#000",
      lineWidth: 2
    }
  },
  edgeStateStyles: {
    click: {
      stroke: "steelblue"
    }
  },
  layout: {
    type: "force",
    preventOverlap: true,
    clustering: true,
    clusterNodeSize: 40,
    clusterNodeSpacing: 30,
    clusterFociStrength: 1.2,
    nodeSpacing: 20
  },
  modes: {
    default: ["drag-node", "drag-canvas", "zoom-canvas"]
  }
});
const mainG6 = async () => {
  const nodes = [
    {
      id: "did-1201079237751822",
      type: "relation-node",
      label: "",
      extra: {},
      cluster: 1
    },
    {
      id: "follow-1",
      type: "relation-node",
      label: "",
      extra: {},
      cluster: 1
    },
    {
      id: "txt-1",
      type: "relation-node",
      label: "",
      extra: {},
      cluster: 1
    },
    {
      id: "uid-1128_4327323071940039",
      type: "uid-node",
      label: "",
      extra: {},
      cluster: 1
    },
    {
      id: "uid-1128_84721266885",
      type: "uid-node",
      label: "",
      extra: {},
      cluster: 1
    },
    {
      id: "wifimac-fc:2e:19:0f:9f:de",
      type: "relation-node",
      label: "",
      extra: {},
      cluster: 1
    }
  ];
  const edges = [
    {
      id: "",
      type: "uid_did",
      label: "",
      extra: "",
      source: "uid-1128_4327323071940039",
      target: "did-1201079237751822"
    },
    {
      id: "",
      type: "uid_did",
      label: "",
      extra: "",
      source: "uid-1128_84721266885",
      target: "did-1201079237751822"
    },
    {
      id: "",
      type: "uid_follow",
      label: "",
      extra: "",
      source: "uid-1128_4327323071940039",
      target: "follow-1"
    },
    {
      id: "",
      type: "uid_follow",
      label: "",
      extra: "",
      source: "uid-1128_84721266885",
      target: "follow-1"
    },
    {
      id: "",
      type: "uid_txt",
      label: "",
      extra: "",
      source: "uid-1128_84721266885",
      target: "txt-1"
    },
    {
      id: "",
      type: "uid_txt",
      label: "",
      extra: "",
      source: "uid-1128_4327323071940039",
      target: "txt-1"
    },
    {
      id: "",
      type: "uid_wifimac",
      label: "",
      extra: "",
      source: "uid-1128_4327323071940039",
      target: "wifimac-fc:2e:19:0f:9f:de"
    },
    {
      id: "",
      type: "uid_wifimac",
      label: "",
      extra: "",
      source: "uid-1128_84721266885",
      target: "wifimac-fc:2e:19:0f:9f:de"
    }
  ];
  const data = {
    nodes,
    edges
  };

  graph.data(data);
  graph.render();
};
mainG6();
