import component from './src/index.vue';
import componentPlus from './src/indexPlus.vue';
component.install = function (Vue) {
  Vue.component(component.name, component);
  Vue.component(componentPlus.name, componentPlus);
};
export default component;
