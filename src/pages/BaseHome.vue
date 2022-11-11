<template>

    <!-- Hero area -->
    <div :class="isMobile ? 'pt-[76px]': 'pt-0'">
        <ImageCarousel :isMobile="isMobile" />
    </div>

    <!-- Welcome -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto pt-12 lg:pt-16">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Welcome to Secretly Abandoned Spaces</div>
        <div>Secretly Abandoned Spaces is a large-scale art installation and an Honorarium Art Grant Selection in development for Burning Man 2022. The piece is a visual story about places we have all lived, but are now abandoned and forgotten.</div>
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
        <div class="text-xl sm:text-2xl font-semibold text-center">A Museum of Stories</div>
        <div>Every abandoned space retains a feeling of what it once was. Abandoned buildings retain a beauty of that which has been forsaken; it’s the loveliness of disintegration.</div>
        <div>This piece is about the beauty of loss and decay of a building, a community, or a loved one. Elegance emerges from loss. A forgotten place becomes a church of ideas that have died and long passed. The cast figures upon the staircase is a theatre, or a play. The interplay of figures tell their own stories.</div>
        <div>Abandoned spaces become a museum of stories that have been lost in antiquity.</div>
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
      window.open("https://www.gofundme.com/f/secretly-abandoned-spaces", "_blank");
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
