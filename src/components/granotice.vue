//离校管理系统使用须知子组件

<template>
  <div class="card-container">
    <a-tabs type="card">
      <a-tab-pane tab="使用须知" key="1">
        <p>1、确认模块无误后，方可点击确认；</p>
        <p>2、一旦确认无法更改；</p>
        <p>3、显示有误的信息可进行修改，部分信息需携带相关材料前往办公室进行办理；</p>
        <p>4、需要修改的模块待线下手续办理完成后再点击确认；</p>
        <p>5、若操作不当点击确认，可前往院办进行更改；</p>
        <p>6、使用过程中有任何问题可拨打电话XXXXXXXXXXX进行咨询。</p>
      </a-tab-pane>
      <a-tab-pane tab="离校通知" key="2">
        <p>1、请所有学生于2019年6月20日之前完成离校流程。</p>
        <p>2、请所有学生于2019年6月10日之前至辅导员办公室领取毕业证书和学位证书。</p>
        <p>3、请所有学生于2019年6月30日之前离宿。</p>
      </a-tab-pane>
      <a-tab-pane tab="办公地址" key="3">
        <p>1、科技立项部地址：</p>
        <p>2、图书管理处地址：</p>
        <p>3、团委办公室地址：</p>
        <p>4、党委办公室地址：</p>
        <p>5、保卫处地址：</p>
        <p>6、就业指导中心地址：</p>
        <p>7、财务处地址：</p>
        <p>8、宿舍管理处地址：</p>
        <p>9、卡务中心地址：</p>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>
<style>
.card-container {
  background: #F5F5F5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: auto;
  margin-top: -16px;
  text-align: left;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
