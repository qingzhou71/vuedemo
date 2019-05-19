<template>
  <div class="manager">
    <managermenu 
    :select='SelectedKeys'
    @test='testfunction'
    :menu='menu'
    v-if='menushow'
    >
    </managermenu>
    <operation v-if='operationselect' :department='department'/>
    <div v-else class='opelse'>
        <maregister v-if='reselect'/>
    <div v-else  class='opelse'><process/></div>
    </div>
  </div>
</template>

<script>
import managermenu from "@/components/managermenu";
import operation from '@/components/operation';
import maregister from '@/components/managerregister';
import process from '@/components/process';

export default {

  name: "admin",
  components: { managermenu,operation,maregister ,process},
  data(){
    return{
      SelectedKeys:[0],

      department:'建筑',
      menu:['业务管理','注册管理'], // menu是资源得获取，在data初始化前
      operationselect:true,
      reselect:false,
      menushow:true
    }
  },
  beforeCreate(){
      //  初始化，应有得组件
    //   const department='学院';

  },
  created(){
    if(this.menu.length===1){
      this.menushow=false;
      if(this.menu[0]==='业务管理'){
        this.operationselect=true;this.reselect=false
      }
      else{
        this.operationselect=false;this.reselect=false;
      }
    }
  },
  beforeUpdate(){
   
  },
  methods:{
      testfunction(key){
          console.log(key);
          switch(key){
              case 0:{this.operationselect=true;this.reselect=false};break
              case 1:{this.operationselect=false;this.reselect=true};break
              default:{this.operationselect=false;this.reselect=false;}
          }
      }
  }
};
</script>

<style>
.manager{
  height:100%;
  display: flex;
}
.opelse{
    width: 100%;
    height:100%;
}
</style>
