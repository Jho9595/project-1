import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AddBarang from '../views/AddBarang.vue'
import EditBarang from '../views/EditBarang.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/addBarang',
    name: 'AddBarang',
    component: AddBarang
  },
  {
    path: '/editBarang/:id',
    name: 'EditBarang',
    component: EditBarang
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (!localStorage.access_token) {
//     if (to.name !== 'Login') return next('/login')
//     else return next()
//   }
//   else {
//     if (to.name !== 'Login') return next()
//     else return next('/')
//   }
// })

export default router
