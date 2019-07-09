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
      <a-menu-item key='1' class='menuItems'>注册管理</a-menu-item>
      <a-menu-item key='2' class='menuItems'>离校管理</a-menu-item>
    </a-menu>
      </div>
    <register v-if='process' :tagsname='tagsname'></register>
    <div v-else :style="{width:'100%'}"> 

      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' ,height:'90%'}">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' ,height:'100%'}">
          <lisu v-if='sushe'></lisu>
      <div v-else>
        <card v-if='card'></card>
        <zuzhi v-else></zuzhi>
      </div>
        </div>
      </a-layout-content>
      
    </div>
  </div>
</template>
<script>

import register from '@/components/managerregister';
import lisu from "@/components/lisu";
import card from "@/components/card";
import zuzhi from "@/components/zuzhi";
export default {
  components: { register, lisu,card,zuzhi},
  data(){
      return {
        process:true,
        tagsname:'',
        sushe:false,
        card:false
      }
  },
  beforeCreate(){
    fetch(`/api/admin/me`,{
        method:'GET'
    }).then(res=>{
        return res.json()
    }).then(res=>{
        // 权限的验证问题
        if(localStorage.getItem('identity')!==res.authorities[0].authority){
            alert('无权限的访问');
        }
        if(res.authorities[0].authority.slice(2,2)=='公寓'){
            this.tagsname='宿舍管理处'
            this.sushe=true;
            
        }else{
            this.tagsname=res.authorities[0].authority
           if(this.tagsname==='卡务中心'){
             this.sushe=false;
             this.card=true;
           }
        }
        console.log(this.sushe,this.card);
        
    })
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
