import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contacts from './views/Contacts.vue'
import NotFound from './views/NotFound.vue'

import List from './views/contacts/List.vue'
import Add from './views/contacts/Add.vue'

const routes = [
  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/', component: Home },
  { 
    path: '/contacts', 
    component: Contacts,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: 'add',
        component: Add,
      },
    ],
  },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
