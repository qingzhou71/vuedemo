<template>
  <div class="introduction">
   <sidemenu class='sidemenu'></sidemenu>
   
   {{msg}}
   <p>{{test}}</p>
   <p>为了看出来这个页面到底是什么东西：  校园介绍 </p>
   <div class='ce'></div>
  </div>
</template>

<script>
import sidemenu from '@/components/sidemenu';
export default {
  name: 'introduction',
  data () {
    return {
      msg: 'for test!!!',
      test:'这里是介绍啊',
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
.introduction{
  background-color:  rgb(248, 248, 248);
  position: relative;
}
/* .sidemenu{
  position: fixed;
  top:50px;
} */
.ce{
  width: 100%;
  height: 500px;
  
}
</style>