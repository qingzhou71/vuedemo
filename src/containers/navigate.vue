<template>
  <div class="navigate">
   {{msg}}
   <p>{{test}}</p>
  </div>
</template>

<script>
export default {
  name: 'navigate',
  data () {
    return {
      msg: 'for test!!!',
      test:'这里是导航啊',
    }
  },
  methods : {
      addnum :function(){
          this.num++;
      }
  }
  
}
</script>