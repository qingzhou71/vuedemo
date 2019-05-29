//离校管理财务处学生缴费清单展示
<template>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      data,
    }
  },
  beforeCreate(){
    var i = 0;
    axios.get("/api/stu/finance")
    .then((response,data,content) => {
      response.data.content.map(item=>{
        console.log(item)
        this.time = new Date(item.paymentTime).toLocaleDateString().replace(/\//g, "-");
        console.log(this.time);
        i++;
      })
      this.data = response.data.content;
      console.log(this.data);
      console.log(i)
      if(i === 4){
        // alert("无清欠学费！可提交")
      }else{
        // alert("清欠余额，无法提交。")
      }
      
    })
  },
}
</script>

<style>
.booklist{
    width: 100%;
    overflow: scroll;
    margin-top: 10px;
    text-align: center !important;
}
.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
  white-space:nowrap;
  overflow:hidden;
  padding: 10px;
  text-align: center
}
</style>
