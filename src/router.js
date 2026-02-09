import Vue from 'vue'
import Router from 'vue-router'
import Preview from './views/Preview.vue'
import HomePage from './views/HomePage.vue'
import PrivacyPolicy from "./views/PrivacyPolicy.vue";
import Portfolio from "./views/Portfolio.vue";
import About from "./views/About.vue";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
      meta: { title: "Emily's Websites | Bespoke websites and software development" }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { title: "Emily's Websites | About" }
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio,
      meta: { title: "Emily's Websites | Portfolio" }
    },
    {
      path: '/privacy',
      name: 'privacy-policy',
      component: PrivacyPolicy,
      meta: { title: "Emily's Websites | Privacy" }
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '*',
      redirect: { name: 'home-page' }
    }
  ]
});

const DEFAULT_TITLE = "Emily's Websites";
router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

export default router;