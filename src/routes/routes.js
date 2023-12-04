import Index from '@/templates/views/Index.vue'
import Notes from '@/templates/views/Notes.vue'
import Error404 from '@/templates/views/Error404.vue'

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
]
