<template>
    <a-modal
      :visible="visible"
      :title='title'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create',this.editindex) }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item :label='labelname'>
          <a-input
            v-decorator="[
              'name',
              {
      
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
               
              }
            ]"
          >
          <a-select-option v-for='(item) in resourcelist' :key='item.id'>{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label='备注'>
          <a-input
            type='textarea'
            v-decorator="['mark']"
          />
        </a-form-item> -->
        
      </a-form>
    </a-modal>
</template>

<script>

export default {
    props: ['visible','recorddata','name','editindex'],
  beforeCreate () {
    this.form = this.$form.createForm(this);
    // console.log(this.data,50);
    
  },
  created(){
    // console.log(this.recorddata);
    // this.datas=this.recorddata
  },
  data(){
      return {
          datas:this.recorddata,
          index:this.editindex,
          title:'修改'+this.name+'信息',
          labelname:'修改'+this.name+'名称',
          defaultname:this.recorddata.name,
          campusselect:this.name==='专业'?true:false,
          resourcelist:[{name:'通信',id:'12'},{name:'电子',id:'13'},{name:'wertyu',id:'14'}]
      }
  },
  menthods:{
    
  },
  watch:{
    recorddata(){
      // console.log(this.recorddata,65);
       this.datas=this.recorddata;
      //  console.log(this.datas.name);
          this.defaultname=this.recorddata.name;
          // console.log(this.defaultname,678);
          
    },
    editindex(){
      // console.log(this.editindex);
      this.index=this.editindex;
      // console.log(this.editindex);
    }
  }
}
</script>