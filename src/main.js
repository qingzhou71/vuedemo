// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import {Button,Form,Checkbox,Input,Icon,Card,Drawer,Menu,Divider,Select,Row,Col,Table,List,Popconfirm,Modal,Steps,Carousel} from 'ant-design-vue'
=======

import {Button,Form,Checkbox,Input,Icon,Card,Drawer,Menu,Divider,Select,Row,Col,Table,List,Popconfirm,Modal,Steps} from 'ant-design-vue'

>>>>>>> e6c75c1cdd8275d4a803b379c6d79ee8758eacfb
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Drawer);

Vue.use(Menu);
Vue.use(Divider);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);

Vue.use(List);
Vue.use(Popconfirm);
Vue.use(Modal);

Vue.use(Steps);
Vue.use(Carousel);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
