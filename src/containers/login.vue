<template>
  <div class="hello">
   <a-button type='primary'>test</a-button>
   <router-link to='/register'> to test</router-link>
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
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
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
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a
        class="login-form-forgot"
        href=""
      >
        忘记密码
      </a>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
   </a-card>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      test:'i will'
    }
  },
  methods:{
     handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$router.push({path: '/register'});
        }
      });
    },
  }
}
</script>

<style>
.hello{
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
  display: block;
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.ant-card-bordered{
  border: none;
  width: 80%;
  margin: 0 auto;

  max-width: 400px;

}
</style>


