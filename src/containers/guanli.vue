<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}">
      <div class="logo">
        <a-avatar shape="square" :size="100" icon="user" :style="{right:'50px', bottom:'50px',backgroundColor:'skyblue'}" />
      </div>
      <div class="textstyle">财务管理员</div><br/>
      <a-menu theme="dark" mode="inline" @select="content123" :defaultSelectedKeys="['1']">
        <a-menu-item key="1" >
          <a-icon type="file-text" />
          <span class="nav-text">缴费记录</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="form" />
          <span class="nav-text">注册</span>
        </a-menu-item>
      </a-menu>
      <div class="withdraw">
        <a-button :style="{right:'50px', bottom:'-250px'}" ghost @click="withdraw">
          <a-icon type="poweroff" />
          注销
        </a-button>
      </div>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff',padding: 0, }">
        <div class="biaoti">
          财务管理后台
        </div>
      </a-layout-header>
      <a-layout-content v-if="content1" :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <div ><caiwu></caiwu></div>
          
        </div>
      </a-layout-content>
       <register v-if='content2' tagsname='财务处'></register>
      <a-layout-footer :style="{ textAlign: 'center' }">
        西安邮电大学<br/>
        Ant Design ©2019 Created by Vinor
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import caiwu from "@/components/caiwu";
import register from '@/components/managerregister';
export default {
  data(){
    return{
      content1:true,
      content2:false,
      content3:false,
    }
  },
  components:{caiwu,register},
  methods:{
    content123(e){
      console.log(e.key);
      if(e.key == 1){
        this.content1=true;
        this.content2=false;
      }else if(e.key == 2){
        this.content1=false;
        this.content2=true;
      }
      console.log(e)
    },
    // click(){
    //   this.$ajax.get('/api/location')
    //   .then((response)  => {
    //     this.trytext = response.content;
    //     console.log(response.content);
    //   })
    // },
    withdraw(){
      this.$router.push({ path: "/" });
    }
  },
  // mounted(){
  //   axios
  //   .get('/api/admin/stu/finance')
  //   .then(response => (this.paymentTime = response))
  // }
}
</script>


<style>
.logo {
  height: 32px;
  width: 32px;
  background: rgba(255,255,255,.2);
  margin: 50px;
  padding: 50px;
}
.biaoti{
  text-align: center;
  font-size: 1.5rem;
  background-color:rgba(2, 17, 37, 0.972);
  color: white; 
}
.textstyle{
  /* margin: 10px; */
  padding: 10px;
  text-align: center;
  color:azure;
  width: 200px;
}
.withdraw{
  margin: 50px;
  padding: 50px;
  height: 300px;
}
</style>
