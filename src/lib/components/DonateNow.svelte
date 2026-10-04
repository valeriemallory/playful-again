<script lang="ts">
  function donateNow() {
    window.open('https://www.gofundme.com/f/playful-again-burningman-2023', '_blank', 'noopener,noreferrer');
  }
</script>

<div class="bg-neutral-200">
  <div class="prose mx-8 max-w-3xl py-12 md:prose-lg lg:mx-auto">
    <div class="space-y-8">
      <div class="text-center text-xl font-semibold sm:text-2xl">Get Involved</div>
      <div>We're excited to bring Playful Again to Burning Man 2023! For an art installation of this scale, there are many financial costs that we need to cover to make this happen. We'd love to have you join our dedicated team of financial backers.</div>
      <div>Please help us bring this work to the playa by donating to our fundraising campaign.</div>
      <div class="flex justify-center pt-4">
        <button class="cta-btn bg-orange-500 text-white hover:bg-orange-400" onclick={donateNow}>
          Donate Now
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .cta-btn {
    text-transform: uppercase;
    font-weight: bold;
    padding: 12px 32px;
    border: 1px solid #f97316; /* orange-500 */
    border-radius: 5px;
  }
</style>
