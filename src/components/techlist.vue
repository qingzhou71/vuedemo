//离校管理科技立项成果学生界面展示
<template>
<div>
  <a-button
    type="primary"
    ghost
    @click="showModal"
  ><a-icon type="plus" />
    添加
  </a-button><br/><br/>
  <collection-create-form
    ref="collectionForm"
    :visible="visible"
    @cancel="handleCancel"
    @create="handleCreate"
  />
  <a-list
    :grid="{ gutter: 16, column: 1 }"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-card :title="item.technologicalAchievements">
        <p>获奖时间：{{item.awardTime}}</p>
         <p>科技立项证明文件：</p>
         
         <p v-for="(fileId) in item.fileIds" :key="fileId">
          <a :name="fileId"  :href="'http://www.mangococo.cn/api/stu/tec/file/'+fileId">{{fileId}}</a>
        </p>
        <p>颁发单位：{{item.issuingOrganization}}</p>
      </a-card>
    </a-list-item>
  </a-list>
  <a-button @click="edit"><a-icon type="edit" />修改</a-button>
  
  <a-card title="修改科技立项成果信息" :bordered="false" style="width:100%" v-if="isedit">
    <a-button @click="guanbi" v-if="isguanbi">关闭</a-button><br/><br/>
    <Dropdown placement="top" trigger="click" @on-click="showtext">
      <Button style="height:40px">
        选择科技立项
      </Button>
      <DropdownMenu slot="list">
          <DropdownMenu v-for="(item) in data" :key="item.technologicalAchievements">
            <DropdownItem :name="item.technologicalAchievements">{{item.technologicalAchievements}}</DropdownItem>
          </DropdownMenu>
      </DropdownMenu>
    </Dropdown>
    <!-- <div> -->
      <a-card style="width:100%" :bordered="false" >
        <p>科技立项成果名称：</p>
        <input type="text" ref="getnameValue" :value="edituser[0]?edituser[0].technologicalAchievements:''"/><br/><br/>
        <p>获奖时间：</p>
        <input type="text" ref="gettimeValue" :value="edituser[0]?edituser[0].awardTime:''" /><br/><br/>
        <p>颁发单位：</p>
        <input type="text" ref="getunitValue" :value="edituser[0]?edituser[0].issuingOrganization:''" /><br/><br/>
        <p>选择证明文件：</p>
        <form>
        <input type="file" @change="getFile($event)"/>
        <p>支持2M以下的.png/.jpg/.pdf</p>
        <button @click="submitForm($event)">上传</button>
        </form><br/>
        <a-button @click="tijiao">
          提交
        </a-button>
      </a-card>
  </a-card>
    <!-- </div> -->
</div>
</template>
<script>

const CollectionCreateForm = {
  props: ['visible'],
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='添加新的科技立项成果'
      okText='确认'
      cancelText='取消'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='科技立项成果名称'>
          <a-input
            placeholder="请输入您的科技立项成果全称"
            v-decorator="[
              'technologicalAchievements',
              {
                rules: [{ required: true, message: '请填写您的科技立项成果名称' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='获奖时间'>
          <a-input
            placeholder="格式：XXXX-XX-XX"
            v-decorator="[
              'awardTime',
              {
                rules: [{ required: true, message: '请按格式输入您的获奖时间' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='颁发单位'>
          <a-input
            placeholder="请输入单位全称"
            v-decorator="[
              'issuingOrganization',
              {
                rules: [{ required: true, message: '请输入颁发单位名称' }],
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  `,
};
import {Dropdown,DropdownItem,DropdownMenu} from 'iview'
import axios from 'axios'
export default {
  data() {
    return {
      data:[],
      // columns,
      visible: false,
      username:"",
      // visibles:false,
      isedit:false,
      edituser:[],
      tid:"",
      isguanbi:false,
      // uploading: false,
      // idd:"",
    }
  },
  beforeCreate(){
    axios.get("/api/stu/tec")
    .then((response) => {
      console.log(response.data);
      response.data.sort((a,b)=>{    //对后台数据进行排序
        return a.id-b.id;
      });
      response.data.map(item => {     
        item.awardTime=new Date(item.awardTime).toLocaleDateString().replace(/\//g, "-");
        this.tecId = item.id;

        console.log(this.filelist)
        console.log(this.tecId);
        console.log(item.fileIds)
        if(item.fileIds === undefined || item.fileIds.length === 0){
          item.fileIds = "无";
        };
      });

      this.data=response.data;
    });
    axios.get("/api/stu/me")
    .then((response,data) => {
      this.username = response.data.username;
      console.log(this.username);
      console.log(response.data);
    });
  },
  components: { CollectionCreateForm,Dropdown,DropdownItem,DropdownMenu},
  methods: {
    showModal () {
      this.visible = true;
    },
    handleCancel  () {
      this.visible = false;
    },
    handleCreate  () {
      const form = this.$refs.collectionForm.form;//初始化
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
      console.log('Received values of form: ', values);
      let datapost = {"technologicalAchievements":values.technologicalAchievements,
      "awardTime":new Date(values.awardTime).getTime(),
      "username":this.username,
      "issuingOrganization":values.issuingOrganization,
      "enable":true, 
      };
      console.log(datapost);
      axios.post(`/api/stu/tec`,datapost)
      .then(res=>{
        console.log('res=>',res);
      }).catch((error) => {
        console.log(error)
      })
      form.resetFields();
      this.visible = false;
      });
    },
    handleOk(e) {
      console.log(e);
      this.visibles = false
    },
    edit(){
      this.isedit=true;
      this.isguanbi = true;
    },
    showtext(name){
      console.log(name);
      if (name == "" || name == undefined) {
        return;
      };
      this.edituser = this.data.filter(item => item.technologicalAchievements === name);
      this.idd = this.data.filter(item => item.technologicalAchievements === name)[0].id;
      console.log(this.edituser)
      console.log(this.data)
      console.log(this.data.filter(item => item.technologicalAchievements === name))
      // })
    },
    tijiao(){
      let dataput = {"technologicalAchievements":this.$refs.getnameValue.value,
      "awardTime":new Date(this.$refs.gettimeValue.value).getTime(),
      "username":this.username,
      "issuingOrganization":this.$refs.getunitValue.value,
      "enable":true, 
      "id":this.edituser[0].id,
      };
      console.log(dataput);
      axios.put(`/api/stu/tec`,dataput)
      .then(res=>{
        console.log('res=>',res);
        alert("修改成功！");
      }).catch((error) => {
        console.log(error)
      });
      this.isedit = false; 
    },
    getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    submitForm(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append('file', this.file);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(`/api/stu/tec/file/${this.idd}`, formData, config)
      .then(function (res) {
        if (res.status === 2000) {
             /*这里做处理*/
        };
        alert("上传成功！");
      })
    },
    guanbi(){
      this.isedit = false;
    }
  },
}
</script>

<style>
.techlist{
    width: 100%;
    overflow: scroll;
    margin-top: 10px;
    text-align: center !important;
}
</style>
