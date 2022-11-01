import { createMemoryHistory, createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/login.vue'
import Popup from '../pages/popup.vue'
import PostLogin from '../pages/postlogin.vue'
import PreLogin from '../pages/prelogin.vue'
// import routes from '~pages'

const router = createRouter({
  // ...
  // history: createMemoryHistory(),
  history: createWebHashHistory(),
  // routes,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/popup',
      name: 'popup',
      component: Popup,
    },
    {
      path: '/postlogin',
      name: 'postlogin',
      component: PostLogin,
    },
    {
      path: '/prelogin',
      name: 'prelogin',
      component: PreLogin,
    },
  ],
})

export default router
