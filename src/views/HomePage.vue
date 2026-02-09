<template>
  <div v-if="document && globals" :style="cssVars">
    <global-header :transparent="true"></global-header>

    <section class="section section--hero bg-img" ref="hero">
        <prismic-image class="logo"
          :field="globals.data.logo"
          :width="globals.data.logo.dimensions.width"
          :height="globals.data.logo.dimensions.height"/>
        <h1 class="sr-only">{{ document.data.title }}</h1>
        <p class="tagline">{{ document.data.tagline }}</p>
    </section>

    <section class="section section--services">
      <h2 class="sr-only">Services</h2>

      <div class="services">
        <div class="card card--service" v-for="service in document.data.services" :key="service.service_name[0].text">
          <img class="card__image" :src="`${service.service_image.url}&w=320&fit=max`" alt />
          <h3 class="card__title">{{ service.service_name }}</h3>
          <p class="card__description">{{ service.service_description }}</p>
        </div>
      </div>
      
      <a class="button" v-if="document.data.contact_button_text" href="#contact">
        {{ document.data.contact_button_text }}
      </a>
    </section>

    <section class="section section--service-details" v-for="serviceDetails in document.data.body"
      :key="serviceDetails.primary.service_title[0].text"
      :class="{ 'bg-img': serviceDetails.primary.service_bg_img && serviceDetails.primary.service_bg_img.url }"
      :style="getTextColour(serviceDetails.primary.service_bg_img)"
      :data-image-url="serviceDetails.primary.service_bg_img.url"
      ref="serviceDetails">

      <h2 class="section__title">{{ serviceDetails.primary.service_title }}</h2>
      <prismic-rich-text class="rich-text" :field="serviceDetails.primary.service_details_text" />

      <div v-if="serviceDetails.primary.process_title">
        <h3 class="section__subtitle">{{ serviceDetails.primary.process_title }}</h3>
        <ul class="card card--process">
          <li class="step" v-for="step in serviceDetails.items" :key="step.step_title[0].text">
            <div class="step__number">{{ step.step_number }}</div>
            <div class="step__text">
              <h4 class="step__title">{{ step.step_title }}</h4>
              <p class="step__description">{{ step.step_description }}</p>
            </div>
          </li>
        </ul>
      </div>
      
      <a class="button" v-if="serviceDetails.primary.contact_button_text" href="#contact">
        {{ serviceDetails.primary.contact_button_text }}
      </a>
    </section>
    
    <section class="section section--pricing" ref="pricing"
      :class="{ 'bg-img': document.data.pricing_bg_img && document.data.pricing_bg_img.url }"
      :style="getTextColour(document.data.pricing_bg_img)">
      <h2 class="section__title">{{ document.data.pricing_title }}</h2>
      <div class="card card--price" v-for="priceCard in document.data.body1" :key="priceCard.primary.price_name">
        <div class="price-card__price">
          <h3 class="card__title">{{ priceCard.primary.price_name }}</h3>
          <p>{{ priceCard.primary.price }}</p>
        </div>
        <div class="price-card__details">
          <template v-if="priceCard.items.length > 0">
            <h4 class="price-card__details__heading">{{ priceCard.primary.inclusion_heading }}</h4>
            <ul class="fa-ul price-card__inclusions">
              <li class="inclusion-list-item" v-for="includedItem in priceCard.items" :key="includedItem.included_list_item">
                <span class="fa-li inclusion-list-item__icon">
                  <font-awesome-icon :icon="['fas', 'check']" size="1x" />
                </span>
                <span class="inclusion-list-item__text">{{ includedItem.included_list_item }}</span>
              </li>
            </ul>
          </template>
          <template v-else>
            <p class="price-card__details__info">{{ priceCard.primary.inclusion_heading }}</p>
          </template>
        </div>
      </div>
    </section>

    <section class="section section--portfolio">
      <h2 class="section__title">{{ document.data.portfolio_title }}</h2>
      <div class="portfolio__image-container">
        <router-link class="portfolio__image-link"
          v-for="item in document.data.portfolio"
          :key="item.name"
          :to="`portfolio#${item.link_id}`"
          :class="{
            'portfolio__image-link--current': isCurrentPortfolioImage(item.name),
            'portfolio__image-link--next': isNextPortforlioImage(item.name),
            'portfolio__image-link--prev': isPrevPortforlioImage(item.name)}">
          <img
            :src="`${item.image.url}&w=864&fit=max`"
            :alt="item.image.alt"
            class="portfolio__image"
            :class="{
              'portfolio__image--current': isCurrentPortfolioImage(item.name),
              'portfolio__image--next': isNextPortforlioImage(item.name),
              'portfolio__image--prev': isPrevPortforlioImage(item.name)}"
            />
        </router-link>
      </div>
      <div class="portfolio__label">
        <button class="portfolio__button" @click="prevPortfolioItem" aria-label="Show previous portfolio item">
          <font-awesome-icon :icon="['fas', 'chevron-circle-left']" size="2x" />
        </button>
        <p class="portfolio__name">{{ document.data.portfolio[portfolioIndex].name }}</p>
        <button class="portfolio__button" @click="nextPortfolioItem" aria-label="Show next portfolio item">
          <font-awesome-icon :icon="['fas', 'chevron-circle-right']" size="2x" />
        </button>
      </div>
      <router-link class="button" to="portfolio">{{ document.data.portfolio_link_text }}</router-link>
    </section>

    <section v-show="document.data.testimonial.length > 0" class="section section--testimonials"
      :class="{ 'bg-img': document.data.testimonials_bg_img && document.data.testimonials_bg_img.url }"
      :style="getTextColour(document.data.testimonials_bg_img)" ref="testimonials">
      <h2 class="section__title">{{ document.data.testimonials_title }}</h2>
      <testimonial-slider :testimonials="document.data.testimonial"></testimonial-slider>
    </section>

    <section class="section" id="contact" OnSubmit="GetCustomEvent()"
      :class="{ 'bg-img': document.data.contact_bg_img && document.data.contact_bg_img.url }"
      :style="getTextColour(document.data.contact_bg_img)" ref="contact"
      >
      <h2 class="section__title">{{ document.data.contact_title }}</h2>

      <p class="contact__text">{{ document.data.contact_text }}</p>

      <address class="contact__details">
        <font-awesome-icon class="contact__email-icon" :icon="['fas', 'envelope']" size="2x" />
        <a class="contact__email" :href="'mailto:'+document.data.contact_email">{{ document.data.contact_email }}</a>
      </address>

      <div class="card">
        <h3 class="section__subtitle section__subtitle--form">{{ showSuccess ? "Message sent!" : "Send a message"}}</h3>
        <form v-if="!showSuccess" class="contact__form" @submit.prevent="sendEnquiry" id="enquiry-form">
          <div class="form-field">
            <label class="form-field__label" for="user_name">Name</label>
            <input class="form-field__input" v-model="form.name" name="user_name" id="user_name" type="text" required/>
          </div>

          <div class="form-field">
            <label class="form-field__label" for="user_email">Email</label>
            <input class="form-field__input" v-model="form.email" name="user_email" id="user_email" type="email" required/>
          </div>
          
          <div class="form-field">
            <label class="form-field__label" for="user_phone">Phone</label>
            <input class="form-field__input" v-model="form.phone" name="user_phone" id="user_phone" type="tel" required/>
          </div>

          <div class="form-field">
            <label class="form-field__label" for="message">Message</label>
            <textarea class="form-field__input" v-model="form.message" name="message" id="message" required />
          </div>

          <div class="form-field--website">
            <label for="website">Website</label>
            <input type="url" name="website" tabindex="-1" autocomplete="off" v-model="form.website" />
          </div>

          <button class="button button--send" type="submit" :disabled="sending" :class="{ 'button--disabled': sending }">Send</button>
        </form>

        <p class="form__message" v-if="showSuccess">{{ document.data.success_message }}</p>

        <p class="form__message" v-if="showError">
          We're sorry, something went wrong while sending your message. Please try again, or
          <a :href="'mailto:'+ document.data.contact_email + '?body=' + form.message">send an email</a>
          instead.
        </p>
        
      </div>
    </section>

    <global-footer :logo="globals.data.logo"></global-footer>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import TestimonialSlider from '../components/TestimonialSlider.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'home-page',
  components: {
    TestimonialSlider,
    Footer
  },
  data () {
    return {
      document: null,
      globals: null,
      form: {name: null, email: null, phone: null, message: null, website: null},
      showError: false,
      showSuccess: false,
      sending: false,
      pagePromise: null,
      globalsPromise: null,
      portfolioIndex: 0,
      portfolioGoingForwards: true
    }
  },
  methods: {
    getContent() {
      //Query to get home content
      this.pagePromise = this.$prismic.client.getSingle('homepage')
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
      this.globalsPromise = this.$prismic.client.getSingle('globals')
        .then((globals) => {
          if (globals) {
            this.globals = globals;
          }
        })
    },
    getTextColour(backgroundImage) {
      if (backgroundImage && backgroundImage.url) {
        return {
          color: 'white'
        }
      } else {
        return {
          color: 'black'
        }
      }
    },
    sendEnquiry() {
      this.sending = true;
      this.showError = false;

      if (!this.form.website) {
        emailjs.sendForm('service_q0y33om', 'contact_form', '#enquiry-form')
          .then((result) => {
            this.showSuccess = true;
            console.log('Success', result.status, result.text);
          }, (error) => {
            this.showError = true;
            this.sending = false;
            console.log('Failed', error)
          })
      }
    },
    isCurrentPortfolioImage(name) {
      return this.document.data.portfolio[this.portfolioIndex].name === name;
    },
    isNextPortforlioImage(name) {
      const nextIndex = (this.portfolioIndex + 1) % (this.document.data.portfolio.length);
      return this.document.data.portfolio[nextIndex].name === name && (this.document.data.portfolio.length > 2 || nextIndex === 1);
    },
    isPrevPortforlioImage(name) {
      const prevIndex = (this.portfolioIndex + this.document.data.portfolio.length - 1) % (this.document.data.portfolio.length);
      return this.document.data.portfolio[prevIndex].name === name && (this.document.data.portfolio.length > 2 || prevIndex === 0);
    },
    prevPortfolioItem() {
      const newIndex = (this.portfolioIndex + this.document.data.portfolio.length - 1) % (this.document.data.portfolio.length);
      this.portfolioIndex = newIndex;
    },
    nextPortfolioItem() {
      const newIndex = (this.portfolioIndex + 1) % this.document.data.portfolio.length;
      this.portfolioIndex = newIndex;
    },
    loadBackgroundImage(element, url, overlayColour) {
      if (url) {
        url += `&w=2000&fit=max`;
        var image = new Image();
        image.onload = () => {
          element.classList.add("loaded");
        }
        image.src = url;
        element.style.backgroundImage = `linear-gradient(${overlayColour}, ${overlayColour}), url('${image.src}')`;
      }
    },
    loadBackgroundImages() {
      Promise.all([this.pagePromise, this.globalsPromise]).then(() => {
        this.loadBackgroundImage(this.$refs.hero, this.document.data.background_image.url, 'rgba(0,0,0,0.7)');

        this.$refs.serviceDetails.forEach(element => {
          const bgImgUrl = element.getAttribute("data-image-url");
          if (bgImgUrl) {
            this.loadBackgroundImage(element, bgImgUrl, 'rgba(0,0,0,0.7)');
          }
        });
        
        this.loadBackgroundImage(this.$refs.pricing, this.document.data.pricing_bg_img.url, 'rgba(0,0,0,0.4)');
        this.loadBackgroundImage(this.$refs.testimonials, this.document.data.testimonials_bg_img.url, 'rgba(0,0,0,0.7)');
        this.loadBackgroundImage(this.$refs.contact, this.document.data.contact_bg_img.url, 'rgba(0,0,0,0.6)');
      });
    }
  },
  computed: {
    cssVars() {
      return {
        '--primary-colour': this.globals.data.primary_colour
      }
    },
    showForm() {
      return !this.showError && ! this.showSuccess;
    }
  },
  created() {
    this.getContent();
    this.getGlobals();
    this.loadBackgroundImages();
  }
}
</script>

