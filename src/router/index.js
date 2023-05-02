// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/components/pages/HomeView.vue'
import RankingView from '@/components/pages/PlayerRankingView.vue'
import PlayerView from '@/components/pages/PlayerStatisticsView.vue'
const routes = [
  {
    path: '/',
    name: "top",
    component: () => import(/* webpackChunkName: "home" */ '@/components/pages/TopView.vue'),
  },
  {
    path: '/rugby',
    component: () => import(/* webpackChunkName: "home" */ '@/layout/RugbyDefault.vue'),
    children:[
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component:HomeView,
      },
      {
        path: 'ranking',
        name: 'ranking',
        component: RankingView
      },
      {
        path: 'player',
        name: 'player',
        component: PlayerView
      }
    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
