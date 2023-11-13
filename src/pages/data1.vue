<template>
  <div>子组件数据{{}}</div>
  <div @click="handelAdd">添加</div>
</template>

<script setup>
import { ref, watch ,onMounted} from 'vue';
let props = defineProps(['data']);
const emit = defineEmits(['update']);
let data = ref([])
// 添加
function handelAdd() {
  // 这个是你的值
  let data = {};
  emit('update', data);
}
watch(
  () => props.data,
  (newVal) => {
    // props 值改变的逻辑
    data.value = newVal
  },
  immediate:true
);

onMounted(() => {
  data.value = props.data
})
</script>
