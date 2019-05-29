<template>
  <div class="graduate">
    <div class="layout-top">离校管理</div><br/>
    <div class="centermenu">
      <sidemenu class="sidemenu"></sidemenu>
      <gracenter class='codemenu'></gracenter>
        <!-- <div id="container"></div> -->
    </div>
    <a-layout-footer :style="{ textAlign: 'center' }">
      西安邮电大学<br/>
      Ant Design ©2019 Created by Vinor
    </a-layout-footer>
  </div>
</template>

<script>
import gracenter from "@/components/gracenter";
import sidemenu from "@/components/sidemenu";
export default {
  name: 'graduate',
  data () {
    return {
    };
  },
  components:{gracenter,sidemenu},

  
}
</script>

<style>
.graduate{
  background-color:white;
  height: auto;
}
.centermenu{
position: relative;
}
.sidemenu {
  position: fixed;
  top: 50px;
}
.layout-top {
  width: 100%;
  height: 60px;
  background-color:cornflowerblue;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5em;
  color: white;
  font-weight: bolder;
  line-height: 50px;
  text-align: center;
}
@media screen and (min-width: 900px){
  .centermenu {
    flex-direction: row;
    display: flex;
  } 
  .sidemenu {
    flex: 0 0 130px;
    position: static;
    /* width: 130px !important; */
  }
}
</style>
