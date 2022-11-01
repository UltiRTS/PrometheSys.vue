import { createMemoryHistory, createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  // ...
  // history: createMemoryHistory(),
  history: createWebHashHistory(),
  routes,
})

export default router
