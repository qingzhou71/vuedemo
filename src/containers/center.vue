<template>
  <div class="center">
    <div class="layout-top">
      学生个人中心
      <!-- <signout class='per-singnout'></signout> -->
      </div>
    <div class='centermenu'>
      <sidemenu class='sidemenu'></sidemenu>

    <!-- 将个人中心作为组件提取出来 -->

   <div class="ce"><p>为了看出来这个页面到底是什么东西：   个人中心</p></div>
    </div>
  </div>
</template>

<script>
import sidemenu from '@/components/sidemenu';

export default {
  name: 'center',
  data () {
    return {
      msg: 'for test!!!',
      test:'woh',
      num:5
    }
  },
  components:{sidemenu},
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
  height: 800px;
  width: 100%;
}
.centermenu{
position: relative;
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
}
</style>