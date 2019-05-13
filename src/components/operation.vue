<template>
  <div class="operation">
    <a-card class="operationcard">
      <signout class="manager-singnout"></signout>
      <a-button type="primary" class="addplus" @click="showModal">
        <a-icon type="plus"/>
        添加{{departments}}
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
        <div v-for="(item,index) in dataSource" :key="item.name" class="resourcelist">
          <h2>{{item.name}}</h2>
          <a-popconfirm :title="deltitle" okText="确认" cancelText="取消" @confirm="confirm(index)">
            <span class="deleted">
              <a-icon type="delete"/>
            </span>
          </a-popconfirm>
          <span class="edit">
            <a-icon type="edit" @click="showedit(index)"/>
          </span>
          <editform
          ref="editForm"
        :visible="editvisible"
        :recorddata="currentdata"
        :name='department'
        :editindex='editindex'
        @cancel="handleCancel"
        @create="handleEdit"
          />
          <div>{{item.mark}}</div>
        </div>
      </div>

      <div v-else class="listboard">
        <a-table :columns="columns" :dataSource="datas" bordered>
          <template slot="del" slot-scope="text, record" class='todo'>
              <a class='edits' @click="showedittable(record.key)"> 修改   </a> 
              <editform
        :visible="editvisible"
        :recorddata="currentdata"
        :name='department'
        :editindex='editindex'
        @cancel="handleCancel"
        @create="handleEdit"
          />
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
      </div>
    </a-card>
  </div>
</template>

<script>
import CollectionCreateForm from "@/components/CollectionCreateForm";
import editform from "@/components/editform";
import { addcampus, addmajor,editcampus,editmajor } from "@/components/api.js";
import signout from "@/components/signout";
require("es6-promise").polyfill();
require("isomorphic-fetch");
const dataSource = [
  {
    name: "通信与信息工程学院",
    
  },
  {
    name: "电子工程学院",
  },
  {
    name: "自动化学院",
  },
  {
    name: "人文社科学院",
  },
  {
    name: "计算机学院",
  },
  {
    name: "马克思主义学院",
  },
  {
    name: "经济与管理学院",
  }
]; // 应该为初始化之前get的列表
const majorcolumns = [
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
const locationcolumns = [
  {
    title: "建筑名称",
    dataIndex: "name"
  },
  {
    title: "创建时间",
    dataIndex: "createdTime"
  },
  {
    title: "所处经纬度",
    dataIndex: "xy"
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
    // console.log(this.department)
    this.form = this.$form.createForm(this);
  },
  beforeMount() {
    // console.log(this.department)
    if (this.department === "学院" || this.department === "宿舍") {
      this.list = true;
    } else {
      this.list = false;
    }
  },
  components: { CollectionCreateForm, signout, editform },
  data() {
    return {
      dataSource,
      departments: this.department,
      deltitle: "确认删除此" + this.department + "吗？",
      list: true,
      visible: false,
      editvisible:false,
     currentdata:{name:'123',mark:'765'},
     editindex:0,
      columns: this.department === "专业" ? majorcolumns : locationcolumns,
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
      ]
    };
  },
  methods: {
    confirm(e) {
      console.log(this.dataSource[e]);
      dataSource.splice(e, 1);
    },
    confirmtable(key) {
      // 删除操作，在这里发起del请求和get请求来刷新列表

      const sa = this.datas.filter(item => item.key == key);
      this.datas = this.datas.filter(item => item.key !== key);
      console.log(this.datas);
      console.log(key);
      console.log(sa[0]);
    },
    showModal() {
      this.visible = true;
    },
    showedit(index){
        this.editvisible=true;
        // console.log(index);
         this.currentdata=this.dataSource[index];
        //  console.log(this.currentdata);
         this.editindex=index;
        //  console.log(this.index);
    },
    showedittable(key){
        
        this.editvisible=true;
        this.currentdata=this.datas.filter(item => item.key == key)[0];
        console.log(this.currentdata);
         this.editindex=key;
    },
    
    handleCreate() {
      console.log(this.$refs);
      console.log(this.$refs.collectionForm.form)
      if(this.department==='学院'){
          addcampus(this.$refs,dataSource,this);
      }else{
          addmajor(this.$refs, this);
      }
        // addcampus(this.$refs,dataSource,this);
    //  addmajor(this.$refs, this);
      //   const form = this.$refs.collectionForm.form;
      //   form.validateFields((err, values) => {
      //     if (err) {
      //       return;
      //     }
      //     console.log('Received values of form: ', values);
      //     dataSource.push(values);
      //     form.resetFields();
      //     this.visible = false;
      //   });
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
      fetch(`http://demo.nat200.top/admin/resource`,{
            method:'GET',

        }).then(res=>{
            console.log(res);
            return res.json();
        }).then(data=>{
            console.log(data,'5432');
        })
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.editvisible=false;
    },
    handleEdit(e){
        // if(this.department==='学院'){
        //     editcampus(this.$refs,dataSource,e,this)
        // }else{
        //     editmajor(this.$refs,e,this);
        // }
        // editcampus(this.$refs,dataSource,e,this)
        //  editmajor(this.$refs,e,this);
         console.log(this.$refs);
         console.log(e);
         const form = this.$refs.editForm[e].form;
       
        form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        dataSource.map((item,index)=>{
            if(index===e){
                console.log(item);
                item.name=values.name;
            }
        })
        this.editvisible=false;
        console.log(dataSource);
        });
    }
  }
};
</script>

<style>
.operation {
  width: 100%;
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
  right: 50px;
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
  /* overflow: hidden; */
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
.delete:hover{
    color: red;
}
.edits:hover{
    color:red;
}
</style>
