<template>
  <div class="manager">
    <managermenu 
    :select='SelectedKeys'
    @test='testfunction'
    :menu='menu'
    v-if='menushow'
    >
    </managermenu>
    <div v-if='operationselect' class='opelse'>
    <operation  :department='department'/>
    <bottom class='operbottom'></bottom>
    </div>
    
    <div v-else class='opelse'>
        <operation  :department='deman'/>
        <bottom class='operbottom'></bottom>
    </div>
    
  </div>
</template>

<script>
import managermenu from "@/components/managermenu";
import operation from '@/components/operation';
import maregister from '@/components/managerregister';
import bottom from '@/components/bottom'
// import process from '@/components/process';
require("es6-promise").polyfill();
require("isomorphic-fetch");

export default {

  name: "admin",
  components: { managermenu,operation,maregister ,bottom},
  
  beforeCreate(){
 
  },
  
  beforeMount(){
    console.log('1');
     fetch(`/api/admin/me`,{
      method:'GET'
    }).then(res=>{
      return res.json()
    }).then(res=>{
      console.log(res);
      // 当前登录管理员的部门
      console.log(res.authorities[0].authority);
      this.department=res.authorities[0].authority.substr(0,2);
      
      console.log(this.department);
      if(this.department==='学院'){
      this.menu=['学院管理','人员管理'];
      this.deman='学院管理员'
    }
    else if(this.department==='宿舍'){
      this.menu=['宿舍管理','人员管理'];
      this.deman='宿舍管理员'
    }
    else{
      this.menu=['建筑管理']
    }
    if(this.menu.length===1){
      this.menushow=false;
      this.operationselect=true;
      
    }
    })
    console.log(this.department)
  },
  data(){
    return{
      SelectedKeys:[0],
      department:'',
      menu:['业务管理','注册管理'], // menu是资源得获取，在data初始化前
      operationselect:true,
      reselect:false,
      menushow:true,
      deman:''
    }
  },
  methods:{
      testfunction(key){
          console.log(key);
          switch(key){
              case 0:{this.operationselect=true;};break
              case 1:{this.operationselect=false;};break
              default:{this.operationselect=false;this.reselect=false;}
          }
          console.log(this.operationselect)
          if(this.department==='学院'){
      this.menu=['学院管理','人员管理']
    }
    else if(this.department==='宿舍'){
      this.menu=['宿舍管理','人员管理']
    }
    else{
      this.menu=['建筑管理']
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
.operbottom{
   height: 5%;
  margin-top: 20px;
}
</style>
