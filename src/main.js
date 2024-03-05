import './assets/main.css'

import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// creates a global store to display flash messages
const GStore = reactive({flashMessage: ''})
app.provide('GStore', GStore)

app.mount('#app')  //ID of app
