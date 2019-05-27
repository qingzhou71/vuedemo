<template>
  <div class="operation">
    <a-card class="operationcard">
      <signout class="manager-singnout"></signout>
      <a-button type="primary" class="addplus" @click="showModal">
        <a-icon type="plus"/>
        添加{{department}}
      </a-button>

      <collection-create-form
        ref="collectionForm"
        :visible="visible"
        :name="department"
        @cancel="handleCancel"
        @create="handleCreate"
      />
      <h1>{{department}}详情：</h1>
      <div v-if="list" class="listboard">
<<<<<<< HEAD
        <div v-for="(item) in dataSource" :key="item.id" class="resourcelist">
          <h2 v-if='usernameshow'>用户名：{{item.username}}</h2>
          <h2 v-if='dormshow'>用户名：{{item.username}}</h2>
          <h2 v-else>{{item.name}}</h2>
          <a-popconfirm :title="deltitle" okText="确认" cancelText="取消" @confirm="confirm(item.id,item.name)">
=======
        <div v-for="(item,index) in dataSource" :key="item.name" class="resourcelist">
          <h2>{{item.name}}</h2>

          <a-popconfirm :title="deltitle" okText="确认" cancelText="取消" @confirm="confirm(item.id)">

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
            <span class="deleted">
              <a-icon type="delete"/>
            </span>
          </a-popconfirm>
          <span class="edit">
<<<<<<< HEAD
            <a-icon type="edit" @click="showedit(item,item.id)"/>
=======

            <a-icon type="edit" @click="showedit(index,item.id)"/>
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
          </span>
          
          <div v-if='majorshow'>{{item.campus.name}}</div>
          <div v-if='usernameshow'>所属学院:{{item.depart}}</div>
           <div v-if='dormshow'>所属宿舍楼：{{item.depart}}</div>
        </div>
        <editform
            ref="editForm"
            :visible="editvisible"
            :recorddata="currentitem"
            :department="department"
            :campuslist='campuslist'
            @cancel="handleCancel"
            @create="handleEdit"
          />
<<<<<<< HEAD
      </div>

      <div v-else class="listtable">
        <a-table 
         :columns="locationcolumns"
         :dataSource="datas"
         :pagination="pagination"
         bordered 
         
        >
          <template slot="del" slot-scope="text, record" class="todo">
            <a class="edits" @click="showedittable(record)">修改</a>
            
=======
          <!-- <div>{{item.campus.name}}</div> -->

        </div>
      </div>

      <div v-else class="listboard">
        <a-table :columns="columns" :dataSource="datas" bordered>

          <template slot="del" slot-scope="text, record" class="todo">
            <a class="edits" @click="showedittable(record.key)">修改</a>
            <editform
              :visible="editvisible"
              :recorddata="currentdata"
              :name="department"
              :editindex="editindex"
              @cancel="handleCancel"
              @create="handleEdit"
            />

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
            <a-popconfirm
              :title="deltitle"
              v-if="datas.length"
              okText="确认"
              cancelText="取消"
              @confirm="() => confirmtable(record.key)"
            >
              <a class="delete">删除</a>

            </a-popconfirm>

          </template>
        </a-table>
        <editform
        ref="editForm"
              :visible="editvisible"
              :recorddata="currentitem"
              :department="department"
              @cancel="handleCancel"
              @create="handleEdit"
            />
      </div>
    </a-card>
  </div>
</template>

<script>
import CollectionCreateForm from "@/components/CollectionCreateForm";
import editform from "@/components/editform";

import *as sever from "@/components/api.js";

import signout from "@/components/signout";
require("es6-promise").polyfill();
require("isomorphic-fetch");
 // 应该为初始化之前get的列表

const locationcolumns = [
  {
    title: "建筑名称",
    dataIndex: "name"
  },
  {
    title: "位置经度",
    dataIndex: "longitude"
  },
  {
    title: "位置纬度",
    dataIndex: "latitude"
  },

  {
    title: "操作",
    dataIndex: "del",
    scopedSlots: { customRender: "del" }
  }
];
export default {
  props: ["department"],
  beforeCreate() {
    // console.log(department)
    this.form = this.$form.createForm(this);
<<<<<<< HEAD
     fetch(`/api/campus`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res.content);
      this.campuslist = res.content;
    });
