<template>
  <div class="process">
    {{msgs}}
    {{lat}}
    {{count}}
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>


<script >
export default {
  name: "process",
  props: ["msg"],
  data() {
    return {
      msgs: this.msg,
      lat:1,
      lng:2,
      timer:'',
      count:0
    };
  },
  methods: {
    maps() {
      var _that=this;   //存储this的值，防止实例化内部拿不到需要的this
      let map = new AMap.Map("container", {
        resizeEnable: true, 
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
        zoom: 13 //初始视窗
      });
      var walking = new AMap.Walking({
        map: map,
        panel: "panel"
    }); 
    //根据起终点坐标规划步行路线
    walking.search([lng, lat], [108.899, 34.15], function(status, result) {
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
     this.timer=setInterval(this.maps,10000);
  },
  // beforeUpdate(){
  //   // this.navi();
  //   console.log(111111)
  // }
};
</script>
<style>
.process {
  height: 575px;
  position: relative;
}
#container {
  height: 80%;
  width: 70%;
}
#panel {
  
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: hidden;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-call:nth-child(1) {
  
  background-color: #009cf9 !important;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-call:not(#panel .amap-call:nth-child(1)){
  display: none;
}
#panel .amap-lib-walking:nth-child(1) {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>

