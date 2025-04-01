import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import rutasFrutas from './FruitsRoutes'
import rutasCrew from './CrewsRoutes'
import rutasCharacters from './CharacterRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...rutasFrutas,
    ...rutasCrew,
    ...rutasCharacters,
  ],
})

export default router
