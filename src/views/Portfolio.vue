<template>
  <div v-if="document && globals" :style="cssVars" class="portfolio-page">
    <global-header :logo="globals.data.logo"></global-header>
    <h1 class="page-title">{{ document.data.title }}</h1>

    <section v-for="item in document.data.body" :key="item.primary.client_name" class="client" :id="item.primary.id">
      <div class="card desktop-only">
        <div>
          <h2 class="client__name">{{ item.primary.client_name }}</h2>
          <p class="client__type-of-work">{{ item.primary.type_of_work }}</p>
          <prismic-rich-text class="client__description" :field="item.primary.description" />
          <a class="client__url" :href="`https://${item.primary.website_url}`">{{ item.primary.website_url }}</a>
        </div>
        <prismic-image class="client__logo" :field="item.primary.client_logo" />
      </div>

      <div class="devices desktop-only">
        <div class="devices__device devices__device--desktop">
          <div class="devices__screenshot-container">
            <prismic-image :field="item.primary.desktop_screenshot" />
          </div>
        </div>
        <div class="devices__device devices__device--mobile">
          <div class="devices__screenshot-container">
            <prismic-image :field="item.primary.mobile_screenshot" />
          </div>
        </div>
      </div>

      <div class="card mobile-only">
        <h2 class="client__name">{{ item.primary.client_name }}</h2>
        <p class="client__type-of-work">{{ item.primary.type_of_work }}</p>
        <prismic-image class="client__logo" :field="item.primary.client_logo" />
        <prismic-rich-text class="client__description" :field="item.primary.description" />
        <a class="client__url" :href="`https://${item.primary.website_url}`" target="_blank">{{ item.primary.website_url }}</a>
        
        <div class="devices">
          <div class="devices__device devices__device--desktop">
            <div class="devices__screenshot-container">
              <prismic-image :field="item.primary.desktop_screenshot" />
            </div>
          </div>
        </div>
      </div>

    </section>

    <global-footer :logo="globals.data.logo"></global-footer>
  </div>
</template>

<script>
export default {
  name: 'portfolio',
  data () {
    return {
      document: null,
      globals: null
    }
  },
  methods: {
    getContent() {
      //Query to get home content
      this.$prismic.client.getSingle('portfolio')
        .then((document) => {
          if (document) {
            this.document = document;
          } else {
            //returns error page
            this.$router.push({ name: 'home-page' })
          }
        })
    },
    getGlobals() {
      this.$prismic.client.getSingle('globals')
        .then((globals) => {
          if (globals) {
            this.globals = globals;
          }
        })
    },
  },
  computed: {
    cssVars() {
      return {
        '--primary-colour': this.globals.data.primary_colour
      }
    }
  },
  created() {
    this.getContent();
    this.getGlobals();
  },
  updated() {
    if (location.hash) location.href = location.hash;
  }
}
</script>

<style scoped>
  .portfolio-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--off-white);
  }

  .page-title {
    margin: 2rem 2rem 0;
  }

  .client {
    max-width: 60rem;
    width: 100%;
    padding: 2rem;
  }

  .card {
    display: flex;
  }

  .client__name {
    line-height: 1.2;
    color: var(--secondary-colour);
  }

  .client__type-of-work {
    font-style: italic;
    line-height: 1.2;
    color: var(--grey-text);
  }

  .client__description {
    margin-top: 1rem;
  }

  .client__url {
    display: block;
    margin-top: 1rem;
    font-style: italic;
    color: var(--grey-text);
    width: fit-content;
  }

  .client__logo {
    align-self: center;
    max-height: 15rem;
    max-width: min(100%, 20rem);
    padding: 1rem;
    margin-left: 2rem;
  }

  .devices {
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    --device-height: 450px;
    --device-height: 28rem;
    --device-height: 45vw;

    --device-frame-width: calc(var(--device-height) / 40);

    --mobile-height: var(--device-height);
    --mobile-width: calc(var(--device-height) / 2);

    --desktop-height: calc(var(--device-height) * (4 / 5));
    --desktop-width: calc(var(--desktop-height) * (16 / 9));
    
    --stand-height: calc(var(--device-height) / 5);
    --stand-arm-height: calc(var(--stand-height) * (2 / 3));
    --stand-base-height: calc(var(--stand-height) - var(--stand-arm-height));
    --stand-arm-width: calc(var(--desktop-width) / 15);
    --stand-base-width: calc(var(--desktop-width) / 2.5);
  }
  

  @media screen and (min-width:60rem) {
    .devices {
      --device-height: 450px;
    }
  }

  .devices__device {
    flex-grow: 0;
    border: var(--device-frame-width) solid #c4c4c4;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .devices__screenshot-container {
    width: 100%;
    height: 100%;
    overflow: auto;

    scrollbar-width: thin;
    scrollbar-color: black #0006;
  }

  .devices__screenshot-container::-webkit-scrollbar {
    width: 8px;
  }

  .devices__screenshot-container::-webkit-scrollbar-track {
    background: #0006;
  }

  .devices__screenshot-container::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 4px;
  }

  .devices__device--desktop {
    width: var(--desktop-width);
    height: var(--desktop-height);
    position: relative;
  }

  .devices__device--desktop::before,
  .devices__device--desktop::after {
    content: "";
    background-color: #c4c4c4;
    position: absolute;
    left: 50%;
  }

  .devices__device--desktop::before {
    bottom: 0;
    width: var(--stand-arm-width);
    height: calc(var(--stand-arm-height) * 1.1 + var(--device-frame-width));
    transform: translate(-50%, calc(100% + 1px));
  }

  .devices__device--desktop::after {
    bottom: calc((var(--stand-arm-height) + var(--device-frame-width)) * -1);
    border-radius: 50%;
    width: var(--stand-base-width);
    height: var(--stand-base-height);
    transform: translate(-50%, 100%);
  }

  .devices__device--mobile {
    width: var(--mobile-width);
    height: var(--mobile-height);
  }

  .devices__screenshot-container img {
    max-width: 100%;
    display: block;
  }

  .mobile-only {
    display: none;
  }

  @media screen and (max-width:768px) {
    .desktop-only {
      display: none;
    }

    .mobile-only {
      display: flex;
    }

    .card {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .client__logo {
      max-height: 10rem;
      margin: 1rem;
    }

    .client__description {
      margin: 0;
      text-align: start;
    }

    .devices__device {
      margin-bottom: calc(var(--stand-height) + 1rem);
    }
  }
</style>
