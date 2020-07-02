import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Authentication from '../views/Authentication.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication
  },
]

const router = new VueRouter({
  routes
})

export default router