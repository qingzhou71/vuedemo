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
                rules: [{ required: true, message: '学院不能为空!' }],
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
    props: ['visible','name'],
  beforeCreate () {
    this.form = this.$form.createForm(this);
    // console.log(this.name);
  },
  created(){
      console.log(this.name);
  },
  data(){
      return {
          title:'添加'+this.name,
          labelname:'请输入要添加的'+this.name+'名称',
          campusselect:this.name==='专业'?true:false,
          resourcelist:[{name:'通信',id:'12'},{name:'电子',id:'13'},{name:'wertyu',id:'14'}]
      }
  }
}
</script>
