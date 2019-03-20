<template>
  <div class="test">
    <div class='register-img'>这里会是一张好看有趣的图</div>
     <a-menu
    v-model="current"
    mode="horizontal"
  >
    <a-menu-item key="mail" @click="changeitem">
      <!-- 图标待改动，找到合适的就改 -->
      <a-icon type="mail" />带你去报道
    </a-menu-item>
    <a-menu-item key="app"   @click="changeitem">
      <a-icon type="appstore" />西柚那些事
    </a-menu-item>
    <a-menu-item key="123"   @click="changeitem">
      <a-icon type="appstore" />萌新看过来
    </a-menu-item>
  </a-menu>
  <div v-if="current[0]==='mail'">
    <div v-if='timer'>还没有组件，还没到报道的时间，所以这里什么都没有，不如去看看西柚的那些事吧</div>
    <div v-else><process :msg=234></process></div>
  </div>
  <div  v-else-if="current[0]==='app'">
    <xupt></xupt>
  </div>
  </div>
</template>





<script>
import drawer from "@/components/drawer";
import menulist from "@/components/menu";
import sidemenu from '@/components/sidemenu';
import process from '@/components/registerProcess';
import xupt from '@/components/xupt';
export default {
  name: "test",
  data() {
    return {
      current:['mail'],
      timer:true  //timer的值最终取决于时间，固定时间前为true，否则为false
    };
  },
  components: { drawer, menulist,sidemenu,process,xupt },
  methods: {
    addnum: function() {
      this.$router.push({ path: "/navigate" });
     },
     changeitem({key}){
       this.current=[key];

     }
  }
};
</script>


 <style>
 .test {
  width: 100%;
  height: auto;
  position: relative;
  background-color: rgb(248, 248, 248);
}
.sidemenu{
  position: absolute;
}
.register-img{
  width: 100%;
  height: 100px;
  background-color: aliceblue;
}
.ant-menu-item, .ant-menu-submenu-title{
  padding: 0 15px;
}
</style>