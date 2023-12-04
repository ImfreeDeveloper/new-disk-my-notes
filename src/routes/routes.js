import Index from '@/templates/views/Index.vue'
import Notes from '@/templates/views/Notes.vue'
import Error404 from '@/templates/views/Error404.vue'

// import store from '@/store'

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/profile')
// }
//
// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

export const routes = [
  {
    name: 'home',
    path: '/',
    component: Index
  },
  {
    name: 'notes',
    path: '/notes',
    component: Notes
  },
  {
    path: '*',
    component: Error404,
    name: '404'
  }
  // {
  //   path: '/login',
  //   component: Login,
  //   meta: {
  //     layout: 'auth'
  //   },
  //   beforeEnter: ifNotAuthenticated
  // },
  // {
  //   path: '/profile',
  //   component: Profile,
  //   meta: {
  //     layout: 'default'
  //   },
  //   beforeEnter: ifAuthenticated
  // },
  // {
  //   path: '/page1',
  //   component: Page1,
  //   meta: {
  //     layout: 'default'
  //   },
  //   beforeEnter: ifAuthenticated
  // },
  // {
  //   path: '/page2',
  //   component: Page2,
  //   meta: {
  //     layout: 'default'
  //   },
  //   beforeEnter: ifAuthenticated
  // },
]
