<template>
  <div class="adminmenu">
    <!-- <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>-->
    <a-menu
      :defaultSelectedKeys="defaultSelectedKeys"
      v-model="defaultSelectedKeys"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
      style="height:100%"
      @select="selected"
    >
      <a-menu-item key="1" class="menuItem">
        <a-icon type="pie-chart"/>
        <span>事项管理</span>
      </a-menu-item>
      <a-menu-item key="2" class="menuItem">
        <a-icon type="desktop"/>
        <span>部门管理</span>
      </a-menu-item>
      <a-menu-item key="3" class="menuItem">
        <a-icon type="inbox"/>
        <span>人员管理</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  props:['select'],
  data () {
    return {
      collapsed: false,
      defaultSelectedKeys:this.select
    }
  },
  
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    selected({item, key, selectedKeys }){

      switch(selectedKeys[0]){
        case '1': this.$router.push({ name:'resource'}); break
        case '2': this.$router.push({ name:'department'}); break
        case '3': this.$router.push({ name:'managers'}); break

      }
    }
  },
  watch:{
    select(){
      this.defaultSelectedKeys=this.select;

  }
}
}
</script>

<style>
.ant-menu-inline > .ant-menu-item {
  height: 70px;
  line-height: 70px;
}
.adminmenu {
  width: 256px;
  height: 100%;
}
.menuItem {
  margin-bottom: 40px !important;
  font-size: 18px !important;
  margin-top: 0 !important;
  /* padding-left: 10px !important; */
}
.subItem {
  font-size: 16px !important;
  text-align: center;
  padding: 0 !important;
}
@media screen and (max-width: 460px) {
  .adminmenu {
    width: 100px;
  }
  .ant-menu-inline > .ant-menu-item {
    height: 50px;
    line-height: 50px;
  }
  /* .menuItem{
   padding-left: 10px !important;
 } */
}
@media screen and (max-width: 860px) and (min-width: 460px) {
  .adminmenu {
    width: 150px;
  }
  .ant-menu-inline > .ant-menu-item {
    height: 60px;
    line-height: 60px;
  }
}
@media screen and (max-width: 1260px) and (min-width: 860px) {
  .adminmenu {
    width: 200px;
  }
  .ant-menu-inline > .ant-menu-item {
    height: 60px;
    line-height: 60px;
  }
}

</style>