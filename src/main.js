// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import {Button,Form,Checkbox,Input,Icon,Card,Drawer,Menu,Divider,Select,Row,Col,Table,List,Popconfirm,Modal} from 'ant-design-vue'
=======

import {Button,Form,Checkbox,Input,Icon,Card,Drawer,Menu,Divider,Select,Row,Col,Table} from 'ant-design-vue'

>>>>>>> 37a97730c98ab42a2eca81285d53a29d8403238a
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
<<<<<<< HEAD
Vue.use(List);
Vue.use(Popconfirm);
Vue.use(Modal);

=======
>>>>>>> 37a97730c98ab42a2eca81285d53a29d8403238a

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
