import { createApp } from 'vue'
import App from './App.vue'
import { key, store } from './store'
import router from './router'

import './samples/node-api'

const app = createApp(App)

app.use(store, key)
  .use(router)
  .mount('#app')
  .$nextTick(window.removeLoading)
