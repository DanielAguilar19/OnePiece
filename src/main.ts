import '@/assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'

import App from './App.vue'
import 'tailwindcss'
import router from './router'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.mount('#app')
