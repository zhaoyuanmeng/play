<template>
  <h1>Canvas</h1>
  <canvas  width="600" height="600" class="can" id="canvas2"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {Arc, CanvasEngine, Rect, EventName} from 'ycanvas'
const el = ref<HTMLCanvasElement>();
// 实现平移的效果
onMounted(() => {
 const engine2 = new CanvasEngine({
      w: '200',
      h: '200',
      canvasTarget: '#canvas2'
    })
    const rect1 = new Rect(10, 20, 80, 80, 0)
    engine2.render(rect1, {
      color: 'purple'
    })

    // 思路是绑定拖拽事件

    engine2.addEventListener(rect1, EventName.click, (item) => {
      // 看看这里面能做哪些事情 这是点击事件了
      console.log(item,'item');
      // 我们能拿到item 这个item里面有很多的东西  
      alert('rect1 clicked')
    })
});
</script>

<style>
.can {
  background-color: rgb(158, 163, 163);
}
</style>
