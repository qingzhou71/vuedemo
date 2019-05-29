//离校管理学生图书界面表格数据
<template>
  <a-table :columns="columns" :dataSource="data">
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="pink" :key="tag">{{tag}}</a-tag>
    </span>
  </a-table>
</template>
<script>
const columns = [{
  title: '书籍名称',
  dataIndex: 'name',
  key: 'name',
},{
  title: '所属类别',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags'},
},{
  title: '借阅日期',
  dataIndex: 'bdate',
  key: 'bdate',
},{
  title: '归还日期',
  dataIndex: 'rdate',
  key: 'rdate',
},{
    title:'状态',
    dataIndex:'status',
    key:'status',
},{
    title:'备注',
    dataIndex:'remark',
    key:'remark',
}];

const data = [{
  key: '1',
  name: '《傲慢与偏见》',
  tags: ['国外名著','文学'],
  bdate:'2015.12.20',
  rdate:'2016.1.10',
  status:'按时归还',
  remark:'',
},{
  key: '2',
  name: '《朝花夕拾》',
  tags: ['国内名著','文学'],
  bdate:'2016.05.12',
  rdate:'2016.05.22',
  status:'按时归还',
  remark:'',
},{
  key: '3',
  name: '《Vue.js实战》',
  tags: ['计算机技术'],
  bdate:'2017.10.20',
  rdate:'2017.11.10',
  status:'按时归还',
  remark:'',
}];

export default {
  data() {
    return {
      data,
      columns,
    }
  }
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
.ant-table-wrapper{
  overflow-x: scroll;
}
</style>
