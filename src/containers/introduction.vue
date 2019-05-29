<template>
  <div class="introduction">
    <div class="layout-top">
      校园介绍
      </div>
      <div class='centermenu'>
   <sidemenu class='sidemenu'></sidemenu>
   
   <div class='ce'>
     <xupt></xupt>
   </div>
      </div>
  </div>
</template>

<script>
import sidemenu from '@/components/sidemenu';
import xupt from '@/components/xupt'
export default {
  name: 'introduction',
  data () {
    return {
      msg: 'for test!!!',
      test:'这里是介绍啊',
    }
  },
  components:{sidemenu,xupt},
  methods : {
      addnum :function(){
          this.num++;
      }
  }
  
}
</script>

<style>
.introduction{
  background-color:  rgb(248, 248, 248);
  /* position: relative; */
  height: 100%;
  width: 100%;
}
.sidemenu{
  position: fixed;
  top:50px;
}
.ce{
  width: 100%;
  height: 500px;
}
.centermenu{
position: relative;
}
.ce{
  width: 100% !important;
  margin: 20px 10px !important;
  min-height: 593px;
  max-width: unset !important;
}
.layout-top {
  width: 100%;
  height: 50px;
  background-color: rgb(71, 71, 250);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: white;
  font-weight: bolder;
  line-height: 50px;
  text-align: center;
  position: relative;
}
@media screen and (min-width: 900px){
  .centermenu {
    flex-direction: row;
    display: flex;
  }
  .sidemenu{
    flex:0 0 130px;
    position: static;
    /* width: 130px !important; */
  }
  .score-card{
    flex: 1;
  }
  .person{
  min-height: 570px;
  padding: 10px 40px;
}
}
</style>