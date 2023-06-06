import { Router, createRouter, createWebHistory } from 'vue-router';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import DefaultLayout from '@/layout/Default.vue';
import DemandDesignLayout from '@/layout/DemandDesign.vue';
import Home from '@/views/Home.vue';
import DemandLayout from '@/views/DemandDesign/DemandLayout.vue';
import Demand from '@/views/DemandDesign/Demand.vue';
import Proto from '@/views/DemandDesign/Proto.vue';
import UI from '@/views/DemandDesign/UIDesign/index.vue';
import DemandRepository from '@/views/DemandDesign/DemandRepository.vue';
import ProtoRepository from '@/views/DemandDesign/ProtoRepository.vue';
import UIRepository from '@/views/DemandDesign/UIRepository.vue';
import TemplateRepository from '@/views/DemandDesign/TemplateRepository.vue';

import AppDesign from '@/views/AppDesign.vue';
import AppDevelop from '@/views/AppDevelop.vue';
import IntegrateAuto from '@/views/IntegrateAuto.vue';
import BuildPublish from '@/views/BuildPublish.vue';
import packageConfig from '../../package.json';

// 创建路由实例
export const router: Router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? `/${packageConfig.name}` : '/'),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: Home,
        },
      ],
    },
    {
      path: '/demand-design',
      component: DemandDesignLayout,
      redirect: '/demand-design/demand/demand',
      children: [
        {
          path: 'demand',
          component: DemandLayout,
          children: [
            {
              path: 'demand',
              component: Demand,
            },
            {
              path: 'proto',
              component: Proto,
            },
            {
              path: 'ui',
              component: UI,
            },
          ],
        },

        {
          path: 'demand-repository',
          component: DemandRepository,
        },
        {
          path: 'proto-repository',
          component: ProtoRepository,
        },
        {
          path: 'ui-repository',
          component: UIRepository,
        },
        {
          path: 'template-repository',
          component: TemplateRepository,
        },
      ],
    },
    {
      path: '/app-design',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: AppDesign,
        },
      ],
    },
    {
      path: '/app-develop',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: AppDevelop,
        },
      ],
    },
    {
      path: '/integrate-auto',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: IntegrateAuto,
        },
      ],
    },
    {
      path: '/build-publish',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: BuildPublish,
        },
      ],
    },
  ],
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
