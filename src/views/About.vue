<template>
  <div v-if="document && globals">
    <global-header :logo="globals.data.logo" :transparent="true"></global-header>

    <section class="main" ref="main">
      <div class="card card--about">
        <h1 class="about__title">{{ document.data.title }}</h1>
        <prismic-image class="about__headshot" :field="document.data.headshot" />
        <prismic-rich-text class="about__text" :field="document.data.about_text" />
      </div>

      <p class="featured-sentence">{{ document.data.featured_sentence }}</p>

      <div class="values">
        <div class="card card--value" v-for="value in document.data.values" :key="value.heading">
          <prismic-image class="value__image" :field="value.image" />
          <h2 class="value__heading">{{ value.heading }}</h2>
          <prismic-rich-text class="value__description" :field="value.description" />
        </div>
      </div>
    </section>

    <global-footer :logo="globals.data.logo"></global-footer>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      document: null,
      globals: null,
      pagePromise: null,
    }
  },
  methods: {
    getContent() {
      //Query to get home content
      this.pagePromise = this.$prismic.client.getSingle('about')
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
    loadBackgroundImage() {
      this.pagePromise.then(() => {
        const imageUrl = this.document.data.background_image.url;

        if (imageUrl) {
          var image = new Image();
          image.onload = () => {
            this.$refs.main.classList.add("loaded");
          }
          image.src = imageUrl;
          this.$refs.main.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${image.src}')`;
        }
      });
    },
  },
  created() {
    this.getContent();
    this.getGlobals();
    this.loadBackgroundImage();
  }
}
</script>

<style scoped>
  .main {
    position: relative;
    isolation: isolate;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 6rem 10% 4rem;
    background-color: var(--secondary-colour);
  }

  .main::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--secondary-colour);
    z-index: -1;
    transition: opacity 2s ease-in-out;
  }

  .main.loaded::before {
    opacity: 0;
  }

  .card--about {
    padding: 2rem;
  }

  .about__title {
    line-height: 1.2;
    font-size: 1.2rem;
    color: var(--secondary-colour);
  }

  .about__headshot {
    float: right;
    display: block;
    margin: 1rem 0 1rem 1rem;
    border-radius: 4px;
    width: 10rem;
    max-width: 50%;
  }

  .featured-sentence {
    color: white;
    font-family: 'Heebo', sans-serif;
    font-weight: 700;
    font-size: 1.7rem;
    margin: 6rem 4rem;
    text-align: center;
  }

  .values {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .card--value {
    flex: 0px 1 1;
    padding: 0;
    overflow: hidden;
    min-width: 14rem;
    max-width: 20rem;
  }

  .value__image {
    display: block;
    max-width: 100%;
    height: 10rem;
    width: 100%;
    object-fit: cover;
  }

  .value__heading {
    margin: 1rem;
    line-height: 1.2;
    font-size: 1.2rem;
    text-align: center;
    color: var(--secondary-colour);
  }

  .value__description {
    margin: 1rem;
    font-size: 14px;
  }

  @media only screen and (max-width:1024px) {}
  @media only screen and (max-width:800px) {
    .featured-sentence {
      font-size: 1.2rem;
      letter-spacing: 1px;
    }
  }

  @media only screen and (max-width:550px) {
    .about__text {
      font-size: 14px;
    }

    .featured-sentence {
      margin: 4rem 2rem;
    }
  }

  @media only screen and (max-width:400px) {
    .about__title {
      text-align: center;
    }

    .about__headshot {
      float: none;
      margin: 1rem auto;
    }

    .featured-sentence {
      margin: 4rem 0;
    }
  }

  @media screen and (max-width:390px) {
    .main {
      padding-top: 7rem;
    }
  }
</style>

<style>
  .about__text p {
    margin-top: 1rem;
  }
</style>