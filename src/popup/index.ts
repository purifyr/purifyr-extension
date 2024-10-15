import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { isAuthenticated } from '../utils'
import { useAuthStore } from '@/stores/auth.store'
import App from './app.vue'
import routes from '~pages'
import '@/assets/base.scss'
import './index.scss'

routes.push({
  path: '/',
  redirect: '/popup',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

// Créer l'instance Pinia
const pinia = createPinia()
// Utiliser le plugin de persistance pour Pinia
pinia.use(piniaPersist)
// Créer et monter l'application Vue
createApp(App).use(router).use(pinia).mount('#app')

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.auth && !authStore.user) {
    next({ path: '/common/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

console.log(router.getRoutes())

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
