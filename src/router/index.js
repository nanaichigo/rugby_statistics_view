// Composables
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: "top",
    component: () => import(/* webpackChunkName: "home" */ '@/components/pages/TopView.vue'),
  },
  {
    path: '/rugby_player',
    component: () => import(/* webpackChunkName: "home" */ '@/components/pages/RugbyRankingPage.vue'),
    
  }

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
