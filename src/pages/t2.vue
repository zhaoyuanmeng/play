<template>
  <div>拖拽文件上传</div>
  <div ref="dragE" class="drag">
    <div class="drag-icon-box">
      <!-- 采用的是 element-ui 的图标 -->
      111
    </div>
    <div class="drag-message">
      <span class="drag-message-title">将文件拖动到此处，或</span>
      <label for="file" class="drag-message-label">
        <input
          class="drag-message-input"
          type="file"
          id="file"
          name="file"
          @change="handleFileChange"
        />
        <span class="drag-message-manual">点击上传</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
let file = ref<any>();
const dragE = ref<HTMLElement>();
// 这是接口取消的函数
let cancelFn = ref<any>();
const handleFileChange = (e: any) => {
  const files = e.target.files[0];
  if (!files) return;
  file = files;
  uploadFile();
};
const uploadFile = async () => {
  const form = new FormData();
  form.append('name', 'file');
  form.append('file', file as any);
  // formdata数据是不能直接console.log();打印出来的 需要西面的查看
  // for (var key of form.entries()) {
  //   console.log(key[0] + ', ' + key[1]);
  // }
  // 请求接口
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const res = await axios.post('/upload', form, {
    cancelToken: source.token,
  });
  cancelFn = source.cancel as any;
};

onMounted(() => {
  function bindEvent() {
    const drag = dragE.value!;
    drag.addEventListener('dragover', (e) => {
      e.preventDefault();
      drag.style.borderColor = 'red';
    });

    // 被拖动的对象离开目标容器
    drag.addEventListener('dragleave', (e) => {
      e.preventDefault();
      drag.style.borderColor = '#eee';
    });
    // 被拖动的对象进入目标容器，释放鼠标键
    drag.addEventListener('drop', (e) => {
      e.preventDefault();
      drag.style.borderColor = '#eee';
      const fileList = (e.dataTransfer as any).files;
      file = fileList[0];
      uploadFile();
    });
  }

  bindEvent();
});
</script>

<style lang="scss" scoped>
.drag {
  width: 660px;
  height: 300px;
  border: 2px dashed;
  border-color: #a3a3a3;
  border-radius: 5px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .drag-icon-box {
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 50px;
    line-height: 60px;
    color: #606266;
  }
  .drag-message {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    .drag-message-title {
      font-size: 14px;
      color: #606266;
    }
    .drag-message-label {
      width: 120px;
      height: 50px;
      height: auto;
      position: relative;
      overflow: hidden;
      .drag-message-input {
        position: absolute;
        left: -100px;
        top: -100px;
        z-index: -1;
        display: none;
      }
      .drag-message-manual {
        font-size: 14px;
        color: #4b87ff;
        cursor: pointer;
      }
    }
  }
}
</style>
