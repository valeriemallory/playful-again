<template>

    <!-- Overview -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto py-4 mt-24 lg:mt-32">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">About</div>
        <div>Secretly Abandoned Spaces is a large-scale art installation and an Honorarium Art Grant Selection for Burning Man 2022. Created by artist and sculptor Valerie Mallory and illustrator and concept designer Mikell Haynes, the piece is currently being assembled by a crew based in Santa Clara, CA and nearby.</div>
        <div>Check out our <a class="font-base text-orange-600" href="https://www.facebook.com/secretlyabandonedspaces" target="_blank">Facebook Page</a> for project updates and news.</div>
      </div>

    </div>
    <div class="container-inner mx-auto pt-8 lg:pt-10 lg:pb-2">
      <img src="../assets/about-overview.jpg" alt="Concept art for Secretly Abandoned Spaces">
    </div>

    <!-- Philosophy -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto py-12">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Philosophy</div>
        <div>Every abandoned space retains a feeling of what it once was: a library, a railway station, a beautiful house. When stripped to its remains, we see a different kind of beauty — a beauty of that which is forsaken and left adrift. Time takes back its own. Elegance that emerges from loss tells the story of predicted and necessary change.</div>
        <div>This piece is about the beauty of loss and decay. One enters an old house where mortals used to live and created stories of their lives. These souls still live in the walls of this haunted space. The house becomes a church of collected ideas from a past era.</div>
        <div>Secretly Abandoned Spaces is an ephemeral museum, a piece that tells the story of forgotten moments lost with the passage of time: a lonely place, surrounded by red trees and haunted with cast figures.</div>
      </div>
    </div>
    <div class="container-inner mx-auto space-y-6 pb-6 lg:py-6">
      <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <img class="basis-1/2" src="../assets/concept-art-01.jpg" alt="Design for staircase">
        <img class="basis-1/2" src="../assets/concept-art-02.jpg" alt="Concept art for staircase">
      </div>
      <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <img class="basis-1/2" src="../assets/concept-art-03.jpg" alt="Design for staircase">
        <img class="basis-1/2" src="../assets/concept-art-04.jpg" alt="Concept art for staircase">
      </div>
    </div>

  <!-- Figures of a Forgotten Place -->
    <div class="prose md:prose-lg max-w-3xl mx-8 lg:mx-auto py-4 lg:py-12">
      <div class="space-y-6 lg:space-y-8">
        <div class="text-xl sm:text-2xl font-semibold text-center">Figures of a Forgotten Place</div>
        <div>The cast figures that inhabit Secretly Abandoned Spaces are as ornate as structures of antiquity. The expressions on their masked faces echo the elemental ways we integrate with the world as we pass through it.</div>
        <div>The interplay of figures tell their own stories. Some remain inside, sitting or standing in places they still hold on to. Others wander through the desolate area around their old home or hide in the branches of the surrounding trees.</div>
      </div>
    </div>
    <div class="container-inner mx-auto space-y-6 lg:py-2 mb-12">
      <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-6 lg:space-y-0 pt-6">
        <img class="basis-1/2" src="../assets/cast-figure-01.jpg" alt="Design for staircase">
        <img class="basis-1/2" src="../assets/cast-figure-02.jpg" alt="Concept art for staircase">
      </div>
      <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-6 lg:space-y-0">
        <img class="basis-1/3 w-full" src="../assets/cast-figure-03.jpg" alt="Concept art of a woman intertwined in a red tree">
        <img class="basis-1/3 w-full" src="../assets/cast-figure-04.jpg" alt="Concept art of a couple embracing in a red tree">
        <img class="basis-1/3 w-full" src="../assets/cast-figure-05.jpg" alt="Concept art of a woman leaning forward">
      </div>
      <img class="mx-auto" src="../assets/cast-figure-06.jpg" alt="Concept art of a woman lying on the ground beside a red tree">
    </div>

    <!-- Donate Now -->
    <div class="pt-4 lg:pt-8">
        <DonateNow />
    </div>

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
