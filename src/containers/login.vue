<template>
  <div class="hello">

    <a-card class="login">
      <div class="login-in">登录</div>

      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item class="login-form-item">
          <a-input
          style="height:40px"
            v-decorator="[

          'username',
          { rules: [{ required: true, message: '你还没有输入账号!' }] }
        ]"
            placeholder="请输入账号"

            size="large"

          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item class="login-form-item">
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '你还没有输入密码!' }] }
        ]"
            type="password"
            placeholder="请输入密码"
            size="large"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item style="margin-top:15px">
          <div style="display:flex">
            <a-input
              style="margin-right:20px;width:52%;height:40px"
              v-decorator="[
          'imageCode',
          { rules: [{ required: true, message: '请输入验证码!' }] }
        ]"
              placeholder="请输入验证码"
              size="large"
            />
            <img :src="src" style="width:100px;margin-right:5px" title="看不清，换一张" @click="refresh">
            <!-- <div class="refresh" @click="refresh">换一张</div> -->

          </div>
        </a-form-item>

        <a-form-item>
          <a-checkbox
            v-decorator="[
          'rememberme',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
          >记住我</a-checkbox>
          <a class="login-form-forgot" href>忘记密码</a>
          <a-button type="primary" html-type="submit" class="login-form-button" size="large">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
require("es6-promise").polyfill();
require("isomorphic-fetch");
import constants from "@/components/constant.js";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
    fetch(`/api/location?size=50`, {
      method: "GET"
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data, "5432");
      });
  },
  beforeMount() {
    console.log(this.constant);
  },
  name: "login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      test: "i will",
      src: "/api/code/image",
      infosure: localStorage.getItem("info"),
      constant: constants.urllist
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(this.constant);
          // console.log(`http://${this.constant}/authentication/form`)
          console.log("Received values of form: ", values); // 拿到values，通过Ajax来调用接口，传参values
          fetch(
            `/api/authentication/form?username=${values.username}&password=${
              values.password
            }&imageCode=${values.imageCode}&remember-me=${values.rememberme}`,
            {
              method: "POST",
              headers: { "Access-Control-Allow-Origin": "*" },
              credentials: "include"
            }
          )
            .then(res => {
              console.log(res.status);
              if (res.status === 200 || res.status === 401) {
                //判断状态码，在200或401的时候才允许返回数据
                console.log("1");
                return res.json();
              }
            })
            .then(res => {
              console.log(res);
              if (res.username === undefined) {
                //根据返回值的格式判断正常数据或错误提示
                console.log(res.content);
                if (res.content === "用户名或密码错误") {
                  console.log("去另一服务器验证身份");
                } else {
                  alert(res.content);
                }
                return;
              }
              console.log(res.username); //返回值正常则进入身份判断
              switch (res.roles[0]) {
                case "超级管理员":
                  {
                    this.$router.push({ path: "/admin" });
                    localStorage.setItem('identity',res.roles[0])
                  };
                  break;
                  case '学院管理处':
                  case '专业管理处':
                  case '宿舍管理处':
                  case '流程管理处':
                  case '建筑地标管理处':
                  {
                    this.$router.push({ path: "/managers" });
                    localStorage.setItem('identity',res.roles[0])
                  }
                  ;break;
                  // case ''
                default:
                  // if (this.infosure) {
                  //   this.$router.push({ path: "/register" });
                  // } else {
                  //   this.$router.push({ path: "/info" });
                  // }
                   this.$router.push({ path: "/campuses" });
                    localStorage.setItem('identity',res.roles[0])
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            });
          //  then里拿到返回的身份认证，存入localstorage，在每个页面的挂载前验证身份，做以权限
        }
      });
    },
    refresh() {
      this.src = this.src + "?";
    }
  }
};
</script>

<style>
.hello {
  width: 100%;
  height: 100%;
  background-image: url("../assets/3.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 100px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;

}
#components-form-demo-normal-login .login-form-item {
  width: 100%;
  margin: 30px 0;
}
#components-form-demo-normal-login .login-form-forgot {
  /* display: block; */
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;

  margin-top: 30px;
}
.login {
  border: none;
  width: 80%;
  height: 500px;
  margin: 0 auto;
  max-width: 400px;
  background: rgb(255, 255, 255, 0.65);
}
.refresh {
  font-size: 12px;
  line-height: 10px;
  height: 10px;
  margin-top: 30px;
}
.refresh:hover {
  color: rgb(0, 0, 255);
  cursor: pointer;
}
.login-in {
  font-size: 29px;
  width: 100%;
  text-align: center;
}
.refresh {
  font-size: 12px;
  line-height: 10px;
  height: 10px;
  margin-top: 30px;
}
.refresh:hover {
  color: rgb(0, 0, 255);
  cursor: pointer;

}
.login-in{
  font-size: 29px;
  width: 100%;
  text-align: center;
}
</style>


