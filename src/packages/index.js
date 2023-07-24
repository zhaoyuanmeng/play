import weiphoto from './wei-photo';
import weimarkers from './wei-markers';
import wei360 from './wei-360';
import weisvg from './wei-svg-edit';
import weivideo from './wei-video';
// let newEvent = new event();
let obj = {
  install(Vue) {
    Vue.use(weimarkers);
    Vue.use(weiphoto);
    Vue.use(wei360);
    Vue.use(weisvg);
    Vue.use(weivideo);
  },
};

export default obj;
