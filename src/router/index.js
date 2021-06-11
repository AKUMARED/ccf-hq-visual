import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login',
  component: () => import('../views/OADNO/login.vue')
  // component: () => import('../views/index.vue')
},
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/OADNO/index.vue')
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