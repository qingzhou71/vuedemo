import Vue from 'vue'
import Router from 'vue-router'
import login from '@/containers/login'
import register from '@/containers/register'
import performance from '@/containers/performance'
import navigate from '@/containers/navigate'
import graduate from '@/containers/graduate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/performance',
      name:'performance',
      component:performance
    },
    {
      path:'/navigate',
      name:'navigate',
      component:navigate
    },
    {
      path:'/graduate',
      name:'graduate',
      component:graduate
    }
  ]
})
