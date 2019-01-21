import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import NewGame from '@/components/NewGame'
import ShipPlacement from '@/components/ShipPlacement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/new',
      name: 'NewGame',
      component: NewGame
    },
    {
      path: '/place-ships',
      name: 'ShipPlacement',
      component: ShipPlacement
    }
  ]
})
