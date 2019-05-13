<template>
  <div class="scroe-list">
    <a-table :columns='columns' :dataSource='datas' bordered></a-table>
    <!-- 还有样式和字体需要调，以及动态的数据 -->
  </div>
</template>

<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "学年",
    dataIndex: "year"  
  },
  {
    title: "学期",
    dataIndex: "semester"  
  },
  {
    title: "课程名称",
    dataIndex: "coursename" ,
    // width:140 width的设置并没有用，ui的问题吧
  },
  {
    title: "课程性质",
    dataIndex: "course"  
  },
  {
    title: "学分",
    dataIndex: "credits"  
  },
  {
    title: "成绩",
    dataIndex: "score"  
  },
  {
    title: "备注",
    dataIndex: "remark"  
  },
];
const datas=[
    {
        name:'测试一',
        year:'2019',
        semester:'1',
        coursename:'通信原理',
        course:'必修',
        credits:'5.0',
        score:'89',
        remark:'',
        key:'1'
    },
    {
        name:'测试二',
        year:'2019',
        semester:'2',
        coursename:'数字组合逻辑电路',
        course:'必修',
        credits:'3.0',
        score:'66',
        remark:'',
        key:'2'
    },
    {
        name:'测试三',
        year:'2019',
        semester:'2',
        coursename:'数字信号处理',
        course:'必修',
        credits:'4.0',
        score:'98',
        remark:'',
        key:'3'
    },
    {
        name:'测试四',
        year:'2019',
        semester:'2',
        coursename:'中国近现代史',
        course:'必修',
        credits:'6.0',
        score:'83',
        remark:'',
        key:'4'
    },
    {
        name:'测试五',
        year:'2019',
        semester:'1',
        coursename:'无线通信',
        course:'必修',
        credits:'4.0',
        score:'78',
        remark:'',
        key:'5'
    },
    {
        name:'测试六',
        year:'2019',
        semester:'2',
        coursename:'现代通信网',
        course:'必修',
        credits:'4.0',
        score:'80',
        remark:'',
        key:'6'
    },
    {
        name:'测试七',
        year:'2019',
        semester:'2',
        coursename:'下一代互联网',
        course:'必修',
        credits:'2.0',
        score:'62',
        remark:'',
        key:'7'
    },
    {
        name:'测试八',
        year:'2019',
        semester:'2',
        coursename:'高频电子线路',
        course:'必修',
        credits:'3.0',
        score:'80',
        remark:'',
        key:'8'
    },
]
export default {
  name: "scroe-list",
  data(){
      return {
          columns,
          datas
      }
  }
};
</script>

<style>
.scroe-list{
    width: 100%;
    overflow: scroll;
    margin-top: 10px;
     
}
.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
white-space:nowrap;
 overflow:hidden;
padding: 10px;
text-align: center
}
/* .ant-table-tbody > tr{
    border-top: 1px;
} */
/* .ant-table-thead > tr > th{
    text-align: center
} */
</style>
