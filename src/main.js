import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from './locales'
import { setupAssets, setupScrollbarStyle } from './plugins'
import { setupStore } from './store'
import { setupRouter } from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import tool from './utils/tool'
import config from "./config"

async function bootstrap() {

  const app = createApp(App)

  app.use(ElementPlus)

  app.config.globalProperties.$TOOL = tool;
  app.config.globalProperties.$CONFIG = config;

  setupAssets()

  setupScrollbarStyle()

  setupStore(app)

  setupI18n(app)

  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
