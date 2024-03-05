import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import About from '@/views/AboutView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page || 1) })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  // error handling routes
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: () => import('../views/NetworkError.vue')
  },

  // Redirects start here
  {
    // redirect which also includes child components
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return {path: '/events/' + to.params.afterEvent}
    }
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    // alias : '/about'    // same as redirect, but this one might affect google search
  },
  {
    path: '/about',
    redirect: {name : 'About'}
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
