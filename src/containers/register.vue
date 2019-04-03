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
  <a-card class='re-card'>
  <div v-if="current[0]==='mail'">
    <div v-if='timer'>还没有组件，还没到报道的时间，所以这里什么都没有，不如去看看西柚的那些事吧</div>
    <div v-else>
      <div v-if='toprocess'>
        <span>这里是注册流程的注意事项哦</span><a-icon type="pushpin" />
        <ul class='tips-ul'>
          <li>1.这里是文字</li>
          <li>2.这里是也是文字</li>
          <li>3.这里还是文字</li>
          <li>4.这里依旧是文字,但是字数要多一点，因为我想要看效果</li>
          <li>5.这里仍然是文字</li>
        </ul>
        <a-button class='forsure' type='primary'>知道了，去报道！</a-button>
      </div>
    <div v-else><process :msg=234></process></div>
    </div>
  </div>
  <div  v-else-if="current[0]==='app'">
    <xupt></xupt>
  </div>
  </a-card>

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
      timer:false , //timer的值最终取决于时间，固定时间前为true，否则为false
      toprocess:true
    };
  },

  components: { drawer, menulist,sidemenu,process,xupt },
  methods: {
    addnum: function() {
      this.$router.push({ path: "/navigate" });
     },
     changeitem({key}){
       this.current=[key];
      //  console.log(window.screen.availHeight);
      //  console.log(window.screen.height);
      // document.body.clientHeight 为屏幕可用高度，可以根据这个数值来设置页面的最小高度

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
.re-card{
  min-height: 575px;
}
.re-card .ant-card-body{
  padding: 15px ;
}
.tips-ul{
  list-style: none;
  padding-left: 20px;
}
.forsure{
  width: 70%;
  max-width: 300px;
  margin: 20px 15%;
  min-width: 140px;
}
@media screen and (min-width: 430px){
  .forsure{
    width: 300px;
    margin: 20px;
  }

}
</style>

