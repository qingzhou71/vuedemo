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
}
/* @media screen and (min-width: 560px) {
    #app {
      width: 70%;
        margin: 0 auto;
    }
} */
</style>
