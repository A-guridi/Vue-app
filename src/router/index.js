import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'events-list',
      component: EventListView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/event/:id',
      name: 'event-details',
      props: true, 
      component: () => import('../views/EventDetailsView.vue')
    },

  ]
})

export default router
