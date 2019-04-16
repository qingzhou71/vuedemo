<template>
  <div class="hello">
    <router-link to="/register">to test</router-link>
    <a-card>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item class="login-form-item">
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: '你还没有输入账号!' }] }
        ]"
            placeholder="请输入账号"
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
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item style="margin-top:15px">
          <div style="display:flex">
            <a-input
              style="margin-right:20px;width:52%"
              v-decorator="[
          'imageCode',
          { rules: [{ required: true, message: '请输入验证码!' }] }
        ]"
              placeholder="请输入验证码"
            />
            <img :src="src" style="width:100px;margin-right:5px">
            <div class="refresh" @click="refresh">换一张</div>
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
          <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
require("es6-promise").polyfill();
require('isomorphic-fetch');
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  name: "login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      test: "i will",
      src: "http://demo.nat200.top/code/image"
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values); // 拿到values，通过Ajax来调用接口，传参values
          // console.log(values.rememberMe);
          console.log(values.rememberme)
          fetch(`http://demo.nat200.top/authentication/form`, {
            method: "POST",
             headers:{'Access-Control-Allow-Origin':'*'},
            body: {
              'username': values.username,
              'password': values.password,
              'imageCode': values.imageCode,
              'remember-me': values.rememberme
            }
          });
          this.$router.push({ path: "/register" });
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
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-item {
  width: 100%;
  margin: 10px 0;
}
#components-form-demo-normal-login .login-form-forgot {
  /* display: block; */
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  margin-top: 10px;
}
.ant-card-bordered {
  border: none;
  width: 80%;
  margin: 0 auto;

  max-width: 400px;

}
.refresh {
  font-size: 12px;
  line-height: 10px;
  height: 10px;
  margin-top: 30px;
}
.refresh:hover {
  color: blue;
  cursor: pointer;
}
</style>