=======

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
    
    // sever.getcampus(this);
    // sever.getmajor(this);
    // sever.getdorm(this);
    // sever.getlocation(this);
  },
  beforeMount() {
<<<<<<< HEAD
    console.log(this.departments)
    if (this.departments === "学院" || this.departments === "学院管理员"||this.departments==='宿舍'||this.departments === "宿舍管理员"||this.departments==='专业') {
=======
    // console.log(this.department)
    if (this.department === "学院" || this.department === "专业"||this.department==='宿舍') {

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
      this.list = true;
    } else {
      this.list = false;
    }
     switch(this.departments){
      case '学院':sever.getcampus(this);break;
      case '专业':sever.getmajor(this);break;
      case '宿舍':sever.getdorm(this);break;
      case '建筑': sever.getlocation(this);break;
      case '学院管理员':sever.getcamman(this);break;
      case '宿舍管理员':sever.getdorman(this);break;
    };

  },
  beforeUpdate(){
    console.log(this.departments)
    
  },
  components: { CollectionCreateForm, signout, editform },
  data() {
    return {
      dataSource:[],
      campuslist:[],
      rolelist:[],
      departments: this.department,
      deltitle: "确认删除此" + this.department + "吗？",
      list: true,
      visible: false,

      editvisible: false,
      currentitem: {},
      currentids:0,
      editindex: 0,
<<<<<<< HEAD
      usernameshow:this.department==='学院管理员'?true:false,
      dormshow:this.department==='宿舍管理员'?true:false,
      majorshow: this.department === "专业" ? true : false,
      locationcolumns,
=======

      columns: this.department === "专业" ? majorcolumns : locationcolumns,
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
      datas: [
        {
          key: "通信工程",
          name: "通信工程",
          campus: "通信与信息工程学院",
          createdTime: "2019-03-14"
        },
        {
          key: "电子信息",
          name: "电子信息",
          campus: "电子工程学院",
          createdTime: "2019-04-17"
        }
      ],
      pagination:{
        hideOnSinglePage:true,
        defaultCurrent:1
        }
    };
  },
  methods: {
<<<<<<< HEAD
    confirm(e,name) {
=======
    confirm(e) {

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
      
      console.log(e);
      
      // sever.delcampus(e,this);
      // sever.delmajor(e,this);
      // sever.deldorm(e,this);
      switch(this.department){
      case '学院':sever.delcampus(e,name,this);break;
      case '专业':sever.delmajor(e,this);break;
      case '宿舍':sever.deldorm(e,name,this);break;
      case '学院管理员':sever.delcamman(e,this);break;
      case '宿舍管理员':sever.deldorman(e,this);break;
    };
    },
    

    confirmtable(key) {
      // 删除操作，在这里发起del请求和get请求来刷新列表

      // const sa = this.datas.filter(item => item.key == key);
      // this.datas = this.datas.filter(item => item.key !== key);
      sever.dellocation(key,this);
      console.log(key);
     
    },
    showModal() {
      this.visible = true;
    },
<<<<<<< HEAD
    showedit(item,id) {
=======

    showedit(index,id) {
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
      this.editvisible = true;
      this.currentids=id;
      this.currentitem=item;
    },
    showedittable(item) {
       this.editvisible = true;
      console.log(item);
      this.currentitem=item;
    },

    handleCreate() {
      console.log(this.$refs);
      console.log(this.$refs.collectionForm.form);
<<<<<<< HEAD
      // if (this.department === "学院") {
      //   sever.addcampus(this.$refs,  this);
      // } else {
      // //  sever.addmajor(this.$refs, this);
      // // sever.adddorm(this.$refs,this);
      // sever.addlocation(this.$refs,this);
      // }
      switch(this.department){
      case '学院':sever.addcampus(this.$refs,this);break;
      case '专业':sever.addmajor(this.$refs, this);break;
      case '宿舍':sever.adddorm(this.$refs,this);break;
      case '建筑':sever.addlocation(this.$refs,this);break;
      case '学院管理员':sever.addcamman(this.$refs,this);break;
      case '宿舍管理员':sever.adddorman(this.$refs,this);break;
    };
=======
      if (this.department === "学院") {
        sever.addcampus(this.$refs, dataSource, this);
      } else {
      //  sever. addmajor(this.$refs, this);
      sever.adddorm(this.$refs,this);
      }

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;

      this.editvisible = false;
    },
    handleEdit(e) {
      // if(this.department==='学院'){
      //     editcampus(this.$refs,dataSource,e,this)
      // }else{
      //     editmajor(this.$refs,e,this);
      // }
<<<<<<< HEAD
    //  sever.editcampus(this.$refs,this)
      //  sever.editmajor(this.$refs,this);
      // sever.editdorm(this.$refs,this);
      // sever.editlocation(this.$refs,this);
      switch(this.department){
      case '学院':sever.editcampus(this.$refs,this.currentitem.name,this);break;
      case '专业':sever.editmajor(this.$refs, this);break;
      case '宿舍':sever.editdorm(this.$refs,this);break;
      case '建筑':sever.editlocation(this.$refs,this);break;
      case '学院管理员':sever.editcamman(this.$refs,this);break;
      case '宿舍管理员':sever.editdorman(this.$refs,this);break;

    };
      
    }
  },
  watch:{
    department(){
      console.log(this.department);
      this.departments=this.department;
        this.deltitle= "确认删除此" + this.department + "吗？";
      if (this.departments === "学院" || this.departments === "专业"||this.departments==='宿舍') {
      this.list = true;
    } else {
      this.list = false;
    }
     switch(this.departments){
      case '学院':sever.getcampus(this);break;
      case '专业':sever.getmajor(this);break;
      case '宿舍':sever.getdorm(this);break;
      case '建筑': sever.getlocation(this);break;
    };
=======
      // editcampus(this.$refs,dataSource,e,this)
      //  editmajor(this.$refs,e,this);
      console.log(this.$refs);
      console.log(e);
      console.log(this.editindex);
      const form = this.$refs.editForm[e].form;
      console.log(this.$refs.editForm[e]);
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        fetch(`/api//admin/education/campus`,{
          method:'PUT',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            name: values.name,
            id:this.currentids
          })
        }).then(res=>{
          return res.json()
        }).then(res=>{
          console.log(res);
        })
        
        this.editvisible = false;
        console.log(dataSource);
      });
      form.resetFields();

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
    }
  }
};
</script>

