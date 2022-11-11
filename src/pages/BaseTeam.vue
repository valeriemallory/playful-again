<template>

    <!-- Hero area -->
    <div class="container-inner prose text-xl sm:text-2xl font-semibold mx-auto text-center mt-20 py-12">Team</div>

    <!-- Team pics and bios -->
    <div class="container-inner mx-2 sm:mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-8">
          <div class="flex flex-col items-center pb-6 lg:pb-8" v-for="item in team" :key="item.id">
              <img class="w-full" :src="getImgUrl(item.img)" :alt="item.name">
              <div class="prose md:prose-lg flex justify-center font-semibold pt-8">{{ item.name }} </div>
              <div class="prose md:prose-lg flex justify-center pt-2 md:pt-4">{{ item.bio }} </div>
          </div>
      </div>
    </div>

    <!-- Donate Now -->
    <div class="pt-8 lg:pt-12">
        <DonateNow />
    </div>

</template>

<script>
import DonateNow from '../components/DonateNow.vue';
import json from '../data/team-list.json'

export default {
  name: "BaseHome",

  components: {
    DonateNow,
  },


  data: function() {
    return {
      team: json.team,
      isMobile: false
    };
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
    getImgUrl(imgName) {
        return new URL(`../assets/${imgName}`, import.meta.url).href
      },
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
