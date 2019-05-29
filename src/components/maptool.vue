//校园导航地图子组件
<template>
  <div class="toolbar">
    <div id="box"></div>
    <Dropdown placement="top" trigger="click" @on-click="draw_point">
      <Button>
        <i class="iconfont" style="color: #2196F3">&#xe651;</i>
        <Icon type="md-book" style="color: #2196F3"/>教学实验
      </Button>
      <DropdownMenu slot="list">
        <!-- <Dropdown placement="right-start"> -->
          <DropdownMenu v-for="(item) in experiment" :key="item.name">
            <DropdownItem :name="item.name">{{item.name}}</DropdownItem>
          </DropdownMenu>
        <!-- </Dropdown> -->
      </DropdownMenu>
    </Dropdown>
    <Dropdown placement="top" trigger="click" @on-click="draw_point">
      <Button>
        <i class="iconfont" style="color: #ffc107">&#xe600;</i>
        <Icon type="md-alarm" style="color: #ffc107"/>学生公寓
      </Button>
      <DropdownMenu slot="list">
        <!-- <Dropdown placement="right-start"> -->
          <DropdownMenu v-for="(item) in apartment" :key="item.name">
            <DropdownItem :name="item.name">{{item.name}}</DropdownItem>
          </DropdownMenu>
        <!-- </Dropdown> -->
      </DropdownMenu>
    </Dropdown>
    <Dropdown placement="top" trigger="click" @on-click="draw_point">
      <Button>
        <i class="iconfont" style="color: red">&#xe610;</i>
        <Icon type="md-cart" style="color: red"/>生活便利
      </Button>
      <DropdownMenu slot="list">
        <!-- <Dropdown placement="left-start"> -->
            <DropdownMenu v-for="(item) in convenient" :key="item.name">
                <DropdownItem :name="item.name">{{item.name}}</DropdownItem>
            </DropdownMenu>
        <!-- </Dropdown> -->
      </DropdownMenu>
    </Dropdown>
    <Dropdown placement="top" trigger="click" @on-click="nav">
      <Button>
        <i class="iconfont" style="color: #4caf50">&#xe61b;</i>
        <Icon type="md-bus" style="color: #4caf50"/>路线规划
      </Button>
      <DropdownMenu slot="list">
        <Dropdown placement="left-start">
          <DropdownItem>
            汽车站
            <Icon type="ios-arrow-forward"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list">
            <DropdownItem name="长安校区-城北客运站">城北客运站</DropdownItem>
            <DropdownItem name="长安校区-城西客运站">城西客运站</DropdownItem>
            <DropdownItem name="长安校区-城南客运站">城南客运站</DropdownItem>
            <DropdownItem name="长安校区-三府湾客运站">三府湾客运站</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="left-start">
          <DropdownItem>
            火车站
            <Icon type="ios-arrow-forward"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list">
            <DropdownItem name="长安校区-西安站">西安站</DropdownItem>
            <DropdownItem name="长安校区-西安南站">西安南站</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <DropdownItem name="长安校区-西安北站">西安北站</DropdownItem>
        <DropdownItem name="长安校区-机场">机场</DropdownItem>
        <DropdownItem divided name v-if="isNav" style="color: red">关闭路径规划</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Anchor class="more-nav ivu-btn ivu-btn-dashed" :affix="false" v-if="isNav">
      <AnchorLink href="#bottom" title="查看更多路线"/>
    </Anchor> 
  </div>
</template>

