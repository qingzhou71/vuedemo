<template>
  <div class="managers">
    <a-card class="managerscard">
      <signout class="admin-singnout"></signout>
      <a-button type="primary" class="addplus" @click="showModal">
        <a-icon type="plus"/>添加管理员
      </a-button>

      <collection-create-form
        ref="collectionForm"
        :visible="visible"
        @cancel="handleCancel"
        @create="handleCreate"
        :resourcelist="resourcelist"
      />
      <h1>管理员列表：</h1>
      <div class="listboard">
        <a-table :columns="columns" :dataSource="dataSource" bordered>
          <template slot='department' slot-scope="text, record">
            {{dataSource.depart}}
          </template>
          <template slot="del" slot-scope="text, record">
            <a-popconfirm
              title="确定要删除此人员么？"
              v-if="dataSource.length"
              okText="确认"
              cancelText="取消"
              @confirm="() => confirm(record.key)"
            >
              <a class="delete">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
        <!-- <table>
          <tr>
            <th v-for='(item,index) in columns' :key='index'>{{item.title}}</th>
          </tr>
        </table> -->
      </div>
    </a-card>
  </div>
</template>
<script>
import signout from "@/components/signout";
require("es6-promise").polyfill();
require("isomorphic-fetch");
// const columns = [
//   {
//     title: "用户名",
//     dataIndex: "name"
//   },
//   {
//     title: "账号",
//     dataIndex: "username"
//   },
//   {
//     title: "密码",
//     dataIndex: "password"
//   },
//   {
//     title: "所属部门",
//     dataIndex: "department"
//   },
//   {
//     title: "操作",
//     dataIndex: "del",
//     scopedSlots: { customRender: "del" }
//   }
// ];
const CollectionCreateForm = {
  props: ["visible", "resourcelist"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='添加管理员'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='姓名'>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '姓名不能为空!' }],
              }
            ]"
          />
        </a-form-item>
         <a-form-item label='账号'>
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '账号不能为空!' }],
              }
            ]"
          />
        </a-form-item>
         <a-form-item label='密码'>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '密码不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='请选择所属部门'>
          <a-select
          mode="multiple"
            v-decorator="[
              'department',
              {
                rules: [{ required: true, message: '部门不能为空!' }],
              }
            ]"
          >
          <a-select-option v-for='(item,index) in resourcelist' :key='item.id'>{{item.name}}</a-select-option>
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
  components: { CollectionCreateForm, signout },
   data() {
    return {
      visible: false,
      resourcelist: [
        { name: "学院办事处", id: "21" },
        { name: "后勤处", id: "23" },
        { name: "财务办", id: "67" }
      ],
      columns:[
  {
    title: "用户名",
    dataIndex: "name"
  },
  {
    title: "账号",
    dataIndex: "username"
  },
  {
    title: "密码",
    dataIndex: "password"
  },
  {
    title: "所属部门",
    dataIndex: "department"
  },
  {
    title: "操作",
    dataIndex: "del",
    scopedSlots: { customRender: "del" }
  }
],
      dataSource:[{
        password:'1234',
        username:'23',
        key:'1',
        department:'123',
        id:'1234'
      }],
      currentde:[]
    };
  },
  beforeCreate() {
    fetch(`/api/admin/role`,{
      method:'GET'
    }).then(res=>{
      return res.json()
    }).then(res=>{
      // console.log(res);
      this.resourcelist=res;
    })

    fetch(`/api/admin`, {
      method: "GET"
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return;
        }
      })
      .then(res => {
      //  this.dataSource=res.content;
      console.log(res);
      // this.dataSource=res.content;
      const datalist=[];
       res.content.map((item,index) => {
          datalist[index]=item;
          datalist[index].key=index;
          const roleid=item.roleIds[0];
          this.currentde=[];
          // var test='';
         fetch(`/api/admin/role/${roleid}`, {
            method: "GET"
          }).then(res => {
            if (res.status === 200) {
              return res.json();
            } else {
              return;
            }
          }).then(res=>{
          // datalist[index].department=res.name;
           console.log(res)
          //  console.log(this);
           this.currentde=res;
           datalist[index].depart=this.currentde.name;
           this.dataSource=datalist;
           
           console.log(this.dataSource);
          })

          
        });
        // console.log(datalist);
        // this.dataSource=datalist;
        // console.log(this.dataSource)

        
      });
     
  },
 
  methods: {
    confirm(key) {
      // 删除操作，在这里发起del请求和get请求来刷新列表
      this.datas = this.datas.filter(item => item.key !== key);
    },

    showModal() {
      this.visible = true;
      console.log(this.dataSource)
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
        console.log(values.department.join(","));
        params.name = values.name;
        params.username = values.username;
        params.password = values.password;
        params.department = values.department.join(",");
        params.key = values.username;
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
.managers {
  width: 100%;
}
.managerscard {
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
  height: 72%;
  overflow-y: scroll;
}
.delete {
  color: blue;
}
.delete:hover {
  cursor: pointer;
}
.admin-singnout {
  position: absolute;
  top: 20px;
  right: 5px;
}
</style>

