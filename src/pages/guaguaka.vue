<template>
  <canvas ref="el" width="400" height="100" class="can"></canvas>
  <div class="text">恭喜您获得1000w</div>
</template>

<script lang="ts" setup>
// 1 底下答案是一个div，顶部灰皮是一个canvas，canvas一开始盖住div
// 2 鼠标事件，点击时并移动时，鼠标经过的路径都画圆形开路，
// 并且设置globalCompositeOperation为destination-out，
// 使鼠标经过的路径都变成透明，一透明，自然就显示出下方的答案信息。

import { onMounted, ref } from 'vue';
const el = ref<HTMLCanvasElement>();
interface Point {
  x: number;
  y: number;
}
onMounted(() => {
  const canvas = el.value!;
  const ctx = canvas.getContext('2d');
  // 表示当前用户是否是在刮卡
  let isDraw = false;
  function init() {
    // 设置填充的颜色
    ctx!.fillStyle = 'darkgray';

    // 填充矩形
    ctx?.fillRect(0, 0, 400, 100);

    ctx!.fillStyle = '#fff';

    // 绘制填充文字
    ctx!.fillText('刮刮卡', 180, 50);
  }
  // 设置事件系统
  function initEvent() {
    // 注意这个是针对canvas那一层级的

    // 鼠标按下的事件
    canvas!.onmousedown = function (e) {
      console.log('onmousedown');

      isDraw = true;
    };

    // 鼠标抬起的事件
    canvas!.onmouseup = function (e) {
      console.log('onmouseup');

      isDraw = false;
    };

    // 鼠标移动的事件
    canvas!.onmousemove = function (e) {
      console.log('onmousemove');

      // 这里写主要的逻辑
      if (!isDraw) return;

      // 计算鼠标在canvas里的位置 （后期可以考虑使用vueuse里面的hooks做）
      const point: Point = {
        x: e.pageX - canvas.offsetLeft,
        y: e.pageY - canvas.offsetTop,
      } as Point;
      // 设置globalCompositeOperation
      ctx!.globalCompositeOperation = 'destination-out';
      // 画园
      ctx!.arc(point.x, point.y, 10, 0, 2 * Math.PI);

      // 填充图形
      ctx!.fill();
    };
  }
  function main() {
    init();
    initEvent();
  }
  main();
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.text {
  position: absolute;
  left: 130px;
  top: 35px;
  color: black;
  z-index: -1;
}
</style>
