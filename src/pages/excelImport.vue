<template>
  <div>导入excel文件并解析成json</div>
  <input
    type="file"
    ref="excelRef"
    :accept="props.accept"
    @change="onChange"
    class="excel"
  />
  <h1>解析数据：</h1>
  <h2>
    <code>{{ excelData }}</code>
  </h2>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import * as XLSX from 'xlsx';
interface Props {
  accept: string;
}

const props = withDefaults(defineProps<Props>(), {
  accept:
    '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});

const excelRef: any = ref(null);
let excelData: any[] = reactive([]);

// 读取对应表格文件
const readerExcel = (file: File) => {
  const fileReader = new FileReader();

  // 以二进制的方式读取表格内容
  fileReader.readAsBinaryString(file);

  // 表格内容读取完成
  fileReader.onload = (event: any) => {
    try {
      const fileData = event.target.result;
      const workbook = XLSX.read(fileData, {
        type: 'binary',
      });

      // 表格是有序列表，因此可以取多个 Sheet，这里取第一个 Sheet
      const wsname = workbook.SheetNames[0];
      // 将表格内容生成 json 数据
      const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
      Object.assign(excelData, sheetJson);
      console.log(sheetJson); // 得到的表格 JSON 内容
    } catch (e) {
      console.log(e);
      return false;
    }
  };
};

// 文件变化时触发
const onChange = (event: any) => {
  // 获取文件对象
  const file = event.target.files[0];

  // 读取文件内容
  readerExcel(file);

  // 清除数据
  clearFile();
};

const clearFile = () => {
  excelRef.value.value = '';
};
</script>
