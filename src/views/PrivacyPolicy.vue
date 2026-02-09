<template>
  <div v-if="document && globals" class="privacy-page" :style="pageStyles">
    <router-link to="/" class="button">Back to main website</router-link>
    <div class="privacy-policy-container">
      <div v-if="document" class="card privacy-policy">
        <h1>Privacy Policy</h1>
        <prismic-rich-text :field="document.data.privacy_policy" />
      </div>
    </div>
    <a href="/" class="button">Back to main website</a>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data () {
    return {
      document: null,
      globals: null,
    }
  },
  methods: {
    getContent() {
      this.$prismic.client.getSingle('privacy_policy')
        .then((document) => {
          if (document) {
            this.document = document;
          } else {
            this.$router.push({ name: 'home-page' })
          }
        });
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
    pageStyles() {
      return {
        '--primary-colour': this.globals.data.primary_colour,
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(' + this.document.data.background_image.url + ')'
      }
    },
  },
  created() {
    this.getContent();
    this.getGlobals();
  }
}
</script>

<style>
  .privacy-page {
    background-size: cover;
    background-attachment: fixed;
  }

  .privacy-page .button {
    display: inline-block;
    text-align: center;
    text-decoration: none;
    color: black;
  }

  .privacy-policy-container {
    padding: 2rem 10%;
  }

  .privacy-policy {
    margin: auto;
    padding: 2rem;
  }

  .privacy-policy h2 {
    margin: 1rem 0 .5rem 0;
  }

  .privacy-policy ul, .privacy-policy ol {
    margin: 0 1.5rem;
  }

  .privacy-policy li {
    margin: .5rem;
  }

  .privacy-policy p {
    margin: .5rem 0;
  }

  .privacy-page .button {
    margin: 2rem;
  }
</style>