<template>
<div id="mapapp">
  <div class="navigate">
    <div class="layout-top">校园导航</div>
    <div class="centerbox">
      <baidu-map class="map" id="bm-div" :center="centerPoint" :zoom="zoom" :scroll-wheel-zoom="true" :dragging="true" @click="get_point">
        <bm-geolocation anchor="BMAP_ANCHOR_TOP_RIGHT" :showAddressBar="true" :autoLocation="true" :offset="locPostion" @locationSuccess='Geo'></bm-geolocation>
        <bm-transit v-if="isNav" :start="start" :end="end" :auto-viewport="true" location="西安市"></bm-transit>
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
        <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation> -->
        <bm-marker :position="showPonit" animation="BMAP_ANIMATION_BOUNCE" v-if="isShowPoint">
          <bm-label :content="showPonitName" :labelStyle="{color: 'red', fontSize : '20px'}" :offset="{width: -20, height: 30}"/>
        </bm-marker>
        <!-- <bm-walking start="start1" end="end1" :auto-viewport="true" location=西安 v-if="isGeo"></bm-walking> -->
        <bm-info-window :position="library" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
          <p v-text="infoWindow.contents"></p>
        </bm-info-window>
      </baidu-map>
        <Tooltip content="学校介绍" class="top_left_menu_type" id="introduce" placement="left" :always="true" :transfer="true" :disabled="toolTipDisable" >
          <img src="./assets/school.png" height="18" alt="学校"  @click="introduce = true">
        </Tooltip>
        <Tooltip content="沿停公交" class="top_left_menu_type" id="stopbus" placement="left" :always="true" :transfer="true" :disabled="toolTipDisable" >
          <img src="./assets/bus.png" height="18" alt="公交线路"  @click="stopbus = true">
        </Tooltip>
        <Tooltip content="步行导航" class="top_left_menu_type" id="walkroad" placement="left" :always="true" :transfer="true" :disabled="toolTipDisable">
          <img src="./assets/walk.png" height="18" alt="步行"  @click="walkroad">
        </Tooltip>
      <maptool v-on:changNavBychild="changNavBychild" v-on:showPoint="showPoint"></maptool>
      <div id="bottom"></div>
      <Modal v-model="introduce">
        <p slot="header" style="text-align:center">   
          <span>西安邮电大学</span>
        </p>
        <div style="text-align:center">
          <Card :bordered="false">
            <p slot="title">学校简介</p>
            <p>西安邮电大学是一所以工为主，以信息科学技术为特色，工、管、理、经、文、法、艺多学科协调发展的普通高等学校，是我国特别是西北地区信息产业高级专门人才培养的重要基地。</p>
          </Card>
          <Card :bordered="false">
            <p slot="title">校训</p>
            <p>爱国 求是 奋进</p>
            <p>爱国 ---- 热爱祖国、报效祖国</p>
            <p>求是 ---- 实事求是、追求真理</p>
            <p>奋进 ---- 勤奋好学，奋发进取</p>
          </Card>
          <Card :bordered="false">
            <p slot="title">通讯地址</p>
            <p>长安校区</p>
            <p>电话：029-88166105</p>
            <p>邮政编码：710121</p>
            <p>地址：西安市长安区西长安街618号</p>
            <p>雁塔校区</p>
            <p>电话：029-85383106</p>
            <p>邮政编码：710061</p>
            <p>地址：西安市长安南路563号</p>
          </Card>
          <Card :bordered="false">
            <p slot="title">微信公众号</p>
            <img src='./assets/weixin.png' style="width: 200px;">
            <p>欢迎关注“西安邮电大学”微信公众号</p>
          </Card>
        </div>
        <div slot="footer">
          <Button type="default" size="large" long  @click="open_introduce">确认</Button>
        </div>
      </Modal>
      <Modal v-model="stopbus">
        <p slot="header" style="text-align:center">   
          <span>沿停公交</span>
        </p>
        <div style="text-align:left">
          <Card :bordered="false">
            <a-card title="西安邮电大学长安校区站">
              <a-card-grid style="width:33.33%;textAlign:'left'">166路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">268路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">321路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">322路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">600路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">616路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>
                  <!-- <a-card-grid style="width:33.33%;textAlign:'left'">长安晚间延点1号线<img src='./assets/pay.png' style="width: 20px;"></a-card-grid> -->
                  <!-- <a-card-grid style="width:33.33%;textAlign:'left'">高校1号线<img src='./assets/pay.png' style="width: 20px;"></a-card-grid> -->
              <a-card-grid style="width:33.33%;textAlign:'left'">4-06路<img src='./assets/money.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">4-07路<img src='./assets/money.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">4-11路<img src='./assets/money.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">4-12路<img src='./assets/money.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">4-16路<img src='./assets/money.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">4-22路<img src='./assets/money.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">4-26路<img src='./assets/money.png' style="width: 20px;"></a-card-grid>
                  <!-- <a-card-grid style="width:33.33%;textAlign:'left'">906路<img src='./assets/money.png' style="width: 20px;"></a-card-grid> -->
            </a-card>
          </Card>
          <Card :bordered="false">
            <a-card title="茅坡村站/邮电大学南校区站">
              <a-card-grid style="width:33.33%;textAlign:'left'">游9路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>
              <a-card-grid style="width:33.33%;textAlign:'left'">921路<img src='./assets/money.png' style="width: 20px;"></a-card-grid>
            </a-card>
          </Card>
          <Card :bordered="false">
            <a-card title="书香路西长安街口站">
              <a-card-grid style="width:33.33%;textAlign:'left'">325路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>                
            </a-card>
          </Card>
          <Card :bordered="false">
            <a-card title="温国堡站">
              <a-card-grid style="width:33.33%;textAlign:'left'">324路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>                
              <a-card-grid style="width:33.33%;textAlign:'left'">325路<img src='./assets/pay.png' style="width: 20px;"></a-card-grid>                
            </a-card>
          </Card>
        </div>
          <div slot="footer">
              <Button type="default" size="large" long  @click="open_stopbus">确认</Button>
            </div>
      </Modal>
    </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div :style="{height:'20%', textAlign: 'center' }">
      西安邮电大学<br/>
      Ant Design ©2019 Created by Vinor
    </div>
  </div>
