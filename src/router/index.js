import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login',
  component: () => import('../views/login.vue')
  // component: () => import('../views/index.vue')
},
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/OADNO/index.vue')
  },
  {
    path: '/overView/index',
    name: 'overView',
    component: () => import('../views/overView/index.vue')
  },
  {
    path: '/OnePicture/index',
    name: 'OnePicture',
    component: () => import('../views/OnePicture/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue')
  }]
const router = new VueRouter({
  mode: "hash",
  routes
})

export default router