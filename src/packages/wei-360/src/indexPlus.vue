<template>
  <div class="wei360">
    <div
      class="weiPhotosphere"
      style="opacity: 0; z-index: 1"
      ref="photo"
    ></div>
    <canvas class="weiPhotosphere" style="z-index: 0" ref="canvasDom"></canvas>

    <div class="userLoadingBox" v-if="loadingStatus && !loadingStatusErr">
      <slot name="loading" :loadNum="loadNum"></slot>
    </div>
    <div
      class="weiLoadingBox"
      v-show="loadingStatus && !loadingStatusErr && !isSlotLoading"
    >
      <div class="weiLoadingBox">
        <svg width="50px" height="50px">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="transparent"
            stroke-width="3"
            stroke-dasharray="31.415 31.415"
            stroke="#02bcfe"
            stroke-linecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0, 25 25;360, 25 25"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#02bcfe;#3be6cb;#02bcfe"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="25"
            cy="25"
            r="10"
            fill="transparent"
            stroke-width="3"
            stroke-dasharray="15.7 15.7"
            stroke="#3be6cb"
            stroke-linecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="360, 25 25;0, 25 25"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#3be6cb;#02bcfe;#3be6cb"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div class="loadingBar">
          <div class="bar" :style="`width:${loadNum}%`"></div>
        </div>
        <div class="loadingText">正在加载中...</div>
      </div>

      <div v-if="loadingStatusErr" class="loadErr weiLoadingBox">
        <div>加载图片失败,请刷新后重试</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'wei-361',
};
</script>
<script setup>
// 改写成vue3的形式
import { Viewer } from 'wei-photo-js';
import 'wei-photo-js/dist/wei-photo-js.css';
import 'wei-photo-js/dist/plugins/markers.css';
import { Test } from './canvas';
import {
  ref,
  reactive,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
  useSlots,
} from 'vue';
// props部分
const props = defineProps([
  'imgList',
  'isAuto',
  'isDeep',
  'moveSpeed',
  'autoSpeed',
]);
// emit 部分
const emit = defineEmits(['imgLoad', 'ready', 'change']);
// data 部分
let loadingStatus = ref(true);
let slot = useSlots();
let loadingStatusErr = ref(false);
let isSlotLoading = ref(false);
let loadNum = ref(0);
let nowRota = ref(null);
let viewer = reactive({
  handle: {},
});
const options = reactive([]);
// canvas Dom
let canvasDom = ref(null);
let photo = ref(null);
let defaultlatPer = reactive({
  longitude: 0.01,
});
// method 部分
//初始化监听数据
const initImgData = (fun) => {
  loadingStatus.value = true;
  new Test(props.imgList, nowRota, canvasDom.value, (val) => {
    emit('imgLoad', val);
    if (val == 100) {
      loadingStatus.value = false;
    }
    loadNum.value = val;
  });
};
//初始化
const inits = (argoptions) => {
  let defaultOptions = {
    is360: props.isDeep,
    container: photo.value,
    panorama:
      'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC',
    autorotateSpeed: props.autoSpeed + 'rpm',
    autorotateLat: 0,
    moveSpeed: props.moveSpeed,
    defaultZoomLvl: 50,
    maxZoom: 50,
    minZoom: 50,
    moveInertia: false,
  };

  // let options = argoptions || options || [];
  let options = [];
  /**
   * 覆盖默认配置
   */
  for (let i in options) {
    defaultOptions[i] = options[i];
  }
  // 这里面不需要响应式的
  viewer.handle = new Viewer(defaultOptions);
  viewer.handle.once('ready', () => {
    emit('ready', true);
    //监听事件
    viewer.handle.on('position-updated', (e, position) => {
      let z = parseInt(
        position.longitude / ((Math.PI * 2) / props.imgList.length),
      );
      nowRota.value = z == props.imgList.length ? z - 1 : z;
      emit('change', nowRota);
      defaultlatPer = Object.assign(defaultlatPer, position);
    });

    //显示第一帧
    nextTick(() => {
      viewer.handle.rotate({
        latitude: Math.PI,
        longitude: defaultlatPer.longitude || Math.PI * 2,
      });
      viewer.handle.startAutorotate();
      setTimeout(() => {
        viewer.handle.stopAutorotate();
      }, 0);
    });

    initImgData();
  });
};
// watch 部分
watch(
  () => props.isAuto,
  (newVal) => {
    if (!viewer) return;
    if (newVal) {
      viewer.startAutorotate();
    } else {
      viewer.stopAutorotate();
    }
  },
);
watch(
  () => props.isDeep,
  (newVal) => {
    if (!viewer) return;
    viewer.setOption('is360', newVal);
  },
);
watch(
  () => props.moveSpeed,
  (newVal) => {
    if (!viewer) return;
    viewer.setOption('moveSpeed', newVal);
  },
);
watch(
  () => props.autoSpeed,
  (newVal) => {
    if (!viewer || !newVal || newVal == '') return;
    viewer.setOption('autorotateSpeed', newVal + 'rpm');
  },
);
watch(
  () => props.imgList,
  (newVal) => {
    if (newVal && newVal.length !== 0) {
      // this.inits();
      inits();
    }
  },
);
onMounted(() => {
  if (slot.loading && slot.loading()) {
    isSlotLoading.value = true;
  } else {
    isSlotLoading.value = false;
  }
});
onUnmounted(() => {
  // 释放内存;
  viewer.handle.destroy();
});
</script>
<style lang="less">
.wei360 {
  position: relative;
  height: 400px;
  width: 400px;
  left: 50%;
  transform: translateX(-50%);
  .psv-canvas-container {
    z-index: 2;
  }
  .weiPhotosphere {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
  .userLoadingBox {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 21;
  }
  .weiLoadingBox {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background: #f4f4f4;
    z-index: 21;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .loadingText {
    color: #7a7a7a;
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    bottom: 7%;
  }
  .loadingBar {
    height: 3px;
    width: 70%;
    position: absolute;
    bottom: 17%;
    .bar {
      position: absolute;
      left: 0;
      height: 100%;
      background: #0cd4d4;
    }
  }
  .loadErr {
    color: #7a7a7a;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
