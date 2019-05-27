import Vue from 'vue'
import Router from 'vue-router'
import Promise from 'promise-polyfill'
import login from '@/containers/login'
import register from '@/containers/register'
import performance from '@/containers/performance'
import introduction from '@/containers/introduction'
import center from '@/containers/center'
import admin from '@/containers/user/admin'
import resource from '@/containers/admin/resource'
import department from '@/containers/admin/department'
import managers from '@/containers/admin/managers'

import manager from '@/containers/user/manager'
import info from '@/containers/user/info'

import campuses from '@/containers/user/campuses'


if (!window.Promise) {
  window.Promise = Promise;

}

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    { path: '/info', name: 'info', component: info },
    
    {path:'/campuses',name:'campuses',component:campuses},
    { path: '/register', name: 'register', component: register },
    { path: '/performance', name: 'performance', component: performance },
    { path: '/introduction', name: 'introduction', component: introduction },
    {

      path: '/center',
      name: 'center',
      component: center

    },
    {
      path: '/managers',
      name: manager,
      component: manager,
    },
    {

      path: '/admin',
      name: 'admin',
      component: admin,
      redirect: '/admin/resource',
      children: [
        {
          path: '/admin/resource',
          name: 'resource',
          component: resource
        },
        {
          path: '/admin/department',
          name: 'department',
          component: department
        },
        {
          path: '/admin/managers',
          name: 'managers',
          component: managers
        }
        // {
        //   path:'/admin/campus',
        //   name:'campus',
        //   component:campus,
        //   redirect:'/admin/campus/institution',
        //   children:[
        //     {
        //       path:'/admin/campus/institution',
        //       name:'institution',
        //       component:institution
        //     },
        //     {
        //       path:'/admin/campus/major',
        //       name:'major',
        //       component:major
        //     },
        //     {
        //       path:'/admin/campus/dormitory',
        //       name:'dormitory',
        //       component:dormitory 
        //     },
        //     {
        //       path:'/admin/campus/location',
        //       name:'location',
        //       component:location
        //     }
        //   ]
        // }

      ]
    }
  ]
})
