<template>
  <div class="graduate">
    <sidemenu class='sidemenu'></sidemenu>
    <p>为了看出来这个页面到底是什么东西：   离校管理</p>
   <div class="ce"></div>
  </div>
</template>

<script>
import sidemenu from '@/components/sidemenu';

export default {
  name: 'graduate',
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
.graduate{
  background-color:  rgb(248, 248, 248);
  position: relative;
  height: 800px;
}
/* .sidemenu{
  position: fixed;
  top:50px;
} */
.ce{
  width: 100%;
  height: 600px;
  
}
</style>