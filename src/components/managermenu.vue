<template>
  <div class='managermenu'>
    
    <a-menu
      :defaultSelectedKeys="[0]"

      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
      style="height:100%"
      @select='selected'
    >
    
      <a-menu-item v-for="(item,index) in sidemenu" :key="index" class='menuItems'><a-icon type="pie-chart" />{{item}}</a-menu-item>
      
    </a-menu>
  </div>
</template>

<script>
export default {
  props:['select','menu'],
  data () {
    return {
      collapsed: false,
      defaultSelectedKeys:this.select,
      sidemenu:this.menu
    }
  },
  beforeMount(){
      console.log(this.defaultSelectedKeys);
      console.log(this.sidemenu);
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    selected({item, key, selectedKeys }){
      // console.log(item, key, selectedKeys );
      // console.log(selectedKeys)
    //   switch(selectedKeys[0]){
    //     case '1': this.$router.push({ name:'resource'}); break
    //     case '2': this.$router.push({ name:'department'}); break
    //     case '3': this.$router.push({ name:'managers'}); break
    //   }
    this.$emit('test',selectedKeys[0]);
    }
  },
  watch:{
    select(){
      this.defaultSelectedKeys=this.select;
     
    },
    menu(){
        console.log(this.menu);
        this.sidemenu=this.menu;
    }
  }
}
</script>

<style>
 .ant-menu-inline > .ant-menu-item{
height:70px;;
line-height: 70px;
}
.managermenu{
  width: 256px;
  height:100%;
}
.menuItems{
  margin-bottom: 40px !important;
  font-size: 18px !important;
  margin-top: 0 !important;
  /* padding-left: 10px !important; */
  /* text-align: center; */
}
.subItem{
  font-size: 16px !important;
  text-align: center;
  padding: 0 !important;
}
@media screen and (max-width: 460px){
 .managermenu{
   width: 100px;
 }
 .ant-menu-inline > .ant-menu-item{
height:50px;;
line-height: 50px;
}
 /* .menuItem{
   padding-left: 10px !important;
 } */
}
@media screen and (max-width: 860px) and (min-width: 460px){
 .managermenu{
   width: 150px;
 }
 .ant-menu-inline > .ant-menu-item{
height:60px;;
line-height: 60px;
}
}
@media screen and (max-width: 1260px) and (min-width: 860px){
 .managermenu{
   width: 200px;
 }
 .ant-menu-inline > .ant-menu-item{
height:60px;;
line-height: 60px;
}
}

</style>