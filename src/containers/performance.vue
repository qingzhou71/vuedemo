<template>
  <div class="performance">
    <div class="layout-top">
      学生成绩管理
      <!-- <signout class='per-singnout'></signout> -->
    </div>
    <div class="centermenu">
      <sidemenu class="sidemenu"></sidemenu>
      <a-card class="score-card">
        <a-row>
          <a-col :sm="20" :md="10" class="select-col">
            <span>请选择学年：</span>
            <a-select defaultValue="2018" @change="yearChange">
              <!-- defaultValue的值是根据当前时间默认的 -->
              <!-- 这里的option应该是根据后台数组或者对象利用v-for渲染出来的，后续会改进 -->
              <a-select-option value="2018">2018</a-select-option>
              <a-select-option value="2017">2017</a-select-option>
              <a-select-option value="2016">1016</a-select-option>
              <a-select-option value="2015">2015</a-select-option>
            </a-select>
          </a-col>
          <a-col :sm="20" :md="10" class="select-col">
            <span>请选择学期：</span>
            <a-select defaultValue="1" @change="semesterChange">
              <a-select-option value="全部">全部</a-select-option>
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <div class="search">
          <a-button type="primary" @click="searchsubmit">查询</a-button>
        </div>
        <!-- <scorelist :year='year' :semester='semester'></scorelist> -->
        <div class="scroe-list">
          <a-table :columns="columns" :dataSource="datas" bordered></a-table>
          <!-- 还有样式和字体需要调，以及动态的数据 -->
        </div>
      </a-card>
    </div>
    <div class="layout-bottom">@轻舟</div>
  </div>
</template>

<script>
import sidemenu from "@/components/sidemenu";
import signout from "@/components/signout";
const columns = [
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
    dataIndex: "name"
  },
  {
    title: "课程性质",
    dataIndex: "nature"
  },
  {
    title: "学分",
    dataIndex: "credit"
  },
  {
    title: "成绩",
    dataIndex: "score"
  },
  {
    title: "开课学院",
    dataIndex: "affiliated-campus"
  },
  {
    title: "备注",
    dataIndex: "remark"
  }
];
export default {
  // beforeCreate(){
  //   if(localstorage.getItem('role')!=='学生'){
  //     this.$router.push({path:'/login'});
  //   }
  // },
  name: "performance",
  data() {
    return {
      year: 2018,
      semester: 1,
      columns: columns,
      datas: []
    };
  },
  beforeCreate() {},
  beforeMount() {
    console.log(this.year);
    fetch(`/api/mock/stu/score/03151285`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        for (var keys in res) {
          if (this.year == keys.slice(0, 4)) {
            console.log(res[keys][this.semester]);
            res[keys][this.semester].map(item => {
              item.year = this.year;
              item.semester = this.semester;
            });
            this.datas = res[keys][this.semester];
          }
        }
      });
  },
  components: { sidemenu,  signout },
  methods: {
    addnum: function() {
      this.num++;
    },
    yearChange(value) {
      // this.year=`selected ${value}`.slice(-2);
      this.year = value;
      console.log(`selected ${value}`);
      console.log(this.year);
      // 不一定需要slice，具体格式处理，看后台数据的要求
    },
    semesterChange(value) {
      this.semester = value;
    },
    searchsubmit() {
      // 以保存的查询条件来请求数据，或许不在这里，但方法是这样的，获取到后将数据存入data 变量中，以props传到scroelist组件，watch监测
      //数据变化，动态渲染列表。
       fetch(`/api/mock/stu/score/03151285`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        for (var keys in res) {
          if (this.year == keys.slice(0, 4)) {
            if(this.semester==='全部'){
              const count=res[keys][1].length;
              res[keys][1].push.apply(res[keys][1],res[keys][2])
              res[keys][1].map((item,index)=>{
                item.year=this.year;
                item.key=index;
                if(index<count){
                  item.semester=1;
                }else{
                item.semester=2;
                }
              })
              this.datas=res[keys][1]
            }else{
            res[keys][this.semester].map((item,index) => {
              item.year = this.year;
              item.semester = this.semester;
              item.key=index;
            });
            this.datas = res[keys][this.semester];
            }
          }
        }
      });
    }
  }
};
</script>

<style>
.performance {
  background-color: rgb(248, 248, 248);

  height: 90%;
}
.centermenu {
  position: relative;
  height: 95%;
}
.sidemenu {
  position: fixed;
  top: 50px;
}

.layout-top {
  width: 100%;
  height: 50px;
  background-color: rgb(71, 71, 250);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: white;
  font-weight: bolder;
  line-height: 50px;
  text-align: center;
  position: relative;
}
/* .ant-card {
  margin: 10px;
} */
.ant-select {
  width: 50%;
}
.select-col {
  margin: 5px auto;
}
.layout-bottom {
  width: 100%;
  height: 40px;
  /* position: absolute;
  bottom: 0; */
  text-align: center;
}
.score-card {
  width: 100% !important;
  margin: 20px 10px !important;
  min-height: 593px;
  /* height: 95%; */
  max-width: unset !important;
}

.search {
  margin: 10px 0;
}
@media screen and (min-width: 900px) {
  .centermenu {
    flex-direction: row;
    display: flex;
  }
  .sidemenu {
    flex: 0 0 130px;
    position: static;
    /* width: 130px !important; */
  }
  .score-card {
    flex: 1;
  }
}

.per-singnout {
  position: absolute;
  top: 0px;
  right: 5px;
  color: white;
}
.per-singnout:hover {
  color: black;
}
.scroe-list {
  width: 100%;
  overflow: scroll;
  margin-top: 10px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  white-space: nowrap;
  overflow: hidden;
  padding: 10px;
  text-align: center;
}
</style>