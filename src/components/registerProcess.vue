<template>
  <div class="process" :style="processstyle">
    <span style="display:none">
      {{msgs}}
      {{lat}}
      {{count}}
    </span>
    路程导航贴心奉上：
    <div class="registmap">
      <div id="container"></div>
      <div id="panel"></div>
    </div>

    <div class="registtext">
      <span>当前流程:</span>
      <a-steps size="small" :current="currentstep[0].seq-1" labelPlacement="vertical">
        <a-step
          v-for="(items,index) in campusdata.process"
          :key="index"
          :title="items.location.name"
        />
      </a-steps>
      <div class="reforsure">
        <a-button type="primary" @click="finish">完成注册</a-button>
      </div>
    </div>
  </div>
</template>


<script >
const campusdata = {};

export default {
  name: "process",
  props: ["msg"],
  data() {
    return {
      msgs: this.msg,
<<<<<<< HEAD
      lat: 1,
      lng: 2,
      timer: "",
      stuinfo: {},
      status: {},
      adminstatus: [],
      stustatus: [],
      count: 0,
      campusdata,
      processstyle: {
        height: window.screen.availHeight - 146 + "px"
      },
      currentstep: {}
=======
      lat:1,
      lng:2,
      timer:'',
      stuinfo:{},
      status:{},
      adminstatus:[],
      stustatus:[],
      count:0,
      campusdata,
      processstyle:{
        height:window.screen.availHeight-146+'px'
      },
      currentstep:{}
>>>>>>> 5cc64523675eea3a90eee1d063fdcbc75ff6fc44
    };
  },
  methods: {
    maps() {
      var _that = this; //存储this的值，防止实例化内部拿不到需要的this
      let map = new AMap.Map("container", {
        resizeEnable: true,

        center: [108.9, 34.15],

        zoom: 13
      });
      // map是否能够提出在methods外
      AMap.plugin("AMap.Geolocation", function() {
        // console.log(_that);
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位
          timeout: 10000, //超过10秒后停止定位
          buttonPosition: "RB" //定位按钮的停靠位置
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
    navi(lat, lng, count) {
      console.log(lat, lng);
      let map = new AMap.Map("container", {
        resizeEnable: true,

        center: [lng, lat],

        zoom: 13 //初始视窗
      });
      var walking = new AMap.Walking({
        map: map,
        panel: "panel"
<<<<<<< HEAD
      });
      //根据起终点坐标规划步行路线
      walking.search([lng, lat], ["108.9008617401", "34.153126515"], function(
        status,
        result
      ) {
        if (status === "complete") {
          log.success("绘制步行路线完成");
=======
    }); 
    //根据起终点坐标规划步行路线
    walking.search([lng,lat], ['108.9008617401','34.153126515'], function(status, result) {
        if (status === 'complete') {
            log.success('绘制步行路线完成')
>>>>>>> 5cc64523675eea3a90eee1d063fdcbc75ff6fc44
        } else {
          log.error("步行路线数据查询失败" + result);
        }
      });
    },
    onComplete(result) {
      this.lat = result.position.lat;
      this.lng = result.position.lng;
      this.count++;
    },
    finish() {
      // put请求修改status，判断流程的长度，与status长度进行比较，决定finish的值
      console.log(this.stustatus);
      console.log(this.currentstep);
      console.log(this.currentstep[0].seq);
      this.stustatus.push(this.currentstep[0].seq);
      console.log(
        this.adminstatus[this.adminstatus.length - 1] !==
          this.currentstep[0].seq
      );
      console.log(
        this.adminstatus[this.adminstatus.length - 1] != this.currentstep[0].seq
      );
      if (
        this.adminstatus[this.adminstatus.length - 1] != this.currentstep[0].seq
      ) {
        alert("请先到相关部门进行注册");
      } else {
        this.stustatus = this.stustatus.join(",");
        console.log(this.stustatus);
        fetch(`/api/stu/reporting`, {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            adminStatus: this.adminstatus.join(","),
            id: this.status.id,
            stuStatus: this.stustatus,
            finish: false,
            username: this.stuinfo.username
          })
        }).then(res => {
          if (res.status === 200) {
            fetch(`/api/stu/reporting`, {
              method: "GET"
            })
              .then(res => {
                return res.json();
              })
              .then(res => {
                if (res.adminStatus === "") {
                  this.adminstatus = [];
                } else {
                  this.adminstatus = res.adminStatus.split(",");
                  console.log(this.adminstatus);
                }
                if (res.stuStatus === "") {
                  this.stustatus = [];
                } else {
                  this.stustatus = res.stuStatus.split(",");
                }
                if (res.finish === true) {
                  this.$router.push({ path: "/performance" });
                }

                 fetch(`/api/reporting/${this.stuinfo.campus.id}`, {
              method: "GET"
            })
              .then(res => {
                return res.json();
              })
              .then(res => {
                console.log(res.process);
                console.log(this.adminstatus);
                console.log(this.stustatus);
                this.campusdata = res;
                if (this.adminstatus.length === 0) {
                  //判断管理员是否注册，没有则取第一步
                  this.currentstep = res.process.filter(item => item.seq == 1);
                } else {
                  //如果管理员已经注册，判断学生是否注册，如果没有继续第一步，按钮可用，如果注册，则取下一步，判断学生是否注册该点
                  if (
                    this.adminstatus[this.adminstatus.length - 1] ==
                    this.stustatus[this.stustatus.length - 1]
                  ) {
                    console.log(1);
                    console.log(
                      this.adminstatus[this.adminstatus.length - 1] * 1 + 1
                    );
                    this.currentstep = res.process.filter(
                      item =>
                        item.seq ==
                        this.adminstatus[this.adminstatus.length - 1] * 1 + 1
                    );
                  } else {
                    console.log("123456");
                    console.log(this.adminstatus[this.adminstatus.length - 1]);
                    console.log(
                      res.process.filter(
                        item =>
                          item.seq ==
                          this.adminstatus[this.adminstatus.length - 1]
                      )
                    );
                    this.currentstep = res.process.filter(
                      item =>
                        item.seq ==
                        this.adminstatus[this.adminstatus.length - 1]
                    );
                  }
                }
                console.log(this.currentstep);
              });

              });
          }
        });
      }
    }
  },
  beforeCreate() {
    fetch(`/api/stu/me`, {
      method: "GET"
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.stuinfo = res;
        this.stuinfo.campusname = res.campus.name; //获取学生基本信息
        //判断该用户身份

        fetch(`/api/stu/reporting`, {
          method: "GET"
        })
          .then(res => {
            if (res.status === 200) {
              return res.json();
            } else if (res.status === 404) {
              fetch(`/api/stu/reporting`, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  adminStatus: "",
                  finish: false,
                  stuStatus: "",
                  username: this.stuinfo.username
                })
              })
                .then(res => {
                  if (res.status === 200) {
                    return res.json();
                  }
                })
                .then(res => {
                  //post初始化成功后get新的数据进行操作
                  console.log(res);

                  fetch(`/api/stu/reporting`, {
                    method: "GET"
                  })
                    .then(res => {
                      if (res.status === 200) {
                        return res.json();
                      }
                    })
                    .then(res => {
                      this.status = res;
                      console.log(res);
                      console.log(res.adminStatus);
                      console.log(this.adminstatus);
                      if (res.adminStatus === "") {
                        this.adminstatus = [];
                      } else {
                        this.adminstatus = res.adminStatus.split(",");
                        console.log(this.adminstatus);
                      }
                      if (res.stuStatus === "") {
                        this.stustatus = [];
                      } else {
                        this.stustatus = res.stuStatus.split(",");
                      }
                      if (res.finish === true) {
                        this.$router.push({ path: "/performance" });
                      }

                      fetch(`/api/reporting/${this.stuinfo.campus.id}`, {
                        method: "GET"
                      })
                        .then(res => {
                          return res.json();
                        })
                        .then(res => {
                          console.log(res.process);
                          console.log(this.adminstatus);
                          console.log(this.stustatus);
                          this.campusdata = res;
                          if (this.adminstatus.length === 0) {
                            //判断管理员是否注册，没有则取第一步
                            this.currentstep = res.process.filter(
                              item => item.seq == 1
                            );
                          } else {
                            //如果管理员已经注册，判断学生是否注册，如果没有继续第一步，按钮可用，如果注册，则取下一步，判断学生是否注册该点
                            if (
                              this.adminstatus[this.adminstatus.length - 1] ==
                              this.stustatus[this.stustatus.length - 1]
                            ) {
                              console.log(1);
                              console.log(
                                this.adminstatus[this.adminstatus.length - 1] *
                                  1 +
                                  1
                              );
                              this.currentstep = res.process.filter(
                                item =>
                                  item.seq ==
                                  this.adminstatus[
                                    this.adminstatus.length - 1
                                  ] *
                                    1 +
                                    1
                              );
                            } else {
                              console.log("123456");
                              console.log(
                                this.adminstatus[this.adminstatus.length - 1]
                              );
                              console.log(
                                res.process.filter(
                                  item =>
                                    item.seq ==
                                    this.adminstatus[
                                      this.adminstatus.length - 1
                                    ]
                                )
                              );
                              this.currentstep = res.process.filter(
                                item =>
                                  item.seq ==
                                  this.adminstatus[this.adminstatus.length - 1]
                              );
                            }
                          }
                          console.log(this.currentstep);
                        });
                    });
                });
            }
          })
          .then(res => {
            this.status = res;
            console.log(res);
            console.log(res.adminStatus);
            console.log(this.adminstatus);
            if (res.adminStatus === "") {
              this.adminstatus = [];
            } else {
              this.adminstatus = res.adminStatus.split(",");
              console.log(this.adminstatus);
            }
            if (res.stuStatus === "") {
              this.stustatus = [];
            } else {
              this.stustatus = res.stuStatus.split(",");
            }
            if (res.finish === true) {
              this.$router.push({ path: "/performance" });
            }

            fetch(`/api/reporting/${this.stuinfo.campus.id}`, {
              method: "GET"
            })
              .then(res => {
                return res.json();
              })
              .then(res => {
                console.log(res.process);
                console.log(this.adminstatus);
                console.log(this.stustatus);
                this.campusdata = res;
                if (this.adminstatus.length === 0) {
                  //判断管理员是否注册，没有则取第一步
                  this.currentstep = res.process.filter(item => item.seq == 1);
                } else {
                  //如果管理员已经注册，判断学生是否注册，如果没有继续第一步，按钮可用，如果注册，则取下一步，判断学生是否注册该点
                  if (
                    this.adminstatus[this.adminstatus.length - 1] ==
                    this.stustatus[this.stustatus.length - 1]
                  ) {
                    console.log(1);
                    console.log(
                      this.adminstatus[this.adminstatus.length - 1] * 1 + 1
                    );
                    this.currentstep = res.process.filter(
                      item =>
                        item.seq ==
                        this.adminstatus[this.adminstatus.length - 1] * 1 + 1
                    );
                  } else {
                    console.log("123456");
                    console.log(this.adminstatus[this.adminstatus.length - 1]);
                    console.log(
                      res.process.filter(
                        item =>
                          item.seq ==
                          this.adminstatus[this.adminstatus.length - 1]
                      )
                    );
                    this.currentstep = res.process.filter(
                      item =>
                        item.seq ==
                        this.adminstatus[this.adminstatus.length - 1]
                    );
                  }
                }
                console.log(this.currentstep);
              });
          });
        //根据学生的所在学院获取当前流程
      });
  },
  beforeUpdate() {
    this.navi(this.lat, this.lng, this.count);
  },
  mounted() {
<<<<<<< HEAD
    this.maps();
=======
     this.maps();
>>>>>>> 5cc64523675eea3a90eee1d063fdcbc75ff6fc44
    console.log(document.documentElement.clientHeight);
    //  setTimeout(()=>{
    //   //  document.documentElement.scrollTop=100;
    //    console.log( document.documentElement.scrollTop)
    //    console.log('12345')
    //  },0);
    //  this.timer=setInterval(this.maps,10000);
<<<<<<< HEAD
    //   定位刷新，控制地图不重载
  }
=======
     //   定位刷新，控制地图不重载
  },
>>>>>>> 5cc64523675eea3a90eee1d063fdcbc75ff6fc44
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
.registmap {
  /* display: flex; */
  height: 70%;
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
.process .amap-lib-walking .planTitle {
  padding: 0 !important;
}
.process .amap-lib-walking .plan dt {
  line-height: unset !important;
}
.process .ant-steps-item {
  width: 20%;
}
.process .ant-steps-label-vertical .ant-steps-item-tail {
  margin-left: 20px !important;
}
.process .ant-steps-label-vertical .ant-steps-item-icon {
  margin-left: 10px !important;
}
.process .ant-steps-label-vertical .ant-steps-item-content {
  margin-left: -30px !important;
  font-size: 10px;
  margin-top: 2px;
}
.reforsure {
  text-align: center;
  margin-top: 15px;
}
.reforsure .ant-btn-primary {
  width: 60%;
  max-width: 300px;
}
.registtext {
  height: 30%;
}
</style>

