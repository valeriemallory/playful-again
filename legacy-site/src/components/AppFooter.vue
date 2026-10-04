<template>
  <footer class="text-white bg-stone-500 py-10">
      <div class="container-inner flex flex-col items-center mx-auto space-y-6">
        <div class="text-sm md:text-base text-center leading-7">Copyright &copy; {{ new Date().getFullYear() }} Valerie Mallory, Mikell Haynes and Nate Williams</div>
        <SocialMediaLinks />
      </div>
  </footer>
</template>

<script>
import SocialMediaLinks from '../components/SocialMediaLinks.vue';

export default {
  name: "AppFooter",

  components: {
    SocialMediaLinks,
  },

  data: () => ({
  }),
};
</script>