<style>
.operation {
  width: 100%;
  height: 100%;
}
.operationcard {
  width: 98%;
  margin: 0 auto;
  max-width: unset;
  height: 100%;
  position: relative;
  overflow: auto;
  padding: 0 20px;
}

.operationcard .ant-card-body {
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
  /* overflow: hidden; */
}
.deleted {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
}
.edit {
  position: absolute;
  top: 10px;

  right: 50px !important;

  font-size: 18px;
  cursor: pointer;
}
.deleted:hover {
  color: rgb(28, 28, 221);
}
.edit:hover {
  color: rgb(28, 28, 221);
}
.resourcelist div {
  padding: 10px;
  font-size: 17px;
}
.listboard {
  border: 1px solid rgb(196, 195, 195);
  border-radius: 4px;
  padding: 0 20px;
  margin: 0 20px;

  height: 72%;
  overflow-y: scroll;

}
.listtable{
  border: 1px solid rgb(196, 195, 195);
  border-radius: 4px;
  /* padding: 0 20px; */
  margin: 0 20px;
  height: 80%;
  overflow-y: scroll;
}
.manager-singnout {
  position: absolute;
  top: 20px;
  right: 5px;
}
/* .todo{
    position: relative;
}
 .delete{
    position: absolute;
    top:10px;
    right: 10px;
} */

.delete:hover {
  color: red;
}
.edits:hover {
  color: red;

}
</style>
