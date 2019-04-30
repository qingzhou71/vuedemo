<template>

  <div class="institution">
    <a-card class="institutioncard">
      <signout class='admin-singnout'></signout>
      <a-button type="primary" class="addplus" @click="showModal">
        <a-icon type="plus"/>新增学院
      </a-button>
      
       <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
      <h1>学院列表：</h1>
      <div class="listboard">
        <div v-for="(item,index) in dataSource" :key="item.name" class="resourcelist">
          <h2>{{item.name}}</h2>
          <a-popconfirm title="确定要删除该学院么？" okText="确认" cancelText="取消" @confirm="confirm(index)">
            <span>
              <a-icon type="delete"/>
            </span>
          </a-popconfirm>

          <div>{{item.mark}}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import signout from '@/components/signout'
require("es6-promise").polyfill();
require('isomorphic-fetch');
const dataSource = [
  {
    name: "通信与信息管理学院",
    mark: "something not sure,and for test"
  },
  {
    name: "电子工程学院",
    mark: "but i want"
  }
];
const CollectionCreateForm = {
  props: ['visible'],
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='添加学院'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='请输入要添加的学院名称'>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='备注'>
          <a-input
            type='textarea'
            v-decorator="['mark']"
          />
        </a-form-item>
        
      </a-form>
    </a-modal>
  `,
};

export default {
  components: { CollectionCreateForm,signout },
  data() {
    return {
      dataSource,
      visible: false
    };
  },
  methods: {
    confirm(e) {
      console.log(this.dataSource);
      dataSource.splice(e,1);
      console.log(e,e+1);
      console.log(this.dataSource)
    },
    showModal() {
      this.visible = true;
    },
    // handleOk(e) {
    //     this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values); 
    //     //   this.$router.push({path: '/register'});
    //     }
    //   });
    //   this.visible = false;

    // },
    handleCreate  () {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        dataSource.push(values);
        form.resetFields();
        this.visible = false;
      });
    //   fetch(`http://demo.nat200.top/admin/resource`,{
    //       method:'POST',
    //       body:{
    //           "name":"123333"
    //       }
    //   }).then(res=>{
    //       console.log(res);
    //       return res.json();
    //   }).then(data=>{
    //       console.log(data,'5432');
    //   })
    // fetch(`http://demo.nat200.top/admin/resource`,{
    //       method:'GET',
          
    //   }).then(res=>{
    //       console.log(res);
    //       return res.json();
    //   }).then(data=>{
    //       console.log(data,'5432');
    //   })
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }
};
</script>

<style>
.institution {
  width: 100%;
  height: 100%;
}
.institutioncard {
  width: 98%;
  margin: 0 auto;
  max-width: unset;
  height: 100%;
  position: relative;
}
.addplus {
  margin: 20px;
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  margin-bottom: 50px;
  margin-top: 50px;
}
.resourcelist {
  width: 90%;
  border-bottom: 1px solid silver;
  position: relative;
  margin: 40px 30px;
}
.resourcelist span {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
}
.resourcelist div {
  padding: 10px;
  font-size: 17px;
}
.listboard {
  border: 1px solid rgb(196, 195, 195);
  border-radius: 4px;
}
</style>