</div>
</template>

<script>
// import maptool from "@/components/maptool";
import maptool from "@/components/maptool";
import {Tooltip, Modal, Button,Card,Collapse} from "iview"
export default {
  name: 'navigate',
  data(){
    return{
      centerPoint:{lng: 108.907652, lat: 34.15844},
      zoom:16,
      clientHeight: 0,
      locPostion:{
        width:10,
        height:10
      },
      location:null,
      showPonit:{
        lng:0,
        lat:0
      },
      dingwei:null,
      start:"",
      end:"",
      start1:"",
      end1:"",
      showPonitName:"",
      isNav:false,
      isShowPoint:false,
      isGeo:false,
      infoWindow: {
        show: true,
        contents: '欢迎来到西安邮电大学'
      },
      library:{lng: 108.907681, lat: 34.158928},
      toolTipDisable:false,
      introduce:false,
      stopbus:false,
      walkroad:false,
    };
  },
  components:{maptool, Tooltip, Modal, Button,Card,Collapse},
  mounted(){
    this.clientHeight =  `${document.documentElement.clientHeight}`;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.colseToolTips();
  },
  watch:{
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
  methods:{
    changeFixed(clientHeight) {                        //动态修改样式
      document.getElementById("centerbox").style.height = clientHeight + 'px';
    },
    changNavBychild(start, end){
      this.start = start;
      this.end = end;
      if (this.start == ""){
        this.isNav = false;
      } else{
        this.isNav = true;
      }
    },
    walkroad(){
      // this.isGeo = true;
      // this.start1 = dingwei;
      // this.end1 = showPonit;
      // console.log(this.isGeo);
      // console.log(this.start1);
      // console.log(this.end1);
      // var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});
      // walking.search("西安邮电大学", "陕西师范大学");
      // var map = new BMap.Map("container");
      // map.centerAndZoom(new BMap.Point(116.404, 39.915), 14); 
      var walking = new BMap.WalkingRoute(map, { 
        renderOptions: { 
        map: map, 
        autoViewport: true 
        }
      });
var start1 = new BMap.Point(108.906693,34.161691);
var end1 = new BMap.Point(108.907079,34.160414);
walking.search(start1, end1);
    },
    Geo(e){
      console.log(e);
      console.log(e.point);
      this.dingwei = e.point;
    },
    showPoint(point,name){
      this.showPonit = point;
      this.centerPoint = point;
      this.zoom = 18;
      this.showPonitName = name;
      this.isShowPoint = true;
    },
    // getCity(){
    //   let _this = this;
    //   let ponit = null;
    //   var geolocation = new BMap.Geolocation();
    //   geolocation.getCurrentPosition(function(r) {
    //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //       if(r.accuracy==null){
	  //         alert('您已拒绝地理位置授权');
	  //   //用户决绝地理位置授权
    //         return;
    //       }else{
    //         const myGeo = new BMap.Geocoder()
    //         myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
    //          if (data.addressComponents) {
    //           const result = data.addressComponents
    //           const location = {
    //             creditLongitude: r.point.lat, // 经度
    //             creditLatitude: r.point.lng, // 纬度
    //             creditProvince: result.province || '', // 省
    //             creditCity: result.city || '', // 市
    //             creditArea: result.district || '', // 区
    //             creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
    //           }
    //           _this.location = location;
    //           _this.creditLongitude=location.creditLongitude;
    //           _this.creditLatitude=location.creditLatitude;
    //           _this.creditCity=location.creditCity;
    //           ponit = {lat: location.creditLatitude, lng: location.creditLongitude};
    //           // alert(this.getStatus());
    //          }
    //         })
    //       }
    //     }
    //   })
    // },
    get_point(e){
      // 获取坐标
      console.log(e.point);
      // alert(point);
    },
    changeCenter(){
      this.centerPoint = this.library;
    },
    colseToolTips(){
      // 3秒后隐藏
      setTimeout(this.setToolTipsFalse, 5000);
    },
    setToolTipsFalse(){
      this.toolTipDisable = "disabled";
    },
    open_introduce(){
      if (this.introduce){
        this.introduce = false;
      } else{
        this.introduce = true;
      }
    },
    open_stopbus(){
      if (this.stopbus){
        this.stopbus = false;
      } else{
        this.stopbus = true;
      }
    },
    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    }
  },
}
</script>
<style>
.navigate{
  background-color:cornflowerblue;
  height: auto;
}
.layout-top {
  width: 100%;
  height: 15%;
  background-color:rgb(115, 115, 199);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5em;
  color: white;
  font-weight: bolder;
  line-height: 50px;
  text-align: center;
}
.centerbox{
  width: 100%;
  height: 700px;
}
.map{
  width: 100%;
  height: 100%;
}
#bm-div > div > div.BMap_cpyCtrl.BMap_noprint.anchorTL > span{
  display: block !important;
}
#mapapp    > div.toolbar > div:nth-child(2) > div.ivu-select-dropdown > ul{
  height: 300px;
  overflow-y: scroll;
}
#introduce{
  right: 12px;
  top:122px;
  padding-top: 2px;
}
#stopbus{
  right: 12px;
  top:162px;
  padding-top: 2px;
}
#walkroad{
  right: 12px;
  top:202px;
  padding-top: 2px;
}
@font-face {
  font-family: 'iconfont';  /* project id 829567 */
  src: url('//at.alicdn.com/t/font_829567_ua54dme189.eot');
  src: url('//at.alicdn.com/t/font_829567_ua54dme189.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_829567_ua54dme189.woff') format('woff'),
  url('//at.alicdn.com/t/font_829567_ua54dme189.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_829567_ua54dme189.svg#iconfont') format('svg');
  }
.iconfont{
  font-family:"iconfont" !important;
  font-size:18px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.top_left_menu_type{
  width: 32px;
  height: 32px;
  cursor: pointer;
  position: absolute;
  margin: 0px;
  box-sizing: border-box;
  border: 1px solid #d9d7d5;
  border-radius: 3px;
  box-shadow: 1px 1px 1px rgba(0,0,0,.2);
  overflow: hidden;
  text-align: center;
  background: #f7f7f7;
}
.vueBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 30px;
  overflow: hidden;
  background: #fff;
}
</style>
