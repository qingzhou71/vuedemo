<template>
  <a-modal
    :visible="visible"
    :title="title"
    okText="确认"
    cancelText="取消"
    @cancel="() => { $emit('cancel') }"
    @ok="() => { $emit('create') }"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item v-if='cammanselect||dormselect' label="用户名：">
        <a-input
          v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item v-if='cammanselect||dormselect' label="密码">
        <a-input
          v-decorator="[
              'psaaword',
              {
                rules: [{ required: true, message: '密码不能为空!' }],
              }
            ]"
        />
      </a-form-item>
      <!-- <a-form-item v-if='dormselect' label="用户名：">
        <a-input
          v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
        />
      </a-form-item> -->
      <a-form-item v-else :label="labelname">
        <a-input
          v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
        />
      </a-form-item>
      
      <a-form-item v-if="campusselect" label="请选择所属学院">
        <a-select
          v-decorator="[
              'campus',
              {
                rules: [{ required: true, message: '学院不能为空!' }],
              }
            ]"
        >
          <a-select-option v-for="(item) in resourcelist" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="cammanselect" label="请选择所属学院">
        <a-select
          v-decorator="[
              'campus',
              {
                rules: [{ required: true, message: '学院不能为空!' }],
              }
            ]"
        >
          <a-select-option v-for="(item) in campuslist" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="locationselect" label="请输入建筑的经度">
        <a-input
          v-decorator="[
              'lon',
              {
                rules: [{ required: true, message: '不能为空!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item v-if="locationselect" label="请输入建筑的纬度">
        <a-input
          v-decorator="[
              'lat',
              {
                rules: [{ required: true, message: '不能为空!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item v-if="dormselect" label="请选择所属宿舍楼">
      <a-select
          v-decorator="[
              'dorm',
              {
                rules: [{ required: true, message: '宿舍楼不能为空!' }],
              }
            ]"
        >
          <a-select-option v-for="(item) in dormlist" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
        </a-form-item>
        <a-form-item v-if="dormitory" label="请输入宿舍所在位置经度">
        <a-input
          v-decorator="[
              'lon',
              {
                rules: [{ required: true, message: '不能为空!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item v-if="dormitory" label="请输入宿舍所在位置纬度">
        <a-input
          v-decorator="[
              'lat',
              {
                rules: [{ required: true, message: '不能为空!' }],
              }
            ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ["visible", 'name'],
  beforeCreate() {
    this.form = this.$form.createForm(this);
    // console.log(this.name);

<<<<<<< HEAD
    //  fetch(`/api/admin/me`,{
    //   method:'GET'
    // }).then(res=>{
    //   return res.json()
    // }).then(res=>{
    //   console.log(res);
    //   // 当前登录管理员的部门
    //   // console.log(res.authorities[0].authority);
    //   this.name=res.authorities[0].authority.substr(0,2);
    //   console.log(this.name);
    // });
=======
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
    fetch(`/api/campus`, {
      method: "GET"
    })
<<<<<<< HEAD
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res.content);
        this.resourcelist = res.content;
      });

    fetch(`/api/admin/role`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.dormlist =res.filter(item=>item.name.substr(2,2)==='公寓');
        console.log(res);
        this.campuslist=res.filter(item=>item.name.substr(item.name.length-2,2)==='学院');
        // console.log(that.dataSource);
      });
  },
  created() {
    console.log(this.name);
  },
  mounted(){
    console.log(this.name);
=======
    .then(res => {
      console.log(res.content);
      this.resourcelist = res.content;
    });

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
  },
  data() {
    return {
      names:this.name,
      title: "添加" + this.name,
      labelname: "请输入要添加的" + this.name + "名称",
      campusselect:
        this.name === "专业"  ? true : false,
      resourcelist: [],
      dormlist: [],
      campuslist:[],
      locationselect: this.name === "建筑" ? true : false,
      cammanselect: this.name === "学院管理员" ? true : false,
      dormselect: this.name=== "宿舍管理员" ? true : false,
      dormitory: this.name === "宿舍" ? true : false,
      // normal:this.dormlist
    };
  },
  watch:{
    name(){
      this.names=this.name;
      this.title= "添加" + this.name;
      this.labelname= "请输入要添加的" + this.name + "名称";
      this.campusselect=
        this.name === "专业"  ? true : false;
      
      this.locationselect= this.name === "建筑" ? true : false;
      this.cammanselect= this.name === "学院管理员" ? true : false;
      this.dormselect=this.name=== "宿舍管理员" ? true : false;
      this.dormitory=this.name === "宿舍" ? true : false;
    }
  }
};
</script>
