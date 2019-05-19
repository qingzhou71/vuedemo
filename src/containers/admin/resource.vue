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
        @cancel="handleCancel"
        @create="handleCreate"
      />
      <h1>资源详情：</h1>
      <div class="listboard">
        <div v-for="(item,index) in dataSource" :key="item.name" class="resourcelist">
          <h2>{{item.name}}</h2>
          <a-popconfirm title="确定要删除此资源么？" okText="确认" cancelText="取消" @confirm="confirm(item.id)">
            <span>
              <a-icon type="delete"/>
            </span>
          </a-popconfirm>
          <span class="resourceedit" @click="showedit(index,item.id)">
            <a-icon type="edit"/>
          </span>

          <editForm
            ref="editForm"
            :visible="editvisible"
            :datdid="item.id"
            @cancel="handleCancel"
            @create="handleedit"
          />
          <div>{{item.mark}}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import signout from "@/components/signout";
require("es6-promise").polyfill();
require("isomorphic-fetch");

const CollectionCreateForm = {
  props: ["visible"],
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

const editForm = {
  props: ["visible", "dataid"],
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
                
                rules: [{ required: true, message: '名称不能为空!' }],
              }
            ]"
          />
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
      currentth: "",
      currentid: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
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
    },
    showedit(e, id) {
      this.editvisible = true;
      this.currentth = e;
      this.currentid = id;
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
            name: values.name
          })
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data, "2");
            // fetch(`/api/admin/resource`, {
            //   method: "GET"
            // })
            //   .then(res => {
            //     console.log(res);
            //     return res.json();
            //   })
            //   .then(data => {
            //     console.log(data, "5432");
            //     this.dataSource = data.children;
            //   });
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
      console.log(this.$refs); //有八个editForm，需要位置来判断具体生成的表单form
      console.log(this.$refs.editForm[this.currentth]);

      const form = this.$refs.editForm[this.currentth].form; //同一位置二次更改会出现问题

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
            id: this.currentid
          })
        }).then(res => {
          if (res.status === 200) {
            this. getresource();
          }
          return;
        });
      });
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
.admin-singnout {
  position: absolute;
  top: 20px;
  right: 5px;
}
</style>
