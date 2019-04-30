<template>
  <div class="major">
    <a-card class="majorcard">
      <signout class='admin-singnout'></signout>
      <a-button type="primary" class="addplus" @click="showModal">
        <a-icon type="plus"/>新增专业
      </a-button>

      <collection-create-form
        ref="collectionForm"
        :visible="visible"
        @cancel="handleCancel"
        @create="handleCreate"
        :resourcelist="resourcelist"
      />
      <h1>专业列表：</h1>
      <div class="listboard">
        <a-table :columns="columns" :dataSource="datas" bordered>
          <template slot="del" slot-scope="text, record">
            <a-popconfirm
              title="确定要删除该专业么？"
              v-if="datas.length"
              okText="确认"
              cancelText="取消"
              @confirm="() => confirm(record.key)"
            >
              <a class="delete">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>
<script>
import signout from '@/components/signout'
require("es6-promise").polyfill();
require("isomorphic-fetch");
const columns = [
  {
    title: "专业名称",
    dataIndex: "name"
  },
  {
    title: "创建时间",
    dataIndex: "createdTime"
  },
  {
    title: "所属学院",
    dataIndex: "campus"
  },
  
  {
    title: "操作",
    dataIndex: "del",
    scopedSlots: { customRender: "del" }
  }
];
const CollectionCreateForm = {
  props: ["visible", "resourcelist"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='新增专业'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='名称'>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
          />
        </a-form-item>
         
        <a-form-item label='请选择所属学院'>
          <a-select
          
            v-decorator="[
              'campus',
              {
                rules: [{ required: true, message: '学院不能为空!' }],
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
  `
};

export default {
  components: { CollectionCreateForm ,signout},
  beforeCreate() {
    // get请求进行数据的初始化，资源，角色，以及数据的处理（数据的处理好像很麻烦）
  },
  data() {
    return {
      visible: false,
      resourcelist: ["通信与信息工程学院", "电子工程学院", "人文社科学院"],
      columns,
      datas: [
        {
          key: "通信工程",
          name: "通信工程",
          campus: "通信与信息工程学院",
          createdTime:'2019-03-14'
        },
        {
            key:'电子信息',
            name:'电子工程学院',
            campus:'电子信息',
            createdTime:'2019-04-17'
        }
      ]
    };
  },
  methods: {
    confirm(key) {
      // 删除操作，在这里发起del请求和get请求来刷新列表
      this.datas = this.datas.filter(item => item.key !== key);
    },

    showModal() {
      this.visible = true;
    },
    handleCreate() {
      // 添加操作，在这里发起post请求和get请求获取数据刷新列表，重点是对数据的处理
      const form = this.$refs.collectionForm.form;
      const params = {};
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        // console.log(values.department.join(","));
        params.name = values.name;
        params.createdTime=values.createdTime;
        params.campus = values.campus.join(",");
        params.key = values.name;
        console.log(params);
        this.datas.push(params);
        form.resetFields();
        this.visible = false;
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }
};
</script>

<style>
.major {
  width: 100%;
  height: 100%;
}
.majorcard {
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
.delete {
  color: blue;
}
.delete:hover {
  cursor: pointer;
  color:red;
}
</style>

