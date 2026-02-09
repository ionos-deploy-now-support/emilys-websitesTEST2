<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap');

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.5s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: 'Work Sans', Helvetica, sans-serif;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
    --secondary-colour: #132641;
    --off-white: #f9f9f9;
    --grey-text: #4b4b4b;
    --gentle-shadow: 0px 0px 20px 5px #00000029;

    background-color: var(--off-white);

    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Heebo', Helvetica, sans-serif;
  }

  .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      border: 0;
  }
  
  .card {
    padding: 1.5rem;
    border-radius: 8px;
    flex: 1 1 0;
    background-color: white;
    box-shadow: var(--gentle-shadow);
    color: black;
  }
  
  .button {
    margin: 2rem auto 0;
    display: block;
    width: 33%;
    padding: .5rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    min-width: fit-content;
    max-width: 15rem;
    align-self: center;
    background-color: var(--primary-colour);
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    color: black;
    text-decoration: none;
    text-align: center;
  }

  .button--send {
    margin-top: 1rem;
  }

  .button--disabled {
    background-color: var(--off-white);
    cursor: unset;
  }

  .rich-text > p {
    margin: 0 0 1rem;
  }
</style>