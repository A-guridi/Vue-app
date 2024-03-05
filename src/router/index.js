import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'

import EventList from '@/views/EventList.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import NotFound from '@/views/NotFound.vue'
import NProgress from 'vue-nprogress'

const nprogress = new NProgress()


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
        component: EventEdit,
        meta: { requireAuth: true}   // to require authentication, this is inherited to children components
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
    // lazy loading will make the page loaded only when its accessed, making the overall app faster
    // the webpackChunkName will set the JS in a file named about (seen in dev tools)
    component: () => import(/* webpackChunkName: "networkError" */ '../views/NetworkError.vue')
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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    // alias : '/about'    // same as redirect, but this one might affect google search
  },
  {
    path: '/about',
    redirect: {name : 'About'}
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // defines the scrolling to move to the top
  scrollBehaviour(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    }
    else{
      return {top: 0}
    }
  }
})

// this enables authorization on a routing level
router.beforeEach((to, from) => {
  nprogress.start()
  const GStore = inject('GStore')

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 2000)

    if (from.href){   // if there was a previous page
      return false
    }
    else{
      return {path: '/'}
    }
  }
})

export default router
