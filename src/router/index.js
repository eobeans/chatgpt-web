import { createRouter, createWebHashHistory } from 'vue-router'
import { setupPageGuard } from './permission'
import systemRouter from './systemRouter';

const routes = systemRouter

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupPageGuard(router)

export async function setupRouter(app) {
  app.use(router)
  await router.isReady()
}
