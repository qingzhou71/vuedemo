<template>
  <div class="manager">
    <managermenu 
    :select='SelectedKeys'
    @test='testfunction'
    :menu='menu'
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
      department:'学院',
      menu:['业务管理','注册管理','流程管理'], // menu是资源得获取，在data初始化前
      
      operationselect:true,
      reselect:false
    }
  },
  beforeCreate(){
      //  初始化，应有得组件
    //   const department='学院';

  },
  created(){
    
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
