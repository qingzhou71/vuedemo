<template>
  <div class="test">
   {{msg}}
   <p>{{test}}</p>
   <p>{{num>6?'hahah':'emmm'}}{{num}}</p>
   <button v-on:click="addnum">click here</button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'for test!!!',
      test:'woh',
      num:5
    }
  },
  methods : {
      addnum :function(){
          this.num++;
      }
  }
  
}
</script>