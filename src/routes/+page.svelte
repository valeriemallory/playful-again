<script lang="ts">
  import Carousel from '$lib/components/Carousel.svelte';
  import ThanksForSupport from '$lib/components/ThanksForSupport.svelte';

  const heroImages = [
    {
      src: '/img/hero/hero_img_01_lg.jpg',
      srcSm: '/img/hero/hero_img_01_sm.jpg',
      alt: "Playful Again by day: an ornate pavilion topped by a dancing figure, with cast figures and lamp posts around it on the playa",
    },
    {
      src: '/img/hero/hero_img_02_lg.jpg',
      srcSm: '/img/hero/hero_img_02_sm.jpg',
      alt: "Playful Again at dusk, its canopy glowing in rainbow colors above a pool of red light",
    },
    {
      src: '/img/hero/hero_img_03_lg.jpg',
      srcSm: '/img/hero/hero_img_03_sm.jpg',
      alt: "Playful Again at night under the moon, its canopy lit in teal and purple",
    },
    {
      src: '/img/hero/hero_concept_art_01_lg.jpg',
      srcSm: '/img/hero/hero_concept_art_01_sm.jpg',
      alt: "Concept art for Playful Again: a red and blue carousel-like pavilion topped by a dancing figure on the playa",
    },
    {
      src: '/img/hero/hero_concept_art_02_lg.jpg',
      srcSm: '/img/hero/hero_concept_art_02_sm.jpg',
      alt: "Concept art for Playful Again at night, the pavilion lit by spotlights and lamp posts",
    },
  ];
</script>

<!-- Hero area: same margins as the valerie-mallory-studio home page -->
<div class="hero">
  <div class="site-container">
    <Carousel images={heroImages} intervalMs={15000} />
  </div>
</div>

<!-- Welcome -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto lg:pt-16 md:prose-lg">
  <div class="space-y-6 lg:space-y-8">
    <div class="text-center text-xl font-semibold sm:text-2xl">Welcome to Playful Again!</div>
    <div>Playful Again is a large-scale art installation coming to Burning Man 2023. The piece is an invitation to reconnect to the childlike joy and wonder that comes from the pure act of play.</div>
  </div>
</div>
<div class="container-inner mx-auto space-y-6 pt-12 pb-2">
  <div class="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
    <img class="basis-1/2" src="/img/ui/home-concept-art-01.jpg" alt="Concept art for a crouching angel figure" />
    <img class="basis-1/2" src="/img/ui/home-concept-art-02.jpg" alt="Concept art for a spinning 'human chandelier'" />
  </div>
</div>

<!-- Let’s Spin, Let’s Dance, Let’s Play! -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto md:prose-lg">
  <div class="space-y-6 lg:space-y-8">
    <div class="text-center text-xl font-semibold sm:text-2xl">Let’s Spin, Let’s Dance, Let’s Play!</div>
    <div>When we were children, we loved to play. Life was magical when we were at play — we could create anything and everything we imagined was so very real. We learned to use our hands, interact with each other and explore the world through play.</div>
    <div>Sadly, as adults we have limited time for play. We forget to be ourselves. We forget our innocence and lose the practice of seeing life without filters. We lose our connection to joy and live with the fear of expectations and criticism. Life becomes full of judgment and consequences.</div>
    <div>Playful Again is about resurrecting that dreamy, whimsical world of play and bringing us back to that magical place.</div>
  </div>
</div>
<div class="container-inner mx-auto pt-8 lg:pt-10 lg:pb-2">
  <img src="/img/ui/home-concept-playground-wide.gif" alt="Concept art of the playground with spinning figures" />
</div>

<!-- About the Installation -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto md:prose-lg">
  <div class="space-y-6 lg:space-y-8">
    <div class="text-center text-xl font-semibold sm:text-2xl">About the Installation</div>
    <div>Playful Again creates an interactive world of mythical fairy tales, wonder and play. The piece has cast figures within, a playground outside, and casts of “humanimals” with horns and wings set across the scene.</div>
    <div>Within the dome ceiling, a “human chandelier” of aerialist sculptures hang from a hoop, circling in perpetual motion, fully powered by solar energy.</div>
    <div>The walls inside will have giant paintings of acrobats. At night there will be dramatic shadow play from the solar-powered figures in perpetual motion.</div>
  </div>
</div>
<div class="container-inner mx-auto space-y-6 pt-12 pb-6">
  <div class="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
    <img class="basis-1/2" src="/img/ui/home-concept-art-03.jpg" alt="Concept art for a kneeling woman with a curly ram-like horns on her head" />
    <img class="basis-1/2" src="/img/ui/home-concept-art-04.jpg" alt="Concept art for a woman standing, unfurling a set of bat-like wings" />
  </div>
</div>

<!-- Thanks for your support -->
<div class="pt-4 lg:pt-12">
  <ThanksForSupport />
</div>

<style>
  /* 80px clears the fixed nav bar; 2.5rem/1.5rem match the studio home page padding */
  .hero {
    padding: calc(80px + 2.5rem) 1.5rem 0;
  }
</style>
