<template>
  <div v-if="testimonials" class="slider">
    <button class="slider__button slider__button--prev" @click="prev">
      <font-awesome-icon :icon="['fas', 'chevron-circle-left']" size="2x" />
    </button>
    <div class="slider__container" ref="sliderContainer">
      <div class="slider__testimonial" v-for="testimonial in testimonials" :key="testimonial.testimonial_title">
        <p class="testimonial__text">{{ testimonial.testimonial_text }}</p>
        <p class="testimonial__name">{{ testimonial.customer_name }}</p>
      </div>
    </div>
    <button class="slider__button slider__button--next" @click="next">
      <font-awesome-icon :icon="['fas', 'chevron-circle-right']" size="2x" />
    </button>
  </div>
</template>

<script>
export default {
  props: ['testimonials'],
  name: 'testimonial-slider',
  data () {
    return {
      index: 0
    }
  },
  methods: {
    next() {
      const slider = this.$refs.sliderContainer;
      slider.scrollLeft += slider.clientWidth;
    },
    prev() {
      const slider = this.$refs.sliderContainer;
      slider.scrollLeft -= slider.clientWidth;
    }
  }
}
</script>

<style scoped>
  .slider {
    display: flex;
    align-items: center;
    max-width: 48rem;
    margin: auto;
  }

  .slider__container {
    display: flex;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  }

  .slider__testimonial {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 2rem;
    height: 12rem;
    min-width: 100%;
    scroll-snap-align: start;
  }

  .slider__button {
    border: 0;
    background: none;
    cursor: pointer;
    color: currentColor;
  }

  .slider__button--prev {
    margin-right: .5rem;
  }

  .slider__button--next {
    margin-left: .5rem;
  }

  .testimonial__text {
    margin: 0 0 1rem 0;
    padding: 0 1rem;
    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: white #0008;
  }

  .testimonial__text::-webkit-scrollbar {
    width: 8px;
  }

  .testimonial__text::-webkit-scrollbar-track {
    background: #0008;
    border-radius: 20px;
  }

  .testimonial__text::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 20px;
  }

  .testimonial__name {
    font-weight: 600;
  }

  
  @media only screen and (max-width:500px) {
    .testimonial {
      margin: 1rem;
    }
  }
</style>
