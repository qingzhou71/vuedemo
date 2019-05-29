<template>
  <div class="side-menu" :style="sidestyle">
    <ul class="menu-list">
      
      <li :class="{performanceli:perShow}" @click="performance">成绩查询</li>
      <a-divider></a-divider>
      <li :class="{centerli:grShow}" @click="graduate">离校管理</li>
      <a-divider></a-divider>
      <li :class="{introductionli:naShow}" @click="introduction">校园介绍</li>
      <a-divider></a-divider>
      <li :class="{centerli:ceShow}" @click="center">个人中心</li>
      <a-divider></a-divider>
      
    </ul>
    <p
      class="menu-tips"
    >温馨小提示：早上起床后空腹喝一杯温水有助于身体健康哦</p>
    <a-button class="menu-icon" @click="changeicon">
      <a-icon v-show="showicon" type="menu-fold"/>
      <a-icon v-show="!showicon" type="close"/>
    </a-button>
  </div>
</template>

<script>
export default {
  name: "side-menu",
  data() {
    return {
      showicon: false,
      sidestyle: {
        marginLeft: "0px"
      },
      naShow: location.hash.slice(2) === "introduction" ? true : false,
      perShow: location.hash.slice(2) === "performance" ? true : false,
      ceShow: location.hash.slice(2) === "center" ? true : false,
      grShow: location.hash.slice(2) === "graduate" ? true : false
    };
  },
  methods: {
    changeicon() {
      this.showicon = !this.showicon;
      this.sidestyle.marginLeft = this.showicon ? "-130px" : "0px";
      console.log(location.hash.slice(2));
    },
    introduction() {
      this.$router.push({ path: "/introduction" });
    },
    performance() {
      this.$router.push({ path: "/performance" });
    },
    center() {
      this.$router.push({ path: "/center" });
    },
    graduate(){
      this.$router.push({path:'/graduate'});
    }
  }
};
</script>


<style>
/* .menu {
  width: 100%;
  height: auto;
  background-color: rgb(248, 248, 248);
} */
.side-menu {
  width: 130px;
  /* max-width: 150px; */
  background-color: rgb(248, 248, 248);
  min-height: 673px;
  /* position: relative; */
  /* margin-left: -130px; */
  text-align: center;
  z-index: 1;
}
.menu-list {
  padding-inline-start: 0px;
  padding: 50px 0;
}
.side-menu li {
  list-style: none;
  line-height: 45px;
}
.side-menu li:hover{
  cursor: pointer;
}
.ant-divider-horizontal {
  margin: 4px 0;
}
.menu-tips {
  display: block;
  padding: 15px;
}
.menu-icon:hover,
.menu-icon:focus {
  color: black;
  border-color: rgb(248, 248, 248);
}
.menu-icon {
  position: absolute;
  top: 40px;
  right: -40px;
  border-style: none;
  background-color: rgb(248, 248, 248) !important;
  border-color: rgb(248, 248, 248);
  border-width: 0;
  box-shadow: 0;
}
.menu-icon:active {
  box-shadow: none;
  background-color: rgb(248, 248, 248) !important;
  border-color: rgb(248, 248, 248);
  border-width: 0;
  text-shadow: none;
}
.menu-icon::after {
  -webkit-box-shadow: none;
  box-shadow: none !important;
  background-color: rgb(248, 248, 248);
  border-color: rgb(248, 248, 248);
  border-width: 0;
  outline: none !important;
}
.introductionli,
.performanceli,
.centerli {
  background-color: aliceblue;
  color: rgb(54, 129, 241);
}
/* @media screen and (min-width: 420px) {
    .side-menu {
      z-index: 0;
    }
} */
 @media screen and (min-width: 900px){
   .menu-icon{
     display: none;
   }
   .side-menu{
     margin-left: 0px !important;
   }
 }
</style>