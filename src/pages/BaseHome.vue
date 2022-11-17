<template>

    <!-- Hero area -->
    <div :class="isMobile ? 'pt-[76px]': 'pt-0'">
        <ImageCarousel :isMobile="isMobile" />
    </div>

    <!-- Welcome -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto pb-6 pt-12 lg:pt-16">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Welcome to Playful Again!</div>
        <div>Playful Again is a large-scale art installation coming to Burning Man 2023. The piece is an invitation to reconnect to the childlike joy and wonder that comes from the pure act of play.</div>
      </div>
    </div>
    <div class="container-inner mx-auto space-y-6 pb-2 pt-12">
      <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <img class="basis-1/2" src="../assets/home-concept-art-01.jpg" alt="Concept art for a crouching angel figure">
        <img class="basis-1/2" src="../assets/home-concept-art-02.jpg" alt="Concept art for a spinning 'human chandelier'">
      </div>
    </div>

    <!-- Let’s Spin, Let’s Dance, Let’s Play! -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto pb-6 pt-12">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Let’s Spin, Let’s Dance, Let’s Play!</div>
        <div>When we were children, we loved to play. Life was magical when we were at play — we could create anything and everything we imagined was so very real. We learned to use our hands, interact with each other and explore the world through play.</div>
        <div>Unfortunately, as adults we have limited time for play. We forget to be ourselves. We forget our innocence and lose the practice of seeing life without filters. We lose our connection to joy and live with the fear of expectations and criticism. Life becomes full of judgment and consequences.</div>
        <div>Playful Again is about resurrecting that dreamy, whimsical world of play and bringing us back to that magical place.</div>
      </div>
    </div>
    <img class="mx-auto max-w-2xl pb-6 pt-12" src="../assets/home-concept-with-rotation.gif" alt="Concept art of a woman standing in a tree">

    <!-- About the piece -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto pb-6 pt-12">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">About the Installation</div>
        <div>Playful Again creates an interactive world of mythical fairy tales, wonder and play. The piece has cast figures within, a playground outside, and casts of “humanimals” with horns and wings set across the scene.</div>
        <div>Within the dome ceiling, a “human chandelier” of aerialist sculptures hang from a hoop, circling in perpetual motion, fully powered by solar energy.</div>
        <div>The walls inside will have giant paintings of acrobats. At night there will be dramatic shadow play from the solar-powered figures in perpetual motion.</div>
      </div>
    </div>

    <div class="container-inner mx-auto space-y-6 pb-6 pt-12">
      <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <img class="basis-1/2" src="../assets/home-concept-art-03.jpg" alt="Concept art for a kneeling woman with a curly ram-like horns on her head">
        <img class="basis-1/2" src="../assets/home-concept-art-04.jpg" alt="Concept art for a woman standing, unfurling a set of bat-like wings">
      </div>
    </div>

    <!-- Donate Now -->
    <div class="pt-4 lg:pt-12">
        <DonateNow />
    </div>

</template>

<script>
import ImageCarousel from '../components/ImageCarousel.vue';
import DonateNow from '../components/DonateNow.vue';

export default {
  name: "BaseHome",

  components: {
    ImageCarousel,
    DonateNow,
  },

  data: function() {
    return {
      isMobile: false    };
  },

  created() {
    // add an event listener to the window so we can switch image sizes
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
      window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    // update variable used to select mobile display elements
    handleResize() {
      this.isMobile = (window.innerWidth <= 650) || (window.innerWidth <= 950 && window.innerHeight >= 950);
    },
    donateNow() {
      window.open("https://www.gofundme.com/f/playful-again-burningman-2023", "_blank");
    },
  }
};
</script>

<style scoped>
  .cta-btn {
    text-transform: uppercase;
    font-weight: bold;
    padding: 12px 32px 12px 32px;
    border: 1px solid theme('colors.orange.500');
    border-radius: 5px;
  }

</style>
