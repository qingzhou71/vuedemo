//离校管理就业指导中心去向展示
<template>
<div>
  <p>{{this.placement}}</p>
  <a slot="actions" @click="edit"><a-icon type="edit" />修改</a>
    <collection-create-form
    ref="collectionForm"
    :visible="visible"
    @cancel="handleCancel"
    @create="handleCreate"
    />
</div>
</template>

<script>
const CollectionCreateForm = {
  props: ['visible'],
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='修改毕业去向'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='修改毕业去向'>
          <a-input
            placeholder="请输入您新的毕业去向"
            v-decorator="[
              'plament',
              {
                rules: [{ required: true, message: '请填写您的毕业去向' }],
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  `,
};
import axios from 'axios'
export default {
  data() {
    return {
      placement:"",
      username:"",
      id:"",
      visible: false,
    }
  },
  components: { CollectionCreateForm},
  beforeCreate(){
    axios.get("/api/stu/place")
    .then((response,data) => {
      this.placement = response.data.placement;
      this.id = response.data.id;
      console.log(response.data);
    });
    axios.get("/api/stu/me")
    .then((response,data) => {
      this.username = response.data.username;
    })
  },
  methods:{
    edit(){
      this.visible = true;
    },
    handleCancel  () {
      this.visible = false;
    },
    handleCreate  () {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      let datapost = {"placement":values.plament,
      "username":this.username,
      "id":this.id,
      };
      console.log(datapost);
      axios.put(`/api/stu/place`,datapost)
      .then(res=>{
        console.log('res=>',res);
      }).catch((error) => {
        console.log(error)
      })
      form.resetFields();
      this.visible = false;
      });
    },
  }
}
</script>

<style>

</style>
