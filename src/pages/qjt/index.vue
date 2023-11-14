<script setup>
import { ref, onMounted } from 'vue';
let krpano = ref(null);
const krpanoOnready = (krpano_interface) => {
  krpano.value = krpano_interface;
  setTimeout(() => {
    initHot();
  }, 500);
};
const krpanoOnerror = (error) => {
  console.log(error);
};
const addHotsport = () => {
  if (krpano) {
    let h = krpano.value.get('view.hlookat');
    let v = krpano.value.get('view.vlookat');
    let hs_name = 'hs' + ((Date.now() + Math.random()) | 0);

    krpano.value.call('addhotspot(' + hs_name + ')');
    krpano.value.set(
      'hotspot[' + hs_name + '].url',
      '/static/vtour/skin/vtourskin_hotspot.png',
    );
    krpano.value.set('hotspot[' + hs_name + '].ath', h);
    krpano.value.set('hotspot[' + hs_name + '].atv', v);
    krpano.value.set('hotspot[' + hs_name + '].distorted', true);

    if (krpano.value.get('device.html5')) {
      // 对于HTML5，可以将JS函数直接分配给krpano事件
      krpano.value.set(
        'hotspot[' + hs_name + '].onclick',
        function (hs) {
          alert('hotspot "' + hs + '" clicked');
        }.bind(null, hs_name),
      );
    } else {
      // 对于Flash，需要使用js（）操作从Flash调用js（此代码适用于Flash和HTML5）
      krpano.value.set(
        'hotspot[' + hs_name + '].onclick',
        "js( alert(calc('hotspot \"' + name + '\" clicked')) );",
      );
    }
  }
};
function initHot() {
  if (krpano.value) {
    let h = krpano.value.get('view.hlookat');
    let v = krpano.value.get('view.vlookat');
    let hs_name = 'hs' + ((Date.now() + Math.random()) | 0);

    krpano.value.call('addhotspot(' + hs_name + ')');
    krpano.value.set(
      'hotspot[' + hs_name + '].url',
      '/static/vtour/skin/vtourskin_hotspot.png',
    );
    krpano.value.set('hotspot[' + hs_name + '].ath', -31);
    krpano.value.set('hotspot[' + hs_name + '].atv', 11);
    krpano.value.set('hotspot[' + hs_name + '].distorted', true);

    if (krpano.value.get('device.html5')) {
      // 对于HTML5，可以将JS函数直接分配给krpano事件
      krpano.value.set(
        'hotspot[' + hs_name + '].onclick',
        function (hs) {
          alert('hotspot "' + hs + '" clicked');
        }.bind(null, hs_name),
      );
    } else {
      // 对于Flash，需要使用js（）操作从Flash调用js（此代码适用于Flash和HTML5）
      krpano.value.set(
        'hotspot[' + hs_name + '].onclick',
        "js( alert(calc('hotspot \"' + name + '\" clicked')) );",
      );
    }
  }
}
const removeHotsport = () => {
  if (krpano) {
    krpano.value.call('loop(hotspot.count GT 0, removehotspot(0) );');
  }
};
const loadXmlString = () => {
  if (krpano) {
    let xmlstring = `<krpano>
                                <preview type="grid(cube,64,64,512,0xCCCCCC,0xF6F6F6,0x999999);" />
                                <view hlookat="0" vlookat="0" fov="100" distortion="0.0" />
                             </krpano>`;
    krpano.value.call(
      'loadxml(' + escape(xmlstring) + ', null, MERGE, BLEND(0.5));',
    );
  }
};
const loadPano = () => {
  const xmlname = 'tour.xml';
  /** loadpano(xmlpath, vars, flags, blend, loaddone) */
  if (krpano) {
    krpano.value.call('loadpano(' + xmlname + ', null, MERGE, BLEND(0.5));');
  }
};
const setRandomView = () => {
  if (krpano) {
    krpano.value.set('view.hlookat', Math.random() * 360.0 - 180.0);
    krpano.value.set('view.vlookat', Math.random() * 180.0 - 90.0);
    krpano.value.set('view.fov', 80.0 + Math.random() * 100.0);
    krpano.value.set('view.distortion', Math.random() * 1.0);
  }
};
const lookToRandomView = () => {
  if (krpano) {
    krpano.value.call(
      'lookto(' +
        (Math.random() * 360.0 - 180.0) +
        ',' +
        (Math.random() * 180.0 - 90.0) +
        ',' +
        (80.0 + Math.random() * 100.0) +
        ')',
    );
  }
};
/*获取当前视图*/
const getCurrentView = () => {
  if (krpano) {
    let hlookat = krpano.value.get('view.hlookat');
    let vlookat = krpano.value.get('view.vlookat');
    let fov = krpano.value.get('view.fov');
    let distortion = krpano.value.get('view.distortion');
    console.log(
      'hlookat',
      hlookat.toFixed(2),
      '\n',
      'vlookat',
      vlookat.toFixed(2),
      '\n',
      'fov',
      fov.toFixed(2),
      '\n',
      'distortion',
      distortion.toFixed(2),
    );
  }
};
let trackMouseEnabled = false;
let trackMouseId = null;
let trackMouseValue = ref(null);
const mouseChange = () => {
  let mx = krpano.value.get('mouse.x');
  let my = krpano.value.get('mouse.y');
  let pnt = krpano.value.screentosphere(mx, my);
  let h = pnt.x;
  let v = pnt.y;
  trackMouseValue.value = `x:${mx},y:${my},ath:${h},atv:${v}`;
};
const trackMouse = () => {
  if (krpano) {
    if (!trackMouseEnabled) {
      trackMouseId = setInterval(mouseChange, 1000.0 / 60.0);
      trackMouseEnabled = true;
    } else {
      clearInterval(trackMouseId);
      trackMouseValue.value = null;
      trackMouseEnabled = false;
    }
  }
};

onMounted(() => {
  embedpano({
    swf: '/static/vtour/tour.swf',
    xml: '/static/vtour/tour.xml',
    target: 'pano',
    html5: 'auto',
    mobilescale: 1.0,
    passQueryParameters: true,
    onready: krpanoOnready,
    onerror: krpanoOnerror,
    consolelog: true,
  });
});
</script>

<template>
  <button @click="addHotsport">当前位置添加热点</button>
  <button @click="removeHotsport">移除所有热点</button>
  <button @click="loadXmlString">加载xml字符串</button>
  <button @click="loadPano">加载全景</button>
  <button @click="setRandomView">设置随机视图</button>
  <button @click="lookToRandomView">动画查看随机视图</button>
  <button @click="getCurrentView">获取当前视图</button>
  <button @click="trackMouse">跟踪鼠标位置</button>
  <span>{{ trackMouseValue ?? '' }}</span>
  <div class="container">
    <div id="pano"></div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
}
#pano {
  width: 100%;
  height: 90%;
}
</style>
