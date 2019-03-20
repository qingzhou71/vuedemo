<template>
  <div class="performance">
    
    <div class="layout-top">学生成绩管理</div>
    <div class='centermenu'>
      <sidemenu class="sidemenu"></sidemenu>
      <a-card class='score-card'>
      
        <a-row  >
        <a-col :sm='20' :md='10' class='select-col'>
          
            <span>请选择学年：</span>
          <a-select defaultValue="2019" @change="yearChange">   
            <!-- defaultValue的值是根据当前时间默认的 -->
            <!-- 这里的option应该是根据后台数组或者对象利用v-for渲染出来的，后续会改进 -->
            <a-select-option value="2018">2018</a-select-option>
            <a-select-option value="2019">2019</a-select-option>
            <a-select-option value="2018-2019" >2018-2019</a-select-option>
            <a-select-option value="2017">2017</a-select-option>
          </a-select>
          
        </a-col>
        <a-col :sm='20' :md='10' class='select-col'>
          
            <span>请选择学期：</span>
          <a-select defaultValue="lucy" @change="semesterChange">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
          
        </a-col>
      </a-row>
      <div class='search'>
        <a-button type='primary'>查询</a-button> 
      </div>
      <scorelist></scorelist>
    </a-card>
    </div>
    <div class="layout-bottom">这里可能会有一些文字吧</div>
  </div>
</template>

<script>
import sidemenu from "@/components/sidemenu";
import scorelist from "@/components/scoreList";
export default {
  
  name: "performance",
  data() {
    return {
      year:19,
      semester:2
    };
  },
  components: { sidemenu ,scorelist},
  methods: {
    addnum: function() {
      this.num++;
    },
    yearChange(value) {
      this.year=`selected ${value}`.slice(-2);
      console.log(`selected ${value}`);
      console.log(this.year);
      // 不一定需要slice，具体格式处理，看后台数据的要求
    },
    semesterChange(){

    }
  }
};
</script>

<style>
.performance {
  background-color: rgb(248, 248, 248);
  
  height: auto;
}
.centermenu{
position: relative;
}
.sidemenu {
  position: fixed;
  top:50px;
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
}
/* .ant-card {
  margin: 10px;
} */
.ant-select {
  width: 50%;
}
.select-col{
  margin: 5px auto;
}
.layout-bottom{
  width: 100%;
  height: 40px;
  /* position: absolute;
  bottom: 0; */
  text-align: center;
}
.score-card{
  width: 100%;
  margin: 20px 10px;
  min-height: 593px;
}

.search{
  margin: 10px 0;
}
@media screen and (min-width: 900px){
  .centermenu {
    flex-direction: row;
    display: flex;
  }
  .sidemenu{
    flex:0 0 130px;
    position: static;
    /* width: 130px !important; */
  }
  .score-card{
    flex: 1;
  }
}
</style>