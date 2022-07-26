<template>
  <h1>Canvas</h1>
  <canvas ref="el" width="600" height="600" class="can"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const el = ref<HTMLCanvasElement>();

onMounted(() => {
  const canvas = el.value!;
  const ctx = canvas.getContext('2d');

  // 入口文件
  function main() {
    let { hour, min, sec } = initTime();
    init();
    initBig();
    initSmall();
    initHour();
    initMin();
    initSecond();
    initKeDu();

    // 初始化中心点的
    function init() {
      ctx?.save();
      ctx?.clearRect(0, 0, 600, 600);
      ctx?.translate(300, 300);
      (ctx as any).strokeStyle = '#fff';
      ctx?.save();
    }
    // 画大园
    function initBig() {
      ctx?.beginPath();
      // 画圆线使用arc(中心点X,中心点Y,半径,起始角度,结束角度)
      ctx?.arc(0, 0, 100, 0, 2 * Math.PI);
      ctx?.stroke();
      ctx?.closePath();
    }
    // 画小圆
    function initSmall() {
      ctx?.beginPath();
      ctx?.arc(0, 0, 5, 0, 2 * Math.PI);
      ctx?.stroke();
      ctx?.closePath();
    }
    // 设置时间的
    function initTime() {
      let time = new Date();
      let hour = time.getHours() % 12;
      let min = time.getMinutes();
      let sec = time.getSeconds();
      return {
        hour,
        min,
        sec,
      };
    }
    // 设置时针
    function initHour() {
      ctx?.rotate(
        ((2 * Math.PI) / 12) * hour +
          ((2 * Math.PI) / 12) * (min / 60) -
          Math.PI / 2,
      );
      ctx?.beginPath();
      // moveTo设置画线起点
      ctx?.moveTo(-10, 0);
      // lineTo设置画线经过点
      ctx?.lineTo(40, 0);
      // 设置线宽
      (ctx as any).lineWidth = 10;
      ctx?.stroke();
      ctx?.closePath();
      // 恢复成上一次save的状态
      ctx?.restore();
      // 恢复完再保存一次
      ctx?.save();
    }
    // 设置分针
    function initMin() {
      ctx?.rotate(
        ((2 * Math.PI) / 60) * min +
          ((2 * Math.PI) / 60) * (sec / 60) -
          Math.PI / 2,
      );
      ctx?.beginPath();
      ctx?.moveTo(-10, 0);
      ctx?.lineTo(60, 0);
      (ctx as any).lineWidth = 5;
      (ctx as any).strokeStyle = 'blue';
      ctx?.stroke();
      ctx?.closePath();
      ctx?.restore();
      ctx?.save();
    }
    // 设置秒针
    function initSecond() {
      ctx?.rotate(((2 * Math.PI) / 60) * sec - -Math.PI / 2);
      ctx?.beginPath();
      ctx?.moveTo(-10, 0);
      (ctx as any).lineTo(80, 0);
      (ctx as any).strokeStyle = 'red';
      ctx?.stroke();
      ctx?.closePath();
      ctx?.restore();
      ctx?.save();
    }
    // 设置刻度
    function initKeDu() {
      (ctx as any).lineWidth = 1;
      for (let i = 0; i < 60; i++) {
        ctx?.rotate((2 * Math.PI) / 60);
        ctx?.beginPath();
        ctx?.moveTo(90, 0);
        ctx?.lineTo(100, 0);
        // ctx.strokeStyle = 'red'
        ctx?.stroke();
        ctx?.closePath();
      }
      ctx?.restore();
      ctx?.save();
      (ctx as any).lineWidth = 5;
      for (let i = 0; i < 12; i++) {
        ctx?.rotate((2 * Math.PI) / 12);
        ctx?.beginPath();
        ctx?.moveTo(85, 0);
        ctx?.lineTo(100, 0);
        ctx?.stroke();
        ctx?.closePath();
      }
      ctx?.restore();
      ctx?.restore();
    }
  }
  setInterval(main, 1000);
});
</script>

<style>
.can {
  background-color: rgb(158, 163, 163);
}
</style>
