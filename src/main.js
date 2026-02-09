import Vue from 'vue'
import PrismicVue from '@prismicio/vue'
import linkResolver from './prismic/link-resolver'
import htmlSerializer from './prismic/html-serializer'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilRuler, faLaptop, faCode, faChevronCircleLeft, faChevronCircleRight, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import{ init } from 'emailjs-com';

init("user_A8BUHJt6PvRj76phtCVfz");

library.add(faPencilRuler, faLaptop, faCode, faChevronCircleLeft, faChevronCircleRight, faCheck, faEnvelope)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const TestimonialSlider = () => import("./components/TestimonialSlider.vue");
Vue.component('testimonial-slider', TestimonialSlider)

const Footer = () => import("./components/Footer.vue");
Vue.component('global-footer', Footer);

const Header = () => import("./components/Header.vue");
Vue.component('global-header', Header);

Vue.config.productionTip = false

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver,
  htmlSerializer
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
