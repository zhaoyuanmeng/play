<template>
  <div>json数据导出成excel数据</div>
  <button @click="exportExcel">点击导出</button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';
const json2Excel = function (
  data: any[],
  sheetName: string = 'sheet1',
  fileName: string = 'json2Excel.xlsx',
) {
  const jsonWorkSheet = XLSX.utils.json_to_sheet(data);

  const workBook = {
    SheetNames: [sheetName], // 指定有序 sheet 的 name
    Sheets: {
      [sheetName]: jsonWorkSheet, // 表格数据内容
    },
  };
  // C:\Users\Administrator\Downloads 默认下载到这里
  return XLSX.writeFile(workBook, fileName); // 向文件系统写出文件
};

// 测试的 JSON 数据
const jsonData = [
  {
    name: '张三1',
    age: 18,
    skill: '干饭1',
    telephone: 20200825,
    address: '宇宙尽头1',
  },
  {
    name: '张三2',
    age: 19,
    skill: '干饭2',
    telephone: 20200826,
    address: '宇宙尽头2',
  },
  {
    name: '张三3',
    age: 20,
    skill: '干饭3',
    telephone: 20200827,
    address: '宇宙尽头3',
  },
  {
    name: '张三4',
    age: 21,
    skill: '干饭4',
    telephone: 20200828,
    address: '宇宙尽头4',
  },
  {
    name: '张三5',
    age: 22,
    skill: '干饭5',
    telephone: 20200829,
    address: '宇宙尽头5',
  },
  {
    name: '张三6',
    age: 23,
    skill: '干饭6',
    telephone: 20200830,
    address: '宇宙尽头6',
  },
  {
    name: '张三7',
    age: 24,
    skill: '干饭7',
    telephone: 20200831,
    address: '宇宙尽头7',
  },
  {
    name: '张三8',
    age: 25,
    skill: '干饭8',
    telephone: 20200832,
    address: '宇宙尽头8',
  },
  {
    name: '张三9',
    age: 26,
    skill: '干饭9',
    telephone: 20200833,
    address: '宇宙尽头9',
  },
  {
    name: '张三10',
    age: 27,
    skill: '干饭10',
    telephone: 20200834,
    address: '宇宙尽头10',
  },
];

// key -> name 的映射
const excelKeyToName: any = {
  name: '姓名',
  age: '年龄',
  skill: '特长',
  telephone: '电话',
  address: '地址',
};

// 导出 Excel 文件
const exportExcel = () => {
  // 格式化参数
  const data = jsonData.map((item) => {
    const newItem: any = {};
    Object.keys(item).forEach((key) => {
      newItem[excelKeyToName[key]] = item[key];
    });
    return newItem;
  });
  // 导出 Excel
  json2Excel(data);
};
</script>

<style lang="scss" scoped></style>
