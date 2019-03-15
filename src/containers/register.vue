<template>
  <div class="test">
  <drawer></drawer>
  </div>
</template>





<script>
import drawer from '@/components/drawer';
export default {
  name: 'test',
  data () {
    return {
      msg: 'for test!!!',
      test:'woh',
      num:5
    }
  },
  components:{drawer},
  methods : {
      addnum :function(){
          this.$router.push({path: '/navigate'});
      },
     
  }
  
}
</script>
