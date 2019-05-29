//离校管理卡务中心学生需提交的表单
<template>
  <a-card title="一卡通">
    <p>姓名：{{this.name}}</p>
    <p>学号：{{this.username}}</p>
    <p>余额：¥  {{this.balance}}元</p>
    <a-button @click="zhuxiao" :disabled="iszhuxiao">注销</a-button>
  </a-card>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      username:"",
      name:"",
      balance:"",
      id:"",
      iszhuxiao:localStorage.getItem('iszhuxiao'),
    }
  },
  beforeCreate(){
    axios.get("/api/stu/me")
    .then((response,data) => {
      this.username = response.data.username;
      this.name = response.data.name;
    });
    axios.get("/api/stu/card")
    .then((response,data) => {
      this.balance = response.data.balance;
      this.id = response.data.id;
      console.log(response.data);
    });
  },
  methods:{
    zhuxiao(){
      let dataput = {"id":this.id,"cancel":true};
      console.log(dataput);
      axios.put(`/api/stu/card`,dataput)
      .then(res=>{
        alert("注销成功！");
        this.iszhuxiao = true;  
        localStorage.setItem('iszhuxiao',true);
        console.log('res=>',res);
      }).catch((error) => {
      console.log(error)
      })
    }
  }
}
</script>