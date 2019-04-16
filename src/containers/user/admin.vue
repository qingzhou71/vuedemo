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
      case 'campus/institution':this.SelectedKeys=['5'];break
      case 'campus/major':this.SelectedKeys=['6'];break
      case 'campus/dormitory':this.SelectedKeys=['7'];break
      case 'campus/location':this.SelectedKeys=['8'];break
    }
  },
  beforeUpdate(){
    console.log(location.hash,'1234567');
    switch(location.hash.slice(8)){
      case 'resource':this.SelectedKeys=['1'];break
      case 'department':this.SelectedKeys=['2'];break
      case 'managers':this.SelectedKeys=['3'];break
      case 'campus/institution':this.SelectedKeys=['5'];break
      case 'campus/major':this.SelectedKeys=['6'];break
      case 'campus/dormitory':this.SelectedKeys=['7'];break
      case 'campus/location':this.SelectedKeys=['8'];break
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
