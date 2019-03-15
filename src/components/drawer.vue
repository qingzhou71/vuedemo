<template>
  <div class="drawer">
   <a-button class='drawer-fold' @click="showDrawer">
      <a-icon type="menu-fold" />
    </a-button>
    <a-drawer
      title="Basic Drawer"
      placement="left"
      width='30%'
      @close="onClose"
      :visible="visible"
    >
      <a-button
      @click="navigate"
      >校园导航</a-button>
      <a-button
      @click="performance"
      >成绩查询</a-button>
      <a-button
      @click="graduate"
      >离校管理</a-button>
    </a-drawer>
  </div>
</template>





<script>
export default {
  name: 'drawer',
  data () {
    return {
      msg: '这里应该是抽屉的组件',
      test:'！！！',
      visible:false
    }
  },
  methods : {
      showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    navigate(){
      this.$router.push({path: '/navigate'});
    },
    performance(){
      this.$router.push({path: '/performance'});
    },
    graduate(){
      this.$router.push({path: '/graduate'});
    }
  }
  
}
</script>

<style>
.drawer{
  position: relative;
  width:100%;
}
.drawer-fold{
  position: absolute;
  top:10px;
  left:7px;
}
</style>