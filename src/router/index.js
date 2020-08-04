import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MenuList from '@/components/MenuList'
import MenuItem from '@/components/MenuItem'
import MenuItemEdit from '@/components/MenuItemEdit'
import MenuItemView from '@/components/MenuItemView'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/menulist',
        name: 'MenuList',
        component: MenuList
    },
    {
        path: '/menulist/:id',
        name: 'MenuItem',
        component: MenuItem,
        children:
            [
                {
                    path: '/new',
                    name: 'MenuItemNew',
                    component: MenuItemEdit
                },
                {
                    path: 'edit',
                    name: 'MenuItemEdit',
                    component: MenuItemEdit
                },
                {
                    path: 'view',
                    name: 'MenuItemView',
                    component: MenuItemView
                }
            ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