<script>
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Anchor,
  AnchorLink,
  Icon
} from "iview";
export default {
  name: "toolbar",
  data() {
    return {
      convenient:[],
      apartment: [],
      experiment: [],
      location:null,
      xianzhan: {
        lng: 108.962878,
        lat: 34.277157
      },
      changan: {
        lng: 108.907619, 
        lat: 34.160853
      },
      jichang: {
        lng: 108.7685760000,
        lat: 34.4420790000
      },
      chengbei: {
        lng: 108.947701,
        lat: 34.317007
      },
      chengxi: {
        lng: 108.881043,
        lat: 34.279954
      },
      chengnan: {
        lng: 108.943845,
        lat: 34.191331
      },
      sanfuwan: {
        lng: 108.982417,
        lat: 34.284177
      },
      nanzhan: {
        lng: 109.1082580000,
        lat: 34.0989480000
      },
      beizhan: {
        lng: 108.944859,
        lat: 34.382361
      },
      isNav: false,
    };
  },
  props: {},
  components: {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Anchor,
    AnchorLink,
    Icon
  },
  beforeCreate() {
    this.$ajax.get("/api/location?size=50")
    .then((response, data, content) => {
      response.data.content.map(item => {
        console.log(item.name);
        if (
          item.name.substr(2, 2) === "教学" ||
          item.name.substr(2, 2) === "实验"
        ) {
          this.experiment.push(item);
        }else if (
            item.name.substr(2, 2) === "公寓"
        ) {
            this.apartment.push(item);
        } else {
            this.convenient.push(item);
        }
        console.log(item.name.substr(2, 2));
        });
        this.location = response.data.content;
        console.log(this.location);
    });
  },
  
  methods: {
    nav(name) {
      if (name != "") {
        let arrry = name.split("-");
        console.log(arrry);
        let start = this.getPosition(arrry[0]);
        console.log(start);
        let end = this.getPosition(arrry[1]);
        console.log(end);
        this.$emit("changNavBychild", start, end);
        this.isNav = true;
      } else {
        this.$emit("changNavBychild", "", "");
        this.isNav = false;
      }
    },
    getPosition(name) {
      let postion = "";
      switch (name) {
        case "长安校区":
          postion = this.changan;
          break;
        case "城北客运站":
          postion = this.chengbei;
          break;
        case "城西客运站":
          postion = this.chengxi;
          break;
        case "三府湾客运站":
          postion = this.sanfuwan;
          break;
        case "城南客运站":
          postion = this.chengnan;
          break;
        case "西安站":
          postion = this.xianzhan;
          break;
        case "西安南站":
          postion = this.nanzhan;
          break;
        case "西安北站":
          postion = this.beizhan;
          break;
        case "机场":
          postion = this.jichang;
          break;
      }

      return postion;
    },
    draw_point(name) {
      if (name == "" || name == undefined) {
        return;
      } 
      // 获取点
      console.log(name);
      let arr = name.substr(2, 2);
      console.log(arr);
      let point = null;
      if (arr === "公寓") {
        point = this.apartment.filter(item => item.name === name);
        point.latitude = this.apartment.filter(item => item.name === name).latitude;
      } else if (arr === "教学" || arr === "实验") {
        point = this.experiment.filter(item => item.name === name);
      } else if (arr !== "教学" && arr !== "实验" && arr !== "公寓"){
        point = this.convenient.filter(item => item.name === name);
      }
      console.log(point);
      this.$emit("showPoint", { lat: point[0].latitude, lng: point[0].longitude }, point[0].name);
      console.log(point[0].latitude);
      console.log(point[0].longitude);
      console.log(point[0].name);
    },
    mounted() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #box{
  height: 100%;
  width: 100%;
} */

@font-face {
  font-family: "iconfont"; /* project id 829567 */
  src: url("//at.alicdn.com/t/font_829567_ua54dme189.eot");
  src: url("//at.alicdn.com/t/font_829567_ua54dme189.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_829567_ua54dme189.woff") format("woff"),
    url("//at.alicdn.com/t/font_829567_ua54dme189.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_829567_ua54dme189.svg#iconfont") format("svg");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 18px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.toolbar {
  padding: 0;
  margin: 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
}
.toolbar-ul > li {
  display: inline;
}
.toolbar button {
  text-align: center;
}
.iconfont {
  display: block;
}
.more-nav {
  position: absolute;
  bottom: 80px;
  left: 50%;
  display: block;
  margin-left: -52px;
}
.ivu-anchor-link-title {
  margin-left: -14px !important;
}
.ivu-anchor-link:before {
  display: none !important;
}
</style>
