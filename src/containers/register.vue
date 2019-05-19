<template>
  <div class="test">
    <!-- <a-carousel class='register-img' autoplay>
      <div calss='imgthd'><img class='carimgs' src='../assets/dashu.jpg'></div>
      <div calss='imgthd'><img class='carimgs' src='../assets/xiaoshu.jpg'></div>
      <div calss='imgthd'><img class='carimgs' src='../assets/liqiu.jpg'></div>
      <div calss='imgthd'><img class='carimgs' src='../assets/shuangjiang.jpg'></div>

    </a-carousel>
    -->
    <a-card class="re-card">
      <div v-if="current[0]==='mail'">
        <div v-if="timer">
          <perpare></perpare>
        </div>
        <div v-else>
          <div v-if="!toprocess">
            <span>这里是注册流程的注意事项哦</span>
            <a-icon type="pushpin"/>
            <ul class="tips-ul">
              <li>1.这里是文字</li>
              <li>2.这里是也是文字</li>
              <li>3.这里还是文字</li>
              <li>4.这里依旧是文字,但是字数要多一点，因为我想要看效果</li>
              <li>5.这里仍然是文字</li>
            </ul>

            <a-button class="forsure" type="primary" @click="start">知道了，去报道！</a-button>
          </div>
          <div v-else>
            <registerProcess></registerProcess>
          </div>
        </div>
      </div>
      <div v-else-if="current[0]==='app'">
        <xupt></xupt>
      </div>
      <personal v-else></personal>
    </a-card>
    <a-menu class="menutitle" v-model="current" mode="horizontal">
      <a-menu-item key="mail" @click="changeitem">
        <a-icon type="mail"/>带你去报道
      </a-menu-item>
      <a-menu-item key="app" @click="changeitem">
        <a-icon type="appstore"/>校园介绍
      </a-menu-item>
      <a-menu-item key="123" @click="changeitem">
        <a-icon type="appstore"/>个人中心
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import sidemenu from "@/components/sidemenu";
import registerProcess from "@/components/registerProcess";
import xupt from "@/components/xupt";
export default {
  name: "test",
  data() {
    return {
      current: ["mail"],
      timer: false, //timer的值最终取决于时间，固定时间前为true，否则为false

      toprocess: sessionStorage.getItem("topprocess")
    };
  },

  components: { sidemenu, registerProcess, xupt },
  beforeCreate() {
    if(localStorage.getItem('identity')!=='新生'){
      console.log('123456');
      this.$router.push({path:'/'});
    }else{
      console.log('qwertyu');
    }
  },
  created() {},

  methods: {
    addnum: function() {
      this.$router.push({ path: "/introduction" });
    },
    changeitem({ key }) {
      this.current = [key];
      //  console.log(window.screen.availHeight);
      //  console.log(window.screen.height);
      // document.body.clientHeight 为屏幕可用高度，可以根据这个数值来设置页面的最小高度
    },
    start() {
      this.toprocess = true;
      sessionStorage.setItem("topprocess", true);
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
/* .sidemenu{
  position: absolute;
} */
.register-img {
  width: 100%;
  height: 150px;
  background-color: aliceblue;
}
.register-img .ant-carousel .slick-slider {
  width: 100%;
  height: 100%;
}
.imgthd {
  width: 100%;
  height: 150px;
}
.carimgs {
  width: 100%;
  height: 170px;
}
.ant-menu-item,
.ant-menu-submenu-title {
  padding: 0 15px;
}
.menutitle {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.re-card {
  min-height: 575px;
  height: 100%;
  width: 100% !important;
  margin: 0 !important;
  max-width: unset !important;
}
.re-card .ant-card-body {
  padding: 15px;
}
.tips-ul {
  list-style: none;
  padding-left: 20px;
}
.forsure {
  width: 70%;
  max-width: 300px;
  margin: 20px 15%;
  min-width: 140px;
}
@media screen and (min-width: 600px) {
  .forsure {
    width: 300px;
    margin: 20px;
  }
  /* .test{
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 2%;
  } */
}
@media screen and (min-width) {
}
</style>

