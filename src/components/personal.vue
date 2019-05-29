<template>
  <div class="personal">
    <div class="title">
      <div>
        <!-- <img src='../assets/3.jpg'/> -->
      </div>
      <span>姓名：{{infos.name}}</span>
    </div>
    <div>
      <h3 class="card" @click="showinfo">基本信息：</h3>
      <div class="infobroad" v-show="showinfos">
          <div>性别：{{infos.sex}}</div>
        <div>学院：{{infos.campusname}}</div>
        <div>专业:{{infos.majorName}}</div>
        <div>宿舍楼：{{infos.dormitoryName}}</div>
        <div>宿舍号：{{infos.dormRoom}}</div>
        <div>校园卡余额：{{infos.card}}</div>
        <div>政治面貌：{{infos.politicalName}}</div>
      </div>
    </div>
    <h3 class="card" @click="editpassword">修改密码</h3>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
    <h3 class='card' @click='exit'>退出登录</h3>
  </div>
</template>

<script>
const CollectionCreateForm = {
  props: ["visible"],
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
         <a-form-item label='请输入原始密码'>
          <a-input
            v-decorator="[
              'oldpassword',
              {
                rules: [{ required: true, message: '原始密码不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='请输入新密码'>
          <a-input
            v-decorator="[
              'newpassword',
              {
                rules: [{ required: true, message: '新密码不能为空!' }],
              }
            ]"
          />
        </a-form-item>
        
        
        
      </a-form>
    </a-modal>
  `
};

const infos = {
  name: "轻舟",
  male: "女",
  campus: "计算机学院",
  major: "软件工程",
  dormRoom: "333",
  dormitory: "长智四号楼",
  political: "预备党员",
  phone: ""
};
export default {
  components: { CollectionCreateForm },
  beforeCreate(){
      fetch(`/api/stu/me`,{
          method:'GET'
      }).then(res=>{
          console.log(res.body)
          console.log(res.body.locked);
          return res.json();
      }).then(res=>{
          console.log(res);
          this.infos=res;
          this.infos.campusname=res.campus.name;
          this.infos.sex=res.male?'男':'女'

      })



      fetch(`/api/stu/card`,{
          method:'GET'
      }).then(res=>{
          // 判断返回值，根据返回值的类型来决定数据的格式
          if(res.status===200){
              return res.json()
          }
          else if(res.status===404){
              this.infos.card=0;
              return;
          }
          else{
              return;
          }
      })
      .then(res=>{
          console.log(res)
      })
  },
  data() {
    return {
      infos: infos,
      showinfos: false,
      visible: false
    };
  },
  methods: {
    showinfo() {
      this.showinfos = !this.showinfos;
    },
    editpassword() {
      // 修改密码的接口
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleCreate() {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          fetch(`/api/password`, {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              oldPassword:values.oldpassword,
              newPassword:values.newpassword
            })
          }).then(res=>{
              if(res.status===200){
                  return
              }
          });
          this.visible = false;
          form.resetFields();
        }
      });
    },
    exit(){
        console.log('返回登录页，清除存储')
        this.$router.push({path:'/'})
    }
  }
};
</script>

<style>
.personal {
  height: 100%;
  width: 100%;
}
.title {
  margin-top: 30px;
  width: 70%;
  height: 70px;
  display: flex;
  margin-bottom: 30px;
}
/* .title img{
    width:100%;
    height: 100%;
} */
.title div {
  width: 50%;
  height: 70px;
  background-image: url("../assets/3.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.title span {
  vertical-align: bottom;
  margin-top: 50px;
}
.infobroad {
  width: 80%;
  border: 1px solid silver;
  padding: 10px 20px;
}
.infobroad div {
  margin-bottom: 10px;
}
.card {
  line-height: 50px;
  background: #f0f0f05c;
  margin-bottom: 20px;
}
</style>
