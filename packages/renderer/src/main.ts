import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './samples/node-api'
const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
  .use(router)
  .mount('#app')
  .$nextTick(window.removeLoading)
