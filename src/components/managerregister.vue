<template>
  <div class="maregister">
    <a-card class="maregistercard">
      <signout class="manager-singnout"></signout>
      <a-input-search class="searchuser" placeholder="输入用户名进行查询" @search="onSearch" size="large"/>
      <div v-if="searchdata.username" class="userinfo">
        <a-row class="userlist">
          <a-col :span="8">学号：{{searchdata.username}}</a-col>
          <a-col :span="8">姓名：{{searchdata.name}}</a-col>
          <a-col :span="8">学院：{{searchdata.campusname}}</a-col>
          <a-col :span="8">专业：{{searchdata.majorName}}</a-col>
          <a-col :span="8">宿舍：{{searchdata.dormitoryName}}</a-col>
          <a-col :span="8">政治面貌：{{searchdata.politicalName}}</a-col>
        </a-row>
        <a-button
          v-if="register"
          type="primary"
          class="rebutton"
          size="large"
          @click="registered"
        >注册</a-button>
        <a-button v-else type="primary" class="rebutton" size="large" disabled>注册</a-button>
        
      </div>
      <a-table class="usertable" :columns="columns" :dataSource="datas" bordered></a-table>
    </a-card>
  </div>
</template>

<script>
import signout from "@/components/signout";

const basecolumns = [
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
    dataIndex: "campusname"
  }
  // {
  //   title:'性别'
  // }
];
const camcolumns = [
  {
    title: "专业",
    dataIndex: "majorName"
  },
  {
    title: "年级",
    dataIndex: "grade"
  },
  {
    title: "班级",
    dataIndex: "classname"
  }
];
const dormcolumns = [
  {
    title: "宿舍楼",
    dataIndex: "dormitoryName"
  },
  {
    title: "宿舍号",
    dataIndex: "dormRoom"
  }
];
const orgcolumns = [
  {
    title: "生源地",
    dataIndex: "residence"
  },
  {
    title: "政治面貌",
    dataIndex: "politicalName"
  }
];
const fincolumns = [
  {
    title: "班级",
    dataIndex: "classname"
  },
  {
    title: "宿舍",
    dataIndex: "dormitoryName"
  }
];
const datas = [];

export default {
  data() {
    return {
      columns: basecolumns,
      datas,
      searchdata: {},
      department: "",
      campusid: 0,
      tagsname: "学院管理处", // 应该是组件的传参值
      selfseq: 0,
      campusdata: [],
      status:[],
      stustatus:[],
      adminstatus:[],
      register:true,
      statusid:0
    };
  },
  beforeCreate() {
    fetch(`/api/admin/me`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res.authorities[0].authority);
        this.department = res.authorities[0].authority;

        if (this.department.slice(-2) === "学院") {
          this.columns = basecolumns.concat(camcolumns);
        } else if (this.department.substr(2, 2) === "公寓") {
          this.columns = basecolumns.concat(dormcolumns);
        } else if (this.department === "财务处") {
          this.columns = basecolumns.concat(fincolumns);
        } else {
          this.columns = basecolumns.concat(orgcolumns);
        }

        fetch(`/api/campus`, {
          method: "GET"
        })
          .then(res => {
            return res.json();
          })
          .then(res => {
            this.campusdata = res.content;
            if (this.department.slice(-2) === "学院") {
              this.campusid = res.content.filter(
                item => item.name === this.department
              )[0].id;

              fetch(`/api//admin/stu/campus/${this.campusid}`, {
                method: "GET"
              })
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  console.log(res.content);
                  this.datas = res.content;
                  this.datas.map((item, index) => {
                    item.campusname = item.campus.name;
                    item.sex = item.male ? "男" : "女";
                    item.key = index;
                  });
                });

              fetch(`/api/reporting/${this.campusid}`, {
                method: "GET"
              })
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  console.log(res);
                  res.process.map(item => {
                    if (item.tag === this.tagsname) {
                      this.selfseq = item.seq;
                    }
                  });
                });
            } else if (this.department.substr(2, 2) === "公寓") {
              console.log("123456");
              //获取所有学生信息，通过宿舍名称来筛选所需要的数据

              fetch(`/api/admin/stu`, {
                method: "GET"
              })
                .then(res => {
                  return res.json();
                })
                .then(data => {
                  this.datas = data.content;
                  this.datas.map((item, index) => {
                    item.campusname = item.campus.name;
                    item.sex = item.male ? "男" : "女";
                    item.key = index;
                  });
                  this.datas = this.datas.filter(
                    item => item.dormitoryName === this.department
                  );
                });
            } else {
              console.log(this.department.substr(2, 2));
              fetch(`/api/admin/stu`, {
                method: "GET"
              })
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  this.datas = res.content;
                  this.datas.map((item, index) => {
                    item.campusname = item.campus.name;
                    item.sex = item.male ? "男" : "女";
                    item.key = index;
                  });
                });
              fetch(`/api/reporting/${this.campusid}`, {
                method: "GET"
              })
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  console.log(res);
                  res.process.map(item => {
                    if (item.tag === this.tagsname) {
                      this.selfseq = item.seq;
                    }
                  });
                });
            }
          });
      });
  },
  components: { signout },
  methods: {
    onSearch(value) {
      this.searchdata = this.datas.filter(item => item.username === value)[0];
      this.campusid = this.campusdata.filter(
        item => item.name === this.searchdata.campusname
      )[0].id;

      fetch(`/api/reporting/${this.campusid}`, {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
          res.process.map(item => {
            if (item.tag === this.tagsname) {
              this.selfseq = item.seq;
            }
          });
         fetch(`/api/admin/stu/reporting/${this.searchdata.username}`,{
           method:"GET"
         }).then(res=>{
           if(res.status===200){
           return res.json()
           }
           else if(res.status===500){
             alert('该学生没有报道流程')
             this.register=false;
             return 
           }
         }).then(res=>{
           console.log(res)
           if(res.adminStatus===''){
            //  this.register=true;
            if(this.selfseq!==1){
              this.register=false;
              alert('学生尚未完成上一步注册')
            }
            else{
              this.register=true;
              this.statusid=res.id;
            }
           }
           else{
             this.stustatus=res.stuStatus.split('，');
           this.adminstatus=res.adminStatus.split('，');
           this.statusid=res.id;
           console.log(res.stuStatus)
           console.log(this.stustatus)
          //  console.log(this.status[this.status.length-1])
           if(this.selfseq-1==this.stustatus[this.stustatus.length-1]||res.stuStatus===''){
             if(this.selfseq-1==this.adminstatus[this.adminstatus.length-1]){
               this.register=true;
             }
             else{
               this.register=false;
               alert('该流程已在管理员处注册')
             }
           }
           else{
             this.register=false;
             alert('学生尚未完成上一步注册')
           }
           }
           
         })
        });
    },

    registered() {
      console.log(this.searchdata.username);
      this.register = false;
      // this.searchdata.adminStatus=this.status.push(this.selfseq).join(',');
      this.adminstatus.push(this.selfseq)
      console.log(this.adminstatus.join(','))
      // console.log(this.searchdata.stuStatus)
      if(this.stustatus.length===0){
        this.stustatus=''
        console.log('123456')
      }
      else{
        this.stustatus=this.stustatus.join(',')
      }
      console.log(this.stustatus)
      // 根据学号put更改学生信息，then get信息，
      fetch(`/api/stu/reporting`,{
        method:'PUT',
         headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        adminStatus:this.adminstatus.join(','),
        id:this.statusid,
        stuStatus:this.stustatus,
        finish:false,
        username:this.searchdata.username
      })
      }).then(res=>{
        return 
      })
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
.userinfo .ant-table {
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
