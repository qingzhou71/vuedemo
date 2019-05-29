<template>
  <div>
    <a-card style="width: 100%">
    <p>宿舍楼：{{this.dormitoryName}}</p>
    <p>宿舍号：{{this.dormRoom}}</p>
    <p>选择离宿时间：</p>
    <a-input placeholder="格式：2019-07-01"/><br/><br/>
    <!-- </a-card>
    <a-card style="width: 100%"> -->
      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
      <a-checkbox
        :indeterminate="indeterminate"
        @change="onCheckAllChange"
        :checked="checkAll"
      >
        选择宿舍损坏物品
      </a-checkbox>
    </div>
    <br />
    <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" /><br/><br/>
    <a-button @click="xiugai">修改</a-button>
    <a-button @click="confirm">提交</a-button>
    </a-card>
  </div>
</template>
<script>
import axios from 'axios'
const plainOptions = ['床板', '衣柜', '椅子', '桌子', '桌柜', '抽屉', '扶梯', '窗户', '水龙头', '瓷砖']
const defaultCheckedList = []
export default {
  data () {
    return {
      checkedList: defaultCheckedList,
      indeterminate: false,
      checkAll: false,
      plainOptions,
      dormitoryName:"",
      dormRoom:"",
      username:"",
      id:"",
    }
  },
  beforeCreate(){
    axios.get("/api/stu/me")
    .then((response,data) => {
      this.username = response.data.username;
      this.dormRoom = response.data.dormRoom;
      this.dormitoryName = response.data.dormitoryName;
      console.log(this.username);
    });
    axios.get("/api/stu/dorm")
    .then((response,data) => {
      console.log(response.data.id);
      if(response.data.id === "" || response.data.id === undefined){
        alert("没有查询到登记信息，请勿点击修改。");
      }else{
        this.id = response.data.id;
      }
    })
  },
  methods: {
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      })
    },
    confirm(){
      let datapost = {"defaultFacility ":this.plainOptions,
      "username":this.username,
      "finalFacility":this.checkedList,
      "leaveTime":new Date(this.value).getTime()};
      console.log(datapost)
      axios.post(`/api/stu/dormitory`,datapost)
      .then(res=>{
        console.log('res=>',res);
      }).catch((error) => {
      console.log(error)
      })
    },
    xiugai(){
      let dataput = {"defaultFacility ":this.plainOptions,
      "username":this.username,
      "finalFacility":this.checkedList,
      "leaveTime":new Date(this.value).getTime(),
      "id":this.id};
      console.log(dataput);
      axios.put(`/api/stu/dormitory`,dataput)
      .then(res=>{
        alert("修改成功");
        console.log('res=>',res);
      }).catch((error) => {
      console.log(error)
      })
    }
  },
}
</script>