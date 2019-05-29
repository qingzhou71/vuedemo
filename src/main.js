// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'

import 'ant-design-vue/dist/antd.css'
import 'iview/dist/styles/iview.css'
import App from './App'
import router from './router'
import iView from 'iview'
import BaiduMap from 'vue-baidu-map'
import {BmlMarkerClusterer} from 'vue-baidu-map'
import axios from 'axios'

import {Button,Form,Checkbox,Input,Icon,Card,Drawer,Menu,Divider,Select,Row,Col,Table,List,Popconfirm,Modal,Steps,Carousel,Collapse,Radio,Cascader,Tag,Tabs,Layout,Dropdown,Avatar,Anchor,Alert,Upload,Tooltip,DatePicker,message} from 'ant-design-vue'


Vue.config.productionTip = false

Vue.prototype.$ajax = axios
// var axios_instance = axios.create({
//     transformRequest: [function (data) {
//         data = Qs.stringify(data);
//         return data;
//     }],
//     headers:{'Content-Type':'application/x-www-form-urlencoded'}
// })
// Vue.use(VueAxios, axios_instance)
Vue.use(iView)
Vue.component('bml-marker-cluster', BmlMarkerClusterer)
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

Vue.use(Collapse);

Vue.use(Radio);
Vue.use(Cascader);

Vue.use(Tag);

Vue.use(Tabs);


Vue.use(Layout);
Vue.use(Dropdown);
Vue.use(Avatar);

Vue.use(Anchor);
Vue.use(Alert);
Vue.use(Upload);

Vue.use(Tooltip);
Vue.use(DatePicker);
Vue.use(message);





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ssWL9lhfKCVyI7F2ZmPXupbWwKehUYLI'
})