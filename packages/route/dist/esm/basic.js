import { buildConfigSetter } from '@elux/core';
export var routeConfig = {
  maxHistory: 10,
  notifyNativeRouter: {
    root: true,
    internal: false
  },
  indexUrl: ''
};
export var setRouteConfig = buildConfigSetter(routeConfig);
export var routeMeta = {
  defaultParams: {},
  pagenames: {},
  pages: {}
};