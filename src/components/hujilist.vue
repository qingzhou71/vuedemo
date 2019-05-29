//离校管理保卫处学生档案户籍表格
<template>
<div>
  <p>当前户籍所在地：{{this.content}}</p>
  <p>户籍转寄地址：{{this.zhuanji}}</p>
  <a-card style="width: 100%">
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
    <a-form-item
      v-bind="formItemLayout">
      <span slot="label">
        户籍转寄地址&nbsp;
        <a-tooltip title="接收户籍的地址（公司/学校/居委会/……）">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="[
          'residence',
          {
            rules: [{ required: true, message: '请填写户籍档案转寄地址', whitespace: true }]
          }
        ]"
      />
    </a-form-item>
    <!-- <a-form-item
      v-bind="formItemLayout">
      <span slot="label">
        组织关系档案转寄地址&nbsp;
        <a-tooltip title="接收档案的地址（公司/学校/居委会/……）">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="[
          'orRelationship',
          {
            rules: [{ required: true, message: '请填写组织关系档案转寄地址', whitespace: true }]
          }
        ]"
      />
    </a-form-item> -->
    <a-form-item
      :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }">
      <a-button
        type="primary"
        ghost
        @click="xiugai"
      >
        修改
      </a-button>
      <a-button
        type="primary"
        ghost
        html-type="submit"
      >
        提交
      </a-button>
    </a-form-item>
    </a-form>
  </a-card>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      content:"",
      username:"",
      id:"",
      zhuanji:"",
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
    }
  },
  beforeCreate(){
    this.form = this.$form.createForm(this);
    axios.get("/api/stu/me")
    .then((response,data) => {
      // this.content = response.data.politicalName;
      this.content = response.data.residence;
      this.username = response.data.username;
      console.log(this.content)
      console.log(response.data)
    })
    axios.get("/api/stu/relation")
    .then((response,data) =>{
      this.id = response.data.id;
      this.zhuanji = response.data.residence;
      console.log(response.data)
    })
  },
  methods:{
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      let datapost = {"username":this.username,"residence":values.residence};
      console.log(datapost);
      axios.post(`/api/stu/relation`,datapost)
      .then(res=>{
        console.log('res=>',res);            
      }).catch((error) => {
        console.log(error)
      })
      });
    },
    xiugai(){
      // e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      let dataput = {"id":this.id,"username":this.username,"residence":values.residence};
      console.log(dataput);
      axios.put(`/api/stu/relation`,dataput)
      .then(res=>{
        console.log('res=>',res);        
        alert("修改成功！");    
      }).catch((error) => {
        console.log(error)
      })
      });
    }
  }
}
</script>

<style>

</style>

