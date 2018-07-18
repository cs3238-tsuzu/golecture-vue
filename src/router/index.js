import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Chat from '@/components/Chat'
import Store from '../Store'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
    return
  }
  if (Store.name == null) {
    next('/')
  }
  next()
})

export default router
