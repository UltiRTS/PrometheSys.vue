import devtools from '@vue/devtools'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import pkg from '../../../package.json'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import 'uno.css'

import './samples/node-api'
const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
  //.use(router)
  .mount('#app')
  .$nextTick(window.removeLoading)
