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
        <div v-for="(item) in dataSource" :key="item.id" class="resourcelist">
          <h2>用户名：{{item.username}}</h2>
          <a-popconfirm title="确定要删除此管理员么？" okText="确认" cancelText="取消" @confirm="confirm(item.id)">
            <span>
              <a-icon type="delete"/>
            </span>
          </a-popconfirm>
          <span class="resourceedit" @click="showedit(item.id,item.username)">
            <a-icon type="edit"/>
          </span>

          <div>所属部门：{{item.depart}}</div>
        </div>
        <editForm
            ref="editForm"
            :visible="editvisible"
            :username='currentusername'
            @cancel="handleCancel"
            @create="handleedit"
            :resourcelist="resourcelist"
          />
      </div>
    </a-card>
  </div>
</template>
<script>
import signout from "@/components/signout";
require("es6-promise").polyfill();
require("isomorphic-fetch");

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
        
        
      </a-form>
    </a-modal>
  `
};


const editForm = {
  props: ["visible", "resourcelist",'username'],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='修改管理员信息'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
          <a-form-item label='账号'>
          <a-input
            v-decorator="[
              'username',
              {
                initialValue:username,
                rules: [{ required: true, message: '账号不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        
        <a-form-item label='请选择所属部门'>
          <a-select
          
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
        
        
      </a-form>
    </a-modal>
  `
};
export default {
  components: { CollectionCreateForm, signout,editForm },
   data() {
    return {
      visible: false,
      resourcelist: [],
      editvisible:false,
      currentusername:'',

//       columns:[
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
//     dataIndex: "depart"
//   },
//   {
//     title: "操作",
//     dataIndex: "del",
//     scopedSlots: { customRender: "del" }
//   }
// ],
      dataSource:[],
      currentde:[],
      currentid:''
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
      res.content.sort((a,b)=>{
                      return a.id-b.id;
                });
      res.content.map((item,index)=>{
        this.dataSource[index]=item;
        fetch(`/api/admin/role/${item.roleIds[0]}`,{
          method:'GET'
        }).then(res=>{
          return res.json()
        }).then(res=>{
          console.log(res);
          this.dataSource[index].depart=res.name;
          this.dataSource.sort((a,b)=>{
                      return a.id-b.id;
                    });
          console.log(this.dataSource);
        })
      })
      
      });
     
  },
 
  methods: {
    confirm(key) {
      // 删除操作，在这里发起del请求和get请求来刷新列表
      // this.datas = this.datas.filter(item => item.key !== key);
      console.log(key);
      this.dataSource.splice(this.dataSource.length-1,1);
      fetch(`/api/admin/${key}`,{
        method:'DELETE'
      }).then(res=>{
        if(res.status===200){
          this.getmanagers()
        }
        return
      })
    },
    showedit(id,username){
      this.currentid=id;
      this.editvisible=true;
      this.currentusername=username;
    },
    getmanagers(){
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
      res.content.sort((a,b)=>{
                      return a.id-b.id;
                });
      console.log(res);
       res.content.map((item,index)=>{
        this.dataSource[index]=item;
        fetch(`/api/admin/role/${item.roleIds[0]}`,{
          method:'GET'
        }).then(res=>{
          return res.json()
        }).then(res=>{
          console.log(res);
          this.dataSource[index].depart=res.name;
          this.dataSource.sort((a,b)=>{
                      return a.id-b.id;
                    });
          console.log(this.dataSource);
        })
      })
      
      });
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
        // console.log(values.department.join(','));
       fetch(`/api/admin`,{
         method:'POST',
         headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username: values.username,
            password:values.password,
            roleIds:[values.department]
          })
       }).then(res=>{
         return res.json()
       }).then(res=>{
         this.getmanagers();
       })
        form.resetFields();
        this.visible = false;
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.editvisible=false;
    },
    handleedit(){
      this.editvisible=false;
       const form = this.$refs.editForm.form; 
       form.validateFields((err,values)=>{
         if(err){
           return;
         }
         console.log('formvalues: ',values);
          this.editvisible=false;
          fetch(`/api/admin`,{
            method:'PUT',
            headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          body: JSON.stringify({
            username: values.username,
            id: this.currentid,
            roleIds:[values.department]
          })
          }).then(res=>{
            return res.json()
          }).then(res=>{
            this.getmanagers();
          })
       })
       form.resetFields();
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
.managerscard .ant-card-body{
  height: 100%;
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
.resourcelist span:hover{
color: blue;
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

.admin-singnout {
  position: absolute;
  top: 20px;
  right: 5px;
}
.resourceedit {
  position: absolute;
  top: 10px;
  right: 60px !important;
  font-size: 18px;
  cursor: pointer;
}
.resourceedit:hover{
  color: blue;
}

</style>

