<template>
  <div class="info">
    <a-card class="infocard">
      <div class='infotitle'>欢迎入学</div>
      <div class='infonote'>检查你的信息无误后点击确认完成身份注册</div>
      <a-form :form="form" @submit="register">
        <a-form-item >
            <span class='labelnote'>姓名：</span>
          <a-input
            disabled
            v-decorator="[
               'name',
               {
                    rules: [{ required: true }],
                    initialValue:infos.name
                }
             ]"
          />
        </a-form-item>
        <a-form-item  >
            <span class='labelnote'>性别：</span>
          <a-input
            disabled
            v-decorator="[
               'male',
               {
                    rules: [{ required: true }],
                    initialValue:infos.sex
                }
             ]"
          />
        </a-form-item>
         <a-form-item  >
            <span class='labelnote'>联系方式：</span>
          <a-input
            v-decorator="[
               'phone',
               {
                    rules: [{ required: true ,message:' *请填写联系方式'}],
                    initialValue:infos.phone
                }
             ]"
          />
        </a-form-item>
         <a-form-item  >
            <span class='labelnote'>学院：</span>
          <a-input
            disabled
            v-decorator="[
               'campus',
               {
                    rules: [{ required: true }],
                    initialValue:infos.campus.name
                }
             ]"
          />
        </a-form-item>
         <a-form-item  >
            <span class='labelnote'>专业：</span>
          <a-input
            disabled
            v-decorator="[
               'major',
               {
                    rules: [{ required: true }],
                    initialValue:infos.majorName
                }
             ]"
          />
        </a-form-item>
         <a-form-item  >
            <span class='labelnote'>宿舍楼：</span>
          <a-input
            disabled
            v-decorator="[
               'dormitory',
               {
                    rules: [{ required: true }],
                    initialValue:infos.dormitoryName
                }
             ]"
          />
        </a-form-item>
         <a-form-item  >
            <span class='labelnote'>宿舍号：</span>
          <a-input
            disabled
            v-decorator="[
               'dormRoom',
               {
                    rules: [{ required: true }],
                    initialValue:infos.dormRoom
                }
             ]"
          />
        </a-form-item>
         <a-form-item  >
            <span class='labelnote'>政治面貌：</span>
          <a-input
            disabled
            v-decorator="[
               'political',
               {
                    rules: [{ required: true }],
                    initialValue:infos.politicalName
                }
             ]"
          />
        </a-form-item>
        <a-form-item>
             <a-button type="primary" html-type="submit" class="infobutton" size='large'>确认</a-button>
        </a-form-item>
      </a-form>
      <a>有问题？</a>
    </a-card>
  </div>
</template>

<script>
const infos = {
  name: "轻舟",
  sex: "女",
  campus: "计算机学院",
  major: "软件工程",
  dormRoom: "333",
  dormitory: "长智四号楼",
  political: "预备党员",
  phone: ""
};
export default {
  beforeCreate() {
      // if(localStorage.getItem('info')){
      //     this.$router.push({ path: "/register" });
      // }
    this.form = this.$form.createForm(this);
    var username=localStorage.getItem('username')
    fetch(`/mock/stu/${username}`,{
      method:'GET'
    }).then(res=>{
      console.log(res)
      if(res.status===200){
        console.log(res)
      return res.json()
      }
      else{
        this.$router.push({path:'/'})
      }
    }).then(res=>{
      console.log(res)
      this.infos=res;
      this.infos.sex=res.male?'男':'女'

    })
  },
  beforeMount() {
    console.log(infos);
  },
  data() {
    return {
      infos: infos,
      username:localStorage.getItem('username')
    };
  },
  methods:{
      register(){
           this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          // localStorage.setItem('info','sure');
          // console.log(localStorage.getItem('info'));
         
          // post请求，创建新的学生
          fetch(`/api/stu`,{
            method:"POST",
             headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(this.infos)
          }).then(res=>{
            if(res.status===200){
               return res.json()
            }
           else{
             alert('注册失败啦，一会再试吧！')
           }
          }).then(res=>{
            console.log(res)
            alert('注册成功了');
             this.$router.push({ path: "/" });
          })
        }
           });
      }
  }
};
</script>

<style>
.info {
  width: 100%;
  height:100%;
  background-image:url('../../assets/5.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  
}
/* .info > .infocard{
    width: 80%;
    max-width:400px;
    margin: 0 auto;
    /* margin-top: 100px; 
} */

.infocard{
    position:absolute;
    border: none;
  width: 80%;
  top:50px;
  right:10%;
  /* height: 500px; */
  /* margin: 100px auto; */
  max-width: 400px;
  background:rgb(255,255,255,0.65);
}
.info *.ant-form-item-children{
    display: flex;
}
.labelnote{
    width:100px;
    line-height: 32px;
    text-align: right;
}
.infotitle{
    width:100%;
    font-size: 25px;
    text-align: center;
    
}
.info * .ant-form-explain{
    margin-left: 100px;
}
.infonote{
    width:100%;
    text-align: center;
     margin-bottom:20px;
}
.infobutton{
    width:100%;
    margin-top: 10px;
}
.infocard .ant-form-item{
  margin-bottom: 10px !important;
}
@media screen and (max-width:600px) {
  .infonote{
    font-size: 10px;
  }
  .infotitle{
    font-size: 18px;
  }
}
</style>
