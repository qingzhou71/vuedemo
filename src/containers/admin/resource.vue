<template>
  <div class="resource">
    <a-card class="resourcecard">
      <signout class="admin-singnout"></signout>
      <a-button type="primary" class="addplus" @click="showModal">
        <a-icon type="plus"/>添加资源
      </a-button>

      <collection-create-form
        ref="collectionForm"
        :visible="visible"
        :urllist='urllist'
        @cancel="handleCancel"
        @create="handleCreate"
      />
      <h1>资源详情：</h1>
      <div class="listboard">
        <div v-for="(item) in dataSource" :key="item.name" class="resourcelist">
          <h2>{{item.name}}</h2>
          <a-popconfirm title="确定要删除此资源么？" okText="确认" cancelText="取消" @confirm="confirm(item.id)">
            <span>
              <a-icon type="delete"/>
            </span>
          </a-popconfirm>
          <span class="resourceedit" @click="showedit(item.urls,item.id,item.name)">
            <a-icon type="edit"/>
          </span>

          
          <div>{{item.mark}}</div>
        </div>
        <editForm
            ref="editForm"
            :visible="editvisible"
            :datdid="currentid"
            :name='currentname'
            :urllist='urllist'
            :currenturl='currentth'
            @cancel="handleCancel"
            @create="handleedit"
          />
      </div>
    </a-card>
  </div>
</template>

<script>
import signout from "@/components/signout";
import constant from '@/components/constant.js';
require("es6-promise").polyfill();
require("isomorphic-fetch");

const CollectionCreateForm = {
  props: ["visible",'urllist'],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='添加资源'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='请输入要添加的资源名称'>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='添加url权限'>
           <a-select
           mode='multiple'
            v-decorator="[
              'urls',
              {
               rules: [{ required: true, message: '不能为空!' }],
              }
            ]"
          >
          <a-select-option v-for='(item) in urllist' :key='item'>{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        
      </a-form>
    </a-modal>
  `
};

const editForm = {
  props: ["visible", "dataid",'name','urllist','currenturl'],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='添加资源'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='请输入要添加的资源名称'>
          <a-input
            v-decorator="[
              'edit',
              {
                initialValue:name,
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='更改url权限'>
           <a-select
           mode='multiple'
            v-decorator="[
              'urls',
              {
              initialValue:currenturl,
               rules: [{ required: true, message: '不能为空!' }],
              }
            ]"
          >
          <a-select-option v-for='(item) in urllist' :key='item'>{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        
      </a-form>
    </a-modal>
  `
};

export default {
  components: { CollectionCreateForm, signout, editForm },
  data() {
    return {
      dataSource: [],
      visible: false,
      editvisible: false,
      currentth: [],
      currentid: "",
      currentname:'',
      urllist:constant.urllist,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    // console.log(urllist);
    // console.log(newdepart);
    if (localStorage.getItem("identity") !== "超级管理员") {
      this.$router.push({ path: "/" });
    }
    fetch(`/api/admin/resource`, {
      method: "GET"
    })
      .then(res => {
        console.log(res);
        console.log(res.status);

        return res.json();
      })
      .then(data => {
        console.log(data.children, "5");
        this.dataSource = data.children; //返回的值没有顺序，是无序的
      });
  },
  methods: {
    confirm(e) {
      console.log(e);
      fetch(`/api/admin/resource/${e}`, {
        method: "DELETE"
      }).then(res => {
        if (res.status === 200) {
          this. getresource();
        }
        return;
      });
    },
    showModal() {
      this.visible = true;
      console.log(this.urllist);
    },
    showedit(urls, id,name) {
      this.editvisible = true;
      this.currentth = urls;
      this.currentid = id;
      this.currentname=name;
      console.log(this.currentid);
    },
    getresource() {
      console.log(this);
      fetch(`/api/admin/resource`, {
        method: "GET"
      })
        .then(res => {
          console.log(res);
          console.log(res.status);

          return res.json();
        })
        .then(data => {
          console.log(data.children, "5");
          this.dataSource = data.children; //返回的值没有顺序，是无序的
        });
    },
    handleCreate() {
      var form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        // dataSource.push(values);
        form.resetFields();
        this.visible = false;
        fetch(`/api/admin/resource`, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",

          body: JSON.stringify({
            name: values.name,
            urls:values.urls
          })
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data, "2");
            
           this. getresource();
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.editvisible = false;
    },
    handleedit(e) {
      
      // console.log(this.$refs.editForm[this.currentth]);

      const form = this.$refs.editForm.form; 

      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        this.editvisible = false;
        console.log(this.currentid, "form");
        fetch(`/api/admin/resource`, {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name: values.edit,
            id: this.currentid,
            urls:values.urls
          })
        }).then(res => {
          if (res.status === 200) {
            this. getresource();
          }
          return;
        });
        form.resetFields();
      });
          // this.form = this.$form.createForm(this);
          console.log('12');

    }
  }
};
</script>

<style>
.resource {
  width: 100%;
}
.resourcecard {
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
.resourcecard .ant-card-body {
  height: 100%;
}
.resourcelist span {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
}
.resourcelist span:hover {
  color: rgb(28, 28, 221);
}
.resourceedit {
  position: absolute;
  top: 10px;
  right: 60px !important;
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
.admin-singnout {
  position: absolute;
  top: 20px;
  right: 5px;
}


</style>
