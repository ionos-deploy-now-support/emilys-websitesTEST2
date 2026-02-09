<template>
  <header :class="{ transparent: transparent }">
    <router-link v-if="logo" class="logo" to="/">
      <prismic-image :field="logo" />
    </router-link>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/portfolio">Portfolio</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ['logo', 'transparent']
}
</script>

<style scoped>
  header {
    height: 64px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: var(--secondary-colour);
    font-size: small;
    padding: .75rem 1rem;
    text-align: center;
    width: 100%;
    z-index: 10;
  }

  header.transparent {
    background-color: transparent;
    position: absolute;
  }

  .logo > img {
    height: 100%;
    max-width: calc(100vw - 2rem);
  }

  .logo {
    display: block;
    height: 40px;
  }

  nav {
    margin: 1rem;
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
  }

  nav > a {
    color: white;
    text-decoration: none;
  }

  nav > a + a {
    margin-left: 1rem;
  }

  @media screen and (max-width:425px) {
    nav {
      margin-right: .5rem;
    }
  }

  @media screen and (max-width:390px) {
    header {
      flex-direction: column;
      justify-content: center;
      height: fit-content;
    }

    nav {
      margin-bottom: 0;
    }
  }
</style>
