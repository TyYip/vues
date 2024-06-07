import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'
import ServerCreation from '../views/ServerCreation.vue'
import ChatRoom from '../views/ChatRoom.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/servercreation',
    name: 'ServerCreation',
    component: ServerCreation
  },
  {
    path: '/chat/:id',
    name: 'ChatRoom',
    component: ChatRoom,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router


