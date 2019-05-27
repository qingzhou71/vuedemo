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
        <div v-for="(item) in dataSource" :key="item.name" class="resourcelist">
          <h2>{{item.name}}</h2>
          <a-popconfirm title="确定要删除此部门么？" okText="确认" cancelText="取消" @confirm="confirm(item.id)">
            <span>
              <a-icon type="delete"/>
            </span>
          </a-popconfirm>
          <span class="resourceedit"  @click='showedit(item.name,item.resource,item.id)'>
            <a-icon type="edit"/>
          </span>

          <div>所属资源：{{item.resource}}</div>
        </div>
        <editForm
            ref="editForm"
            :visible="editvisible"
            :list="currentlist"
            :name='currentname'
            @cancel="handleCancel"
            @create="handleedit"
            :resourcelist="resourcelist"
          />
      </div>
    </a-card>
  </div>
</template>
<script>

import signout from '@/components/signout';
import {newdepart} from '@/components/constant.js';

require("es6-promise").polyfill();
require('isomorphic-fetch');
// const dataSource = [
//   {
//     name: "学院办事处",
//     resource: "注册"
//   },
//   {
//     name: "后勤处",
//     resource: "离校"
//   }
// ];
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
           mode='multiple'
            v-decorator="[
              'resource',
              {
                
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
  `,
};


const editForm = {
  props: ['visible','resourcelist','list','name'],
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='修改部门'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        
        <a-form-item label='请选择对应资源'>
          <a-select
           mode='multiple'
            v-decorator="[
              'resource',
              {
               
              }
            ]"
          >
          <a-select-option v-for='(item,index) in resourcelist' :key='item.id'>{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
      
        
      </a-form>
    </a-modal>
  `,
};
// const newdepart='1234'
export default {
  // newdepart,
  components: { CollectionCreateForm,signout, editForm},
  beforeCreate(){
      // get请求进行数据的初始化，资源，角色，以及数据的处理（数据的处理好像很麻烦）
      fetch(`/api/admin/resource`, {
              method: "GET"
            })
              .then(res => {
                console.log(res);
                return res.json();
              })
              .then(data => {
                console.log(data, "5432");
                 this.resourcelist = data.children;
              });

       fetch(`/api/admin/role`, {
              method: "GET"
            })
              .then(res => {
                // console.log(res);
                return res.json();
              })
              .then(data => {
                // console.log(data, "5432");
                data.sort((a,b)=>{
                      return a.id-b.id;
                });
                // console.log(data);
                data.map((item,index)=>{   //因为data是乱序的，所以有资源角色错位的情况
                  this.dataSource[index]=item;
                  //  console.log(item.id)
                  fetch(`/api/admin/role/${item.id}/resource`,{
                    method:'GET'
                  }).then(res=>{
                    return res.json()
                  }).then(res=>{
                    //  console.log(res);
                    // this.dataSource[index].resource=res;
                     if(res.length===0){
                       this.dataSource[index].resource='暂无资源';
                    }
                    else{
                      const datalist=[];
                      res.map((items,index)=>{
                        datalist[index]=this.resourcelist.filter(item=>item.id==res[index])[0].name
                      })
                      // console.log(datalist);
                      this.dataSource[index].resource=datalist.join(',');
                      // this.dataSource[index].resource=this.resourcelist.filter(item=>item.id==res[0])[0].name;
                    }
                    
                    this.dataSource.sort((a,b)=>{
                      return a.id-b.id;
                    });
                  })
                })
              });




              
  },
  data() {
    return {
      dataSource:[],
      visible: false,
      editvisible:false,
      resourcelist:[],
      currentname:'',
      currentlist:[],
      currentid:''
    };
  },
  methods: {
    confirm(e) {
        // 删除操作，在这里发起del请求和get请求来刷新列表
<<<<<<< HEAD
      // console.log(this.dataSource);
=======
      console.log(this.dataSource);

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
      this.dataSource.splice(this.dataSource.length-1,1);
      // console.log(e);
      // dataSource.splice(e,1);
      fetch(`/api/admin/role/${e}`,{
        method:'DELETE'
      }).then(res => {
        if (res.status === 200) {
          this.getrole();
        }
        return;
      });
    },
    showedit(name,list,id){
      this.editvisible=true;
      this.currentname=name;
      
       this.currentlist=list.split(',');
      this.currentid=id;
    },
    getrole(){
       fetch(`/api/admin/role`, {
              method: "GET"
            })
              .then(res => {
                // console.log(res);
                return res.json();
              })
              .then(data => {
                // console.log(data, "5432");
                data.sort((a,b)=>{
                      return a.id-b.id;
                });
                data.map((item,index)=>{
                  // console.log(this.dataSource);
                  this.dataSource[index]=item;
                  // console.log(item.id)
                  fetch(`/api/admin/role/${item.id}/resource`,{
                    method:'GET'
                  }).then(res=>{
                    return res.json()
                  }).then(res=>{
                    // console.log(res.length);
                    this.dataSource[index].resource=res;
                    if(res.length===0){
                       this.dataSource[index].resource='暂无数据';
                    }
                    else{
                      const datalist=[];
                      res.map((items,index)=>{
                        datalist[index]=this.resourcelist.filter(item=>item.id==res[index])[0].name
                      })
                      this.dataSource[index].resource=datalist.join(',');
                      // console.log(datalist);
                      // this.dataSource[index].resource=this.resourcelist.filter(item=>item.id==res[0])[0].name;
                    }
                    
                    this.dataSource.sort((a,b)=>{
                      return a.id-b.id;
                    });
                  })
                })
              });
              

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
        //  newdepart=values.name;
        // console.log(values.resource.join(','));
        // params.name=values.name;
        // params.resource=values.resource.join(',');
        // dataSource.push(params);
        fetch(`/api/admin/role`,{
          method:'POST',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            name: values.name,
          })
        }).then(res=>{
          return res.json()
        }).then(res=>{
          // console.log(res);
           console.log(values.resource);
           


          if(values.resource===undefined){
            this.getrole();
            return
          }
          else{
          fetch(`/api/admin/role/${res.id}/resource?ids=${values.resource}`,{
            method:'POST',
            headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          }).then(res=>{
            console.log(res)
            if(res.status===200){
              this.getrole();
            }
            return;
          })
          }
          
        })



        form.resetFields();
        this.visible = false;
        // console.log(this.dataSource)
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.editvisible=false;
    },
    handleedit(){
       const form = this.$refs.editForm.form; 
       form.validateFields((err,values)=>{
         if(err){
           return;
         }
         console.log('formvalues:',values);
         this.editvisible=false;

        //  fetch(`/api/admin/role/${this.currentid}`,{
        //    method:'PUT',
        //    headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "content-type": "application/json"
        //   },
        //   body: JSON.stringify({
        //     name: values.edit,
        //     id: this.currentid
        //   })
        //  }).then(res=>{
        //    return res.json()
        //  }).then(res=>{
        //    console.log(res);
            if(values.resource===undefined){
            this.getrole();
            return
          }
          else{
            console.log(values.resource);
          fetch(`/api/admin/role/${this.currentid}/resource?ids=${values.resource}`,{
            method:'POST',
            headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          }).then(res=>{
            console.log(res)
            if(res.status===200){
              this.getrole();
            }
            return;
          })
          }
        //  })
       })
       form.resetFields();

      

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
.departmentcard .ant-card-body {
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
  overflow-y: scroll;
  height: 72%;
}
.resourceedit {
  position: absolute;
  top: 10px;
  right: 60px !important;
  font-size: 18px;
  cursor: pointer;
}
.admin-singnout {
  position: absolute;
  top: 20px;
  right: 5px;
}
</style>


