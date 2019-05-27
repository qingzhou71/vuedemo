<template>
  <div class='campuses'>
      <div class='managermenu'>
    <a-menu
      :defaultSelectedKeys="['1']"
      mode="inline"
      theme="dark"
      style="height:100%"
      @select="selected"
    >
      <a-menu-item key='1' class='menuItems'>业务管理</a-menu-item>
      <a-menu-item key='2' class='menuItems'>注册管理</a-menu-item>
    </a-menu>
      </div>

    <!-- <process v-if='process'></process> -->
    <operation v-if='process' department='专业'></operation>
    <register v-else></register>
  </div>
</template>
<script>
// import process from "@/components/process";
import operation from '@/components/operation'
// import managermenu from "@/components/managermenu";
import register from '@/components/managerregister'
export default {
  components: { register,operation },
  data(){
      return {
        process:true
      }
  },
  beforeCreate(){
    if(localStorage.getItem('identity').slice(-2)!=='学院'){
      console.log('去宿舍注册管理')
    }
  },
  methods:{
      selected({item, key, selectedKeys }){
          console.log(selectedKeys)
          switch(selectedKeys[0]){
            case '1':{this.process=true;console.log(this.process)};break;
            case '2':{this.process=false;console.log(this.process)};break;
          }
      }
  }
};
</script>
<style>
.campuses{
    height: 100%;
    display: flex;
}
 .ant-menu-inline > .ant-menu-item{
height:70px;;
line-height: 70px;
}
.managermenu{
  width: 256px;
  height:100%;
}
.menuItems{
  margin-bottom: 40px !important;
  font-size: 18px !important;
  margin-top: 0 !important;
  /* padding-left: 10px !important; */
  /* text-align: center; */
}
.subItem{
  font-size: 16px !important;
  text-align: center;
  padding: 0 !important;
}
@media screen and (max-width: 460px){
 .managermenu{
   width: 100px;
 }
 .ant-menu-inline > .ant-menu-item{
height:50px;;
line-height: 50px;
}
 /* .menuItem{
   padding-left: 10px !important;
 } */
}
@media screen and (max-width: 860px) and (min-width: 460px){
 .managermenu{
   width: 150px;
 }
 .ant-menu-inline > .ant-menu-item{
height:60px;;
line-height: 60px;
}
}
@media screen and (max-width: 1260px) and (min-width: 860px){
 .managermenu{
   width: 200px;
 }
 .ant-menu-inline > .ant-menu-item{
height:60px;;
line-height: 60px;
}
}
</style>
