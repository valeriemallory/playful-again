<template>

    <!-- Hero area -->
    <div :class="isMobile ? 'pt-[76px]': 'pt-0'">
        <ImageCarousel :isMobile="isMobile" />
    </div>

    <!-- Welcome -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto pt-12 lg:pt-16">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Welcome to Playful Again!</div>
        <div>“Playful Again!” is a large-scale art installation in development for Burning Man 2023. The piece is a spirited invitation to Burners to reconnect to our inner childlike wonder that comes from the pure act of play.</div>
      </div>
    </div>
    <div class="container-inner mx-auto space-y-6 pb-2 pt-12">
      <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <img class="basis-1/2" src="../assets/home-concept-art-01.jpg" alt="Concept art for woman sitting in tree">
        <img class="basis-1/2" src="../assets/home-concept-art-02.jpg" alt="Concept art for woman standing in an abandoned space">
      </div>
    </div>

    <!-- A Museum of Stories -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto pt-12">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Let’s Spin, Let’s Dance, Let’s Play!</div>
        <div>When we were children we loved to play. We learned and explored the world through play. Playtime is where we learned to use our hands, interact with each other and explore the world.  The joy of life was magical when we were at play — we could create anything, and everything we imagined was so very real somehow. To play is a pure activity and is at the core of being human.</div>
        <div>But now, as adults, we have such limited time to play. We forgot to be ourselves. We forgot our innocence and lost the practice of seeing life without filters.  We live with the fear of expectations and criticism. Life has become full of judgement and consequences. We stopped playing, and have lost a bit of ourselves along the way.</div>
        <div>“Playful Again!” is all about resurrecting that dreamy and whimsical world of play and bringing us back to that joyful, magical place.</div>
      </div>
    </div>

    <img class="mx-auto py-12" src="../assets/home-cast-figure.jpg" alt="Concept art of a woman standing in a tree">

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
