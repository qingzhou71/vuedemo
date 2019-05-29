<template>
  <div class="center">
    <div class="layout-top">
      学生个人中心
      </div>
    <div class='centermenu'>
      <sidemenu class='sidemenu'></sidemenu>

    <!-- 将个人中心作为组件提取出来 -->

   <div class="ce">
     <a-card class='person'>
       <div class='persondiv'>
     <personal ></personal>
       </div>
     </a-card>
   </div>
   <bottom class="centerbottom"></bottom>
    </div>
  </div>
</template>

<script>
import sidemenu from '@/components/sidemenu';
import personal from '@/components/personal';
import bottom from '@/components/bottom';
export default {
  name: 'center',
  data () {
    return {
      msg: 'for test!!!',
      test:'woh',
      num:5
    }
  },
  components:{sidemenu,personal,bottom},
  methods : {
      addnum :function(){
          this.num++;
      }
  }
  
}
</script>

<style>
.center{
  background-color:  rgb(248, 248, 248);
  /* position: relative; */
  height: 100%;
  width: 100%;
}
.centermenu{
position: relative;
height:85%;
}
.sidemenu{
  position: fixed;
  top:50px;
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
.persondiv{
  width: 450px;
}
}
.person{
  min-height: 570px;
}
.centerbottom{
  height: 5%;
  margin-top: 20px;
}
</style>