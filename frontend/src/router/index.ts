import { STORAGE_KEY } from '@/constants/keys';
import { LocalStorage } from '@/utils/localStorage';
import { createRouter, createWebHistory } from 'vue-router';
export enum LinkPath {
  MAIN = 'main',
  HOME = 'home',
  LOGIN = 'login',
  SIGNUP = 'signup',
}

const routes = [
  {
    path: '/',
    name: LinkPath.MAIN,
    component: () => import('../pages/MainPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/' + LinkPath.HOME,
    name: LinkPath.HOME,
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/' + LinkPath.LOGIN,
    name: LinkPath.LOGIN,
    component: () => import('../pages/LogIn.vue'),
  },
  {
    path: '/' + LinkPath.SIGNUP,
    name: LinkPath.SIGNUP,
    component: () => import('../pages/SignUp.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const userLocalStore = new LocalStorage(STORAGE_KEY.USER);

router.beforeEach((to) => {
  // const user = userLocalStore.get();
  // if(!!to.meta.requiresAuth && (!user || !user.isLogged)) {
  //   console.log('not auth');
  //   return { name: LinkPath.HOME };
  // }

  return true;
});

export default router;
