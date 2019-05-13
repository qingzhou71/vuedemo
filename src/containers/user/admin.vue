<template>
  <div class="admin">
    <adminmenu :select='SelectedKeys'></adminmenu>
    <router-view/>
  </div>
</template>

<script>
import adminmenu from "@/components/adminmenu";

export default {
  name: "admin",
  components: { adminmenu },
  data(){
    return{
      SelectedKeys:['1']
    }
  },
  created(){
    console.log(location.hash);
     switch(location.hash.slice(8)){
      case 'resource':this.SelectedKeys=['1'];break
      case 'department':this.SelectedKeys=['2'];break
      case 'managers':this.SelectedKeys=['3'];break

    }
  },
  beforeUpdate(){
    console.log(location.hash,'1234567');
    switch(location.hash.slice(8)){
      case 'resource':this.SelectedKeys=['1'];break
      case 'department':this.SelectedKeys=['2'];break
      case 'managers':this.SelectedKeys=['3'];break

    }
  }
};
</script>

<style>
.admin{
  height:100%;
  display: flex;
}
</style>
