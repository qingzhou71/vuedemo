<template>

  <div class="process" :style='processstyle'>
    <span style='display:none'>{{msgs}}
    {{lat}}
    {{count}}</span>
     
          路程导航贴心奉上：
    <div class='registmap'>
      
    <div id="container"></div>
    <div id="panel"></div>
    </div>
   
   <div class='registtext'>
       <span>当前流程:</span>
    <a-steps size='small'  :current="1" labelPlacement='vertical'>
            <a-step v-for='(items,index) in campusdata.process' :key='index' :title="items.name" />
          </a-steps>
          <div class='reforsure'>
          <a-button type='primary' >完成注册</a-button>
          </div>
          </div>

  </div>
</template>


<script >

const campusdata = 
  {
    campusid: "10",
    campusname: "通信与信息工程学院",
    process: [
      { sep: 1, name: "学院办事处", key: 0 },
      { sep: 2, name: "图书馆", key: 1 },
      { sep: 3, name: "宿舍管理处", key: 2 },
    ]
  };
  

export default {
  name: "process",
  props: ["msg"],
  data() {
    return {
      msgs: this.msg,
      lat:1,
      lng:2,
      timer:'',

      count:0,
      campusdata,
      processstyle:{
        height:window.screen.availHeight-146+'px'
      }

    };
  },
  methods: {
    maps() {
      var _that=this;   //存储this的值，防止实例化内部拿不到需要的this
      let map = new AMap.Map("container", {
        resizeEnable: true, 

        center:[108.9,34.15],

        zoom: 13 
      });
      AMap.plugin("AMap.Geolocation", function() {
        // console.log(_that);
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位
          timeout: 10000, //超过10秒后停止定位
          buttonPosition: "RB", //定位按钮的停靠位置
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status, result) {
          if (status == "complete") {
          _that.onComplete(result);
          } else {
            alert("定位失败");
          }
        });
      });
    },
    navi(lat,lng,count){
      let map = new AMap.Map("container", {
        resizeEnable: true, 

        center:[lng,lat],

        zoom: 13 //初始视窗
      });
      var walking = new AMap.Walking({
        map: map,
        panel: "panel"
    }); 
    //根据起终点坐标规划步行路线

    walking.search([108.8991665840,34.1499923318,108.8991665840], [108.9008617401,34.153126515], function(status, result) {

        if (status === 'complete') {
            log.success('绘制步行路线完成')
        } else {
            log.error('步行路线数据查询失败' + result)
        } 
    });
    },
     onComplete(result){
        this.lat=result.position.lat;
        this.lng=result.position.lng;
        this.count++;
      },
    
  },
  beforeUpdate(){
    this.navi(this.lat,this.lng,this.count);
    
    
  },
  mounted() {
     this.maps();

    //  document.documentElement.scrollTop=145;
    //  console.log(document.documentElement.scrollTop);
    console.log(document.documentElement.clientHeight);
    //  setTimeout(()=>{
    //   //  document.documentElement.scrollTop=100;
    //    console.log( document.documentElement.scrollTop)
    //    console.log('12345')
    //  },0);
    //  this.timer=setInterval(this.maps,10000);

  },
  // beforeUpdate(){
  //   // this.navi();
  //   console.log(111111)
  // }
};
</script>
<style>
.process {

  /* height: 775px; */
  
  /* position: relative; */
  

}
.registmap{
/* display: flex; */
height:70%;
max-height: 500px;
position: relative;
margin-top: 15px;
}
#container {
  height: 90%;
  width: 100%;
   position: relative;

}
#panel {
  
  position: absolute;
  background-color: white;
  max-height: 90%;

  overflow-y: scroll;
  top: 0px;
  right: 0px;
  width: 100px;
  height: 40%;
  font-size: 12px;
}
#panel .amap-call {
  
  background-color: #009cf9 !important;
  
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  
}

#panel .amap-lib-walking {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  /* display: none; */
}
.process .amap-lib-walking .planTitle{
  padding: 0 !important;
}
.process .amap-lib-walking .plan dt{
  line-height: unset !important
}
.process .ant-steps-item{
  width: 20%;
}
.process .ant-steps-label-vertical .ant-steps-item-tail{
  margin-left: 20px !important;
}
.process .ant-steps-label-vertical .ant-steps-item-icon{
  margin-left: 10px !important;
}
.process .ant-steps-label-vertical .ant-steps-item-content{
  margin-left: -30px !important;
  font-size: 10px;
  margin-top: 2px;
}
.reforsure{
  text-align: center;
  margin-top: 15px;
}
.reforsure .ant-btn-primary{
  width:60%;
  max-width: 300px;
}
.registtext{
  height: 30%;

}
</style>