<style scoped>
  .section {
    padding: 4rem 20%;
    background-color: var(--off-white);
  }

  .bg-img {
    position: relative;
    isolation: isolate;
  }

  .bg-img::before {
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

  .bg-img.loaded::before {
    opacity: 0;
  }

  .section.section--hero {
    padding: 8rem 1rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }

  .section--services {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section--service-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .section--pricing {
    background-attachment: fixed;
  }

  .section__title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .section__subtitle {
    text-align: center;
    font-size: 1.5rem;
    margin: 2rem 0;
  }

  .section__subtitle--form {
    margin: 1rem 0;
  }

  .logo {
    margin: 1rem;
    width: 25rem;
    max-width: calc(100% - 4rem);
    min-width: 10rem;
    height: auto;
  }

  .tagline {
    margin: 1rem;
    font-size: min(max(1rem, 2vw), 1.5rem);
    line-height: 1.2;
    text-align: center;
  }

  .services {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .card--service {
    flex: 0px 1 1;
    padding: 0;
    overflow: hidden;
    min-width: 14rem;
    max-width: 20rem;
  }

  .card--process {
    list-style: none;
  }

  .card__image {
    display: block;
    max-width: 100%;
    height: 10rem;
    width: 100%;
    object-fit: cover;
    position: relative;
    isolation: isolate;
    border-bottom: 4px solid var(--primary-colour);
  }

  .card__title {
    margin: 1rem;
    line-height: 1.2;
    font-size: 1.2rem;
    text-align: center;
    color: var(--secondary-colour);
  }

  .card__description {
    margin: 1rem;
    font-size: 14px;
  }

  .card__title {
    margin-bottom: 1rem;
  }

  .step {
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }

  .step__number {
    --step-number-size: 48px;
    width: var(--step-number-size);
    height: var(--step-number-size);
    text-align: center;
    line-height: var(--step-number-size);
    font-size: 2rem;
    background-color: var(--primary-colour);
    border-radius: 50%;
    color: white;
    font-weight: 900;
  }

  .step__text {
    margin: 0 1rem;
    padding: 1rem;
    flex: 0px 1 1;
  }

  .step__title {
    font-size: 1.25rem;
    margin-bottom: .5rem;
    padding-bottom: .5rem;
    border-bottom: 2px solid var(--primary-colour);
    font-weight: 600;
  }

  /* Pricing */

  .card--price {
    display: flex;
    margin-top: 2rem;
  }

  .price-card__price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 2rem;
    text-align: center;
    flex: 0px 1 1;
    border: 0 solid var(--primary-colour);
    border-width: 0 2px 0 0;
  }

  .price-card__price > p {
    font-size: 2rem;
    line-height: 2.5rem;
  }

  .price-card__details {
    padding: 1rem 2rem;
    flex: 0px 1 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .price-card__details__heading {
    margin-bottom: .5rem;
  }

  .price-card__inclusions {
    list-style: none;
  }

  .price-card__details__info {
    margin: 0;
  }

  .inclusion-list-item {
    display: flex;
  }

  .inclusion-list-item__icon {
    color: var(--primary-colour);
  }

  /* Portfolio */

  .section.section--portfolio {
    overflow: hidden;
  }

  .portfolio__image-container {
    position: relative;
    display: block;
    margin: 2rem auto;
    max-width: 100%;
    height: 40vw;
    max-height: 25rem;
  }

  .portfolio__image-link {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;

    transition: transform 1000ms ease-in-out, opacity 1000ms ease-in-out;
  }

  .portfolio__image-link--current {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }

  .portfolio__image-link--prev {
    opacity: 0;
    transform: translateX(-50%);
  }

  .portfolio__image-link--next {
    opacity: 0;
    transform: translateX(50%);
  }

  .portfolio__image {
    height: 100%;
    width: 100%;
    object-fit: contain;
    filter: drop-shadow(2px 4px 4px #0004);
  }

  .portfolio__label {
    display: flex;
    max-width: 30rem;
    width: 100%;
    margin: auto;
    justify-content: space-between;
    align-items: center;
  }

  .portfolio__name {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 1rem;
    text-align: center;
  }

  .portfolio__button {
    border: 0;
    background: none;
    cursor: pointer;
    padding: 1rem;
  }

  /* Contact */

  .contact__text {
    margin: 2rem 0;
  }

  .contact__details {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }

  .contact__email-icon {
    color: var(--primary-colour);
    margin-right: 1rem;
  }

  .contact__email {
    font-style: normal;
    color: inherit;
  }

  .contact__form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    transition: opacity 0.5s ease-in-out;
  }

  .contact__form--hidden {
    opacity: 0;
  }

  .form-field {
    margin-bottom: 1.5rem;
  }

  .form-field--website {
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .form-field__label {
    display: block;
    font-weight: 500;
    margin-bottom: .5rem;
  }

  .form-field__input {
    padding: .5rem;
    width: 100%;
    font-size: 1rem;
    border: 1.5px solid var(--primary-colour);
    border-radius: 8px;
  }

  textarea.form-field__input {
    min-height: 8rem;
    min-width: 100%;
    max-width: 100%;
  }

  .form__message {
    text-align: center;
    margin-bottom: 1rem;
  }

  @media only screen and (max-width:1024px) {
    .section--pricing {
      padding: 4rem;
    }
  }

  @media only screen and (max-width:800px) {
    .section {
      padding: 4rem;
    }

    .card--price {
      flex-direction: column;
    }

    .price-card__price {
      border-width: 0 0 2px 0;
    }

    .price-card__details {
      padding: 1rem;
    }
  }

  @media only screen and (max-width:550px) {
    .section, .section--services {
      padding: 3rem
    }
    
    .section.section--hero {
      padding: 6rem .5rem 5rem;
    }

    .card:not(.card--service) {
      padding: 1rem;
    }

    .card--price {
      margin-top: 2rem;
    }

    .card:last-of-type {
      margin-bottom: 0;
    }

    .card:first-of-type {
      margin-top: 0;
    }

    .step {
      padding: 0;
    }

    .step__number {
      display: none;
    }

    .step__text {
      margin: 0;
    }
  }

  
  @media only screen and (max-width:400px) {
    .section, .section--services {
      padding: 2rem
    }
  }
</style>
