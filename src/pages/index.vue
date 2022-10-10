<template>
  <h1>测试 vueUse 的鼠标坐标</h1>
  <h3>Mouse: {{ x }} x {{ y }}</h3>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useMouse } from '@vueuse/core';

export default defineComponent({
  name: 'VueUse',
  setup() {
    const test: any = (a: any) => {
      let b = a;
      b.name = 'asda';
      console.log(a);
    };
    let obj = {
      name: 'zyd',
    };

    test(obj);

    console.log(obj);
    const { x, y } = useMouse();
    let test1 = 'bbbb';
    return {
      x,
      y,
    };
  },
});
</script>
