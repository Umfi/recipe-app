import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: () => import ('../views/Home.vue')
  },
  {
    path: '/login',
    component: () => import ('../views/Login.vue'),
  },
  {
    path: '/register',
    component: () => import ('../views/Register.vue'),
  },
  {
    path: '/recipe/:id',
    component: () => import ('../views/Detail.vue')
  },
  {
    path: '/trending',
    component: () => import ('../views/RecipeList.vue'),
    props: { mode: 'trending' }
  },
  {
    path: '/profile',
    component: () => import ('../views/Profile.vue')
  },
  {
    path: '/likedrecipes',
    component: () => import ('../views/RecipeList.vue'),
    props: { mode: 'liked' }
  },
  {
    path: '/myrecipes',
    component: () => import ('../views/RecipeList.vue'),
    props: { mode: 'my' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
