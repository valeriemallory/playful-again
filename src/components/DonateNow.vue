<template>
    <!-- Donate Now -->
    <div class="bg-neutral-200">
        <div class="prose md:prose-lg mx-8 lg:mx-auto max-w-3xl py-12">
            <div class="space-y-8">
                <div class="text-xl sm:text-2xl font-semibold text-center">Get Involved</div>
                <div>Thanks to a <a class="font-base text-orange-600" href="https://journal.burningman.org/2022/03/burning-man-arts/brc-art/announcing-2022-brc-honoraria/" target="_blank">Burning Man Honorarium Art Grant</a> and help from a dedicated crew of volunteers, Secretly Abandoned Spaces is currently being built! But there are still many financial costs that need to be covered, including the material costs for casting the figures as well as transportion and fuel expenses.</div>
                <div>Please help us bring this work to the playa by donating to our fundraising campaign.</div>
                <div class="flex justify-center pt-4"><button class="cta-btn text-white bg-orange-500 hover:bg-orange-400" @click="donateNow">Donate Now</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "DonateNow",

  data: () => ({
  }),

  methods: {
    donateNow() {
      window.open("https://www.gofundme.com/f/secretly-abandoned-spaces", "_blank");
    },
  },

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



