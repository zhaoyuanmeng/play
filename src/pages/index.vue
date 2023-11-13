<template>
  <div id="H5Video">
    <div id="player" style="width: 400px; height: 400px"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import {selectById} from '@/api/test'
import josnData from '@/data.json'
let player = ref({});
function createPlayer() {
  player.value = new window.JSPlugin({
    szId: 'player',
    szBasePath: './',
    iMaxSplit: 4,
    iCurrentSplit: 1,
    openDebug: true,
  });
}

function init() {
  // 设置播放容器的宽高并监听窗口大小变化
  window.addEventListener('resize', () => {
    player.value.JS_Resize();
  });
}

// 播放
function realplay() {
  let index = player.value.currentWindowIndex;
  let playURL = 'ws://203.110.222.92:559/openUrl/i1UQDFS';
  player.value.JS_Play(playURL, { playURL, mode: 1 }, index).then(
    () => {
      console.log('realplay success');
    },
    (e) => {
      console.error(e);
    },
  );
}

// init();


// 调用接口逻辑
async function handelApi() {

  let id = '7b85be9a-46da-4b67-9f69-ea9023bcc68e'
  // 我们需要把数据放到
  let keys = Object.keys(josnData).map((key)=>key)
  console.log('keys',keys)
  // ['三号楼', '四号楼', '五号楼', '六号楼']
  let resData = {}

   keys.map(async (key)=>{
     resData[key] = []
   josnData[key].map(async (it)=>{
      let id =  it.id
      let res =  await  selectById(id)
      console.log('res',res)
      let arr = res.data
     arr.map((item)=>{
       let obj = {
         "id": item.id,
         "code": item.code,
         "title":  item.title,
       }
       if(item.subnodes){
         obj.subnodes = item.subnodes.map((item)=>{
           return {
             "id": item.id,
             "code": item.code,
             "title": item.title,
           }
         })
       }else{
         obj.subnodes = []
       }
       resData[key].push(obj)
     })

    })
    console.log('resData[key]',resData[key])
  })

  setTimeout(()=>{
    console.log('aaaaaaaa',resData)
  },4000)
}

//写入文件，会完全替换之前JSON文件中的内容
function writeData(value) {
  let str = JSON.stringify(value, "", "\t");
  fs.writeFile('./json.json', str, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('写入成功!');
  })
}
//读取文件然后在原有文件内容的基础上添加内容，如果key名重复则覆盖
function addData(value) {
  fs.readFile('./json.json', "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    }
    let person = JSON.parse(data);
    person[obj1.objName] = value;
    let str = JSON.stringify(person, "", "\t");
    fs.writeFile('./json.json', str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('新增成功!');
    })
  })
}




onMounted(() => {
  setTimeout(() => {
    createPlayer();
    realplay();
    init();
  }, 10);
  handelApi()
  console.log('aaaaaaaa',josnData)
});
</script>

<style scoped>


</style>
