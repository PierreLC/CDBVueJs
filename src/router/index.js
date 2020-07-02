import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Home
  },
  {
    path: '/cocktail',
    name: 'Cocktail',
    component: function () {
      return import('../views/Cocktail.vue')
    }
  },
]

const router = new VueRouter({
  routes
})

export default router