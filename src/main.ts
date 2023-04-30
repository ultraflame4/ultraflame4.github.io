import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/reset.css'
import './assets/theme.scss'
import "vyue42/lib/index.css"


import {vyue42} from "vyue42";

const app = createApp(App)

app.use(vyue42)
app.use(router)

app.mount('#app')
