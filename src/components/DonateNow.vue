<template>
    <!-- Donate Now -->
    <div class="bg-neutral-200">
        <div class="prose md:prose-lg mx-8 lg:mx-auto max-w-3xl py-12">
            <div class="space-y-8">
                <div class="text-xl sm:text-2xl font-semibold text-center">Get Involved</div>
                <div>We're excited to bring “Playful Again!” to Burning Man 2023! For an art exhibition of this scale, there are many financial costs that we need to cover to make this happen. We'd love to have you join our dedicated team of financial backers.</div>
                <div>Please help us bring this work to the playa by donating to our fundraising campaign.</div>
                <div class="flex justify-center pt-4"><button class="cta-btn text-white bg-orange-500 hover:bg-orange-400" @click="donateNow">Get Involved</button></div>
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
      window.open("https://www.facebook.com/groups/1517975068660312", "_blank");
      // window.open("https://www.gofundme.com/f/secretly-abandoned-spaces", "_blank");
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



