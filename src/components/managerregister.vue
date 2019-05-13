<template>
  <div class="maregister">
    <a-card class="maregistercard">
      <signout class="manager-singnout"></signout>
      <a-input-search class="searchuser" placeholder="输入用户名进行查询" @search="onSearch" size="large"/>
      <div v-if="searchdata.username" class="userinfo">
        <a-row class="userlist">
          <a-col :span="8">学号：{{searchdata.username}}</a-col>
          <a-col :span="8">姓名：{{searchdata.name}}</a-col>
          <a-col :span="8">学院：{{searchdata.campus}}</a-col>
          <a-col :span="8">专业：{{searchdata.major}}</a-col>
          <a-col :span="8">宿舍：{{searchdata.dormitory}}</a-col>
          <a-col :span="8">政治面貌：{{searchdata.political}}</a-col>
        </a-row>
        <a-button v-if="searchdata.register" type="primary" class="rebutton" size="large" @click="register">注册</a-button>
        <a-button v-else type="primary" class="rebutton" size="large" disabled>已注册</a-button>
      </div>
      <a-table class="usertable" :columns="columns" :dataSource="datas" bordered></a-table>
    </a-card>
  </div>
</template>

<script>

import signout from "@/components/signout";

const columns = [
  {
    title: "学号",
    dataIndex: "username"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "学院",
    dataIndex: "campus"
  },
  {
    title: "专业",
    dataIndex: "major"
  },
  {
    title: "宿舍",
    dataIndex: "dormitory"
  },
  {
    title: "政治面貌",
    dataIndex: "political"
  }
];

const datas = [
  {
    username: "03151111",
    name: "测试一",
    campus: "通信与信息工程学院",
    major: "通信工程",
    dormitory: "长智一号楼",
    political: "群众",
    key: "03151111",
    register: true
  },
  {
    username: "03150202",
    name: "测试二",
    campus: "通信与信息工程学院",
    major: "信息安全",
    dormitory: "长智二号楼",
    political: "预备党员",
    key: "03150202",
    register: false
  },
  {
    username: "03150001",
    name: "测试三",
    campus: "电子工程学院",
    major: "电子信息工程",
    dormitory: "长智四号楼",
    political: "群众",
    key: "03150001",
    register: true
  },
  {
    username: "03150278",
    name: "测试四",
    campus: "电子工程学院",
    major: "微电子学系",
    dormitory: "长智四号楼",
    political: "群众",
    key: "03150278",
    register: true
  },
  {
    username: "03150223",
    name: "测试五",
    campus: "经济与管理学院",
    major: "经济学",
    dormitory: "长智二号楼",
    political: "共青团员",
    key: "03150223",
    register: true
  },
  {
    username: "03151021",
    name: "测试六",
    campus: "经济与管理学院",
    major: "工商管理",
    dormitory: "长智二号楼",
    political: "中共党员",
    key: "03151021",
    register: true
  }
];

export default {
  data() {
    return {
      columns,
      datas,
      searchdata: {}
    };
  },
  components:{signout},
  methods: {
    onSearch(value) {
      console.log(value);
      this.searchdata = this.datas.filter(item => item.username === value)[0];
      console.log(this.searchdata);
    },
    register(){
        console.log(this.searchdata.username);
        this.searchdata.register=false;
        // 根据学号put更改学生信息，then get信息，
    }
  }
};
</script>
<style>
.maregister {
  width: 100%;
  height: 100%;
}
.maregistercard {
  width: 98%;
  margin: 0 auto;
  max-width: unset;
  height: 100%;
  position: relative;
}
.searchuser {
  width: 50%;
  max-width: 600px;
  margin: 50px 20px;
}
.userinfo {
  border: 1px solid rgb(206, 206, 206);
  margin-bottom: 50px;
  border-radius: 10px;
  padding: 10px;
  /* font-size: 17px; */
}
.userinfo .ant-table{
  font-size: 15px;
}
.userlist {
  font-size: 18px;
  line-height: 50px;
}
.rebutton {
  margin: 20px auto;
  margin-left: 35%;
  width: 30%;
  max-width: 400px;
}
.usertable {
  font-size: 16px;
}
.manager-singnout {
  position: absolute;
  top: 20px;
  right: 5px;
}
</style>
