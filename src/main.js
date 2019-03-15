// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button,Form,Checkbox,Input,Icon,Card,Drawer} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Drawer);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})