<template>

    <!-- Design overview -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto py-4 mt-24 lg:mt-32">
      <div class="space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Design</div>
        <div>Secretly Abandoned Spaces is a visual story about the places that were once full of activity, but are now abandoned and forgotten. The design evokes an archaic, abandoned church in late autumn: a lonely place, surrounded by red trees and haunted with cast figures.</div>
      </div>
    </div>

    <!-- Art installation preview video -->
    <div v-if="isMobile" class="container-inner flex justify-center mx-2 md:mx-auto py-8">
      <iframe
        width="400"
        height="250"
        src="https://www.youtube.com/embed/sSfaucYXjPc"
        title="Secretly Abandoned Spaces Preview Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <div v-else class="container-inner flex justify-center mx-2 md:mx-auto py-8 md:py-12">
      <iframe
        width="900"
        height="500"
        src="https://www.youtube.com/embed/sSfaucYXjPc"
        title="Secretly Abandoned Spaces Preview Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>

    <!-- The Central Structure -->
    <div class="container-inner prose md:prose-lg mx-8 lg:mx-auto py-8 lg:py-12">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">The Central Structure</div>
        <div class="max-w-3xl pb-4 mx-auto">The central structure is an ornate space worn down by time, like an old church in a state of decay. Its windows gape open in disrepair, laced with curtains blowing in the wind. A curved staircase spirals upward to a closed area above.</div>
        <img class="mx-auto" src="../assets/design-structure-01.jpg" alt="Concept art for the central structure">
        <div class="text-center border-b border-gray-200 pt-10 pb-2">Copula exterior</div>
        <img class="mx-auto" src="../assets/design-copula-01.jpg" alt="Design for copula">
        <img class="mx-auto" src="../assets/design-copula-02.jpg" alt="Concept art for copula exterior">
        <div class="text-center border-b border-gray-200 pt-10 pb-2">Structure support for the copula</div>
        <img class="mx-auto" src="../assets/design-copula-03.jpg" alt="Structure support for the copula">
        <div class="text-center border-b border-gray-200 pt-10 pb-2">Cuts for the copula</div>
        <img class="mx-auto" src="../assets/design-copula-04.jpg" alt="Cuts for the copula">
        <div class="text-center border-b border-gray-200 pt-10 pb-2">Staircase</div>
        <div class="flex flex-col lg:flex-row space-x-4">
          <img class="basis-1/2 w-full" src="../assets/design-stairs-01.jpg" alt="Design for staircase">
          <img class="basis-1/2 w-full" src="../assets/design-stairs-02.jpg" alt="Concept art for staircase">
        </div>
        <img class="mx-auto" src="../assets/design-stairs-03.jpg" alt="Concept art for the staircase">
      </div>
    </div>

    <!-- Surrounding Area -->
    <div class="container-inner prose md:prose-lg max-w-3xl mx-8 lg:mx-auto py-12 mb-10">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Surrounding Area</div>
        <div class="max-w-3xl mx-auto">The central structure is surrounded by blood red trees, gnarled and leafless, some with ghost-like figures intertwined in their branches. The area is haunted with cast figures throughout, lingering phantoms of those who once inhabited the space.</div>
        <img class="mx-auto pt-8" src="../assets/design-surrounding-area-01.jpg" alt="Concept art of a woman standing in a tree">
        <div class="flex flex-col lg:flex-row space-x-0 md:space-x-4 lg:pt-8">
          <img class="basis-1/3 w-full" src="../assets/design-surrounding-area-02.jpg" alt="Concept art of a woman intertwined in a red tree">
          <img class="basis-1/3 w-full" src="../assets/design-surrounding-area-03.jpg" alt="Concept art of a couple embracing in a red tree">
          <img class="basis-1/3 w-full" src="../assets/design-surrounding-area-04.jpg" alt="Concept art of a woman leaning forward">
        </div>
        <img class="mx-auto pt-10 pb-2" src="../assets/design-surrounding-area-05.jpg" alt="Concept art of a woman lying on the ground beside a red tree">
      </div>
    </div>

    <!-- Donate Now -->
    <DonateNow />

</template>

<script>
import DonateNow from '../components/DonateNow.vue';

export default {
  name: "BaseHome",

  components: {
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
      this.isMobile = window.innerWidth < 650;
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
