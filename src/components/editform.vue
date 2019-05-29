<template>
    <a-modal
      :visible="visible"
      :title='title'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item v-if='cammanselect||dormselect' label="用户名：">
        <a-input
          v-decorator="[
              'username',
              {
                initialValue:recorddata.username,
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
        />
      </a-form-item>
      
        <a-form-item v-else :label='labelname'>
          <a-input
            v-decorator="[
              'name',
              {
                initialValue:recorddata.name,
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
           
          />
        </a-form-item>
        <a-form-item v-if='campusselect' label='请选择所属学院'>
          <a-select
            v-decorator="[
              'campus',
              {
               rules: [{ required: true, message: '学院不能为空!' }],
              }
            ]"
          >
          <a-select-option v-for='(item) in campuslist' :key='item.id'>{{item.name}}</a-select-option>
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
          <a-select-option v-for="(item) in resourcelist" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
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

        <a-form-item v-if='locationselect' label='修改建筑的经度'>
          <a-input
            v-decorator="[
              'lon',
              {
                initialValue:recorddata.longitude,
                rules: [{ required: true, message: '不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-if="locationselect" label='修改建筑的纬度'>
          <a-input
            v-decorator="[
              'lat',
              {
                initialValue:recorddata.latitude,
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
    props: ['visible','recorddata','department','campuslist'],
  beforeCreate () {
    this.form = this.$form.createForm(this);
    // console.log(this.data,50);

    fetch(`/api/admin/role`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.dormlist =res.filter(item=>item.name.substr(2,2)==='公寓');
        console.log(res);
        this.resourcelist=res.filter(item=>item.name.substr(item.name.length-2,2)==='学院');
        // console.log(that.dataSource);
      });
    
  },
  created(){
    // console.log(this.recorddata);
    // this.datas=this.recorddata
  },
  data(){
      return {
          // datas:this.recorddata,
         
          title:'修改'+this.department+'信息',
          labelname:'修改'+this.department+'名称',
          campusselect:this.department==='专业'?true:false,
           locationselect:this.department==='建筑'?true:false,
           cammanselect:this.department==='学院管理员'?true:false,
           dormselect: this.department === "宿舍管理员" ? true : false,
           resourcelist:[],
           dormlist:[]
      }
  },
  menthods:{
    
  },
  watch:{
    recorddata(){
      // console.log(this.recorddata,65);
       this.datas=this.recorddata;
      //  console.log(this.datas.name);
          // this.defaultname=this.recorddata.name;
          // console.log(this.defaultname,678);
          
    },
    department(){
        
          this.title='修改'+this.department+'信息';
          this.labelname='修改'+this.department+'名称';
          this.campusselect=this.department==='专业'?true:false;
          this. locationselect=this.department==='建筑'?true:false;
          this. cammanselect=this.department==='学院管理员'?true:false;
           this.dormselect=this.department === "宿舍管理员" ? true : false;
    }
    
  }
}
</script>