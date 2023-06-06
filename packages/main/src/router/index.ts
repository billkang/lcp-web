import { Router, createRouter, createWebHistory } from 'vue-router';
import microApps from '@/qiankun/apps';
import MicroAppLayout from '@/layout/MicroApp.vue';
import MainAppLayout from '@/layout/MainApp.vue';
import Home from '../views/Home.vue';
import AppCenter from '../views/AppCenter.vue';
import Resource from '../views/Resource/Index.vue';
import Solution from '../views/Solution/Index.vue';
import Case from '../views/Case/Index.vue';
import OpenPlatform from '../views/OpenPlatform.vue';
import Login from '../views/Login.vue';
import Registry from '../views/Registry.vue';
import ChangePassword from '../views/ChangePassword.vue';

// 获取微服务路由
const microRoutes = [];
microApps.forEach(micro => {
  microRoutes.push({
    path: `${micro.activeRule}/:morePath*`,
    component: MicroAppLayout,
  });
});

// 创建路由实例
export const router: Router = createRouter({
  history: createWebHistory(),
  routes: microRoutes.concat([
    {
      path: '/',
      component: MainAppLayout,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: 'app-center',
          component: AppCenter,
        },
        {
          path: 'resource',
          component: Resource,
        },
        {
          path: 'solution',
          component: Solution,
        },
        {
          path: 'case',
          component: Case,
        },
        {
          path: 'open-platform',
          component: OpenPlatform,
        },
      ],
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/registry',
      component: Registry,
    },
    {
      path: '/change-password',
      component: ChangePassword,
    },
  ]),
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      }
      if (from.meta.saveSrollTop) {
        const top: number = document.documentElement.scrollTop || document.body.scrollTop;
        resolve({ left: 0, top });
      }
    });
  },
});

export default router;
