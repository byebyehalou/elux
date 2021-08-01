import Taro from '@tarojs/taro';
import { setVueComponentsConfig, loadComponent } from '@elux/vue-components';
import { setAppConfig, setUserConfig, createBaseMP } from '@elux/app';
import { routeENV, getTabPages } from '@elux/taro';
import { renderToMP } from '@elux/vue-components/stage';
import { createRouter } from '@elux/route-mp';
export * from '@elux/vue-components';
export * from '@elux/app';
setAppConfig({
  loadComponent
});
export function setConfig(conf) {
  setVueComponentsConfig(conf);
  setUserConfig(conf);
}
setVueComponentsConfig({
  setPageTitle: title => Taro.setNavigationBarTitle({
    title
  })
});
export const createMP = (app, moduleGetter, middlewares, appModuleName) => {
  const tabPages = getTabPages();
  return createBaseMP(app, locationTransform => createRouter(locationTransform, routeENV, tabPages), renderToMP, moduleGetter, middlewares, appModuleName);
};