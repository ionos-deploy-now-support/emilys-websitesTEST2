<template>
  <footer class="footer">
    <prismic-image class="logo" v-if="logo" :field="logo"
      :width="logo.dimensions.width" :height="logo.dimensions.height" />
    <div class="footer__links">
      <router-link to="/privacy">Privacy Policy</router-link>
    </div>
    <div class="footer__copyright">Copyright &copy; <span>{{ new Date().getFullYear() }}</span> Emily's Websites</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: ['logo']
}
</script>

<style scoped>
  .footer {
    background-color: var(--secondary-colour);
    color: white;
    font-size: small;
    padding: 1rem;
    text-align: center;
    width: 100%;
  }

  .logo {
    margin-top: .5rem;
    width: 200px;
    max-width: calc(100vw - 2rem);
    height: auto;
  }

  .footer__links > a {
    color: white;
  }
</style>
