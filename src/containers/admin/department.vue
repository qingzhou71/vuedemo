<template>
  <div class="department">
    <a-card class="departmentcard">
      <signout class='admin-singnout'></signout>
        <a-button type="primary" class="addplus" @click="showModal">
        <a-icon type="plus"/>添加部门
      </a-button>
      
       <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
      :resourcelist="resourcelist"
    />
      <h1>部门列表：</h1>
      <div class="listboard">
        <div v-for="(item,index) in dataSource" :key="item.name" class="resourcelist">
          <h2>{{item.name}}</h2>
          <a-popconfirm title="确定要删除此部门么？" okText="确认" cancelText="取消" @confirm="confirm(index)">
            <span>
              <a-icon type="delete"/>
            </span>
          </a-popconfirm>

          <div>所属资源：{{item.resource}}管理</div>
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
    name: "学院办事处",
    resource: "注册"
  },
  {
    name: "后勤处",
    resource: "离校"
  }
];
const CollectionCreateForm = {
  props: ['visible','resourcelist'],
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='添加部门'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='请输入要添加的部门'>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='请选择对应资源'>
          <a-select
          mode="multiple"
            v-decorator="[
              'resource',
              {
                rules: [{ required: true, message: '资源不能为空!' }],
              }
            ]"
          >
          <a-select-option v-for='(item,index) in resourcelist' :key='item'>{{item}}</a-select-option>
          </a-select>
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
  beforeCreate(){
      // get请求进行数据的初始化，资源，角色，以及数据的处理（数据的处理好像很麻烦）
  },
  data() {
    return {
      dataSource,
      visible: false,
      resourcelist:['注册','离校']
    };
  },
  methods: {
    confirm(e) {
        // 删除操作，在这里发起del请求和get请求来刷新列表
      console.log(this.dataSource);
      dataSource.splice(e,1);
    },
    showModal() {
      this.visible = true;
    },
    handleCreate  () {
        // 添加操作，在这里发起post请求和get请求获取数据刷新列表，重点是对数据的处理
      const form = this.$refs.collectionForm.form;
      const params={};
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        console.log(values.resource.join(','));
        params.name=values.name;
        params.resource=values.resource.join(',');
        dataSource.push(params);
        form.resetFields();
        this.visible = false;
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }};
</script>

<style>
.department {
  width: 100%;
}
.departmentcard {
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
