<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  background-color: rgb(221, 255, 255)
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  height: 100%;
  /* overflow: none !important; */
  overflow: unset;
}

</style>
