<script lang="ts">
  import ThanksForSupport from '$lib/components/ThanksForSupport.svelte';
  import HighlightImages from '$lib/components/HighlightImages.svelte';
  import type { HighlightImage } from '$lib/types.js';

  // Highlight images below the About the Installation and Design sections, in display order
  const aboutImages: HighlightImage[] = [
    {
      id: 'concept-art-01',
      src: '/img/ui/home-concept-art-01.jpg',
      alt: 'Concept art for a crouching angel figure',
      width: 450,
      height: 450,
    },
    {
      id: 'concept-art-02',
      src: '/img/ui/home-concept-art-02.jpg',
      alt: "Concept art for a spinning 'human chandelier'",
      width: 450,
      height: 450,
    },
  ];

  const designImages: HighlightImage[] = [
    {
      id: 'concept-art-03',
      src: '/img/ui/home-concept-art-03.jpg',
      alt: 'Concept art for a kneeling woman with a curly ram-like horns on her head',
      width: 450,
      height: 450,
    },
    {
      id: 'concept-art-04',
      src: '/img/ui/home-concept-art-04.jpg',
      alt: 'Concept art for a woman standing, unfurling a set of bat-like wings',
      width: 450,
      height: 450,
    },
  ];
</script>

<svelte:head>
  <title>About — Playful Again</title>
</svelte:head>

<!-- About the Installation -->
<div class="prose mx-8 mt-24 max-w-3xl py-4 pb-6 lg:mx-auto lg:mt-32 md:prose-lg">
  <div class="space-y-6 lg:space-y-8">
    <h1 class="not-prose text-center text-xl font-semibold sm:text-2xl">About the Installation</h1>
    <div>Playful Again is a large-scale art installation coming to Burning Man 2023. The piece is an invitation to reconnect to the childlike joy and wonder that comes from the pure act of play.</div>
  </div>
</div>
<div class="container-inner pt-12 pb-2">
  <HighlightImages images={aboutImages} rows={[2]} width="100%" mobileWidth="100%" gap={24} />
</div>

<!-- Philosophy -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto md:prose-lg">
  <div class="space-y-6 lg:space-y-8">
    <div class="text-center text-xl font-semibold sm:text-2xl">Philosophy</div>
    <div>When we were children, we loved to play. Life was magical when we were at play — we could create anything and everything we imagined was so very real. We learned to use our hands, interact with each other and explore the world through play.</div>
    <div>Sadly, as adults we have limited time for play. We forget to be ourselves. We forget our innocence and lose the practice of seeing life without filters. We lose our connection to joy and live with the fear of expectations and criticism. Life becomes full of judgment and consequences.</div>
    <div>Playful Again is about resurrecting that dreamy, whimsical world of play and bringing us back to that magical place.</div>
  </div>
</div>
<div class="container-inner mx-auto pt-8 lg:pt-10 lg:pb-2">
  <img src="/img/ui/home-concept-playground-wide.gif" alt="Concept art of the playground with spinning figures" />
</div>

<!-- Design -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto md:prose-lg">
  <div class="space-y-6 lg:space-y-8">
    <div class="text-center text-xl font-semibold sm:text-2xl">Design</div>
    <div>Playful Again creates an interactive world of mythical fairy tales, wonder and play. The piece has cast figures within, a playground outside, and casts of “humanimals” with horns and wings set across the scene.</div>
    <div>Within the dome ceiling, a “human chandelier” of aerialist sculptures hang from a hoop, circling in perpetual motion, fully powered by solar energy.</div>
    <div>The walls inside will have giant paintings of acrobats. At night there will be dramatic shadow play from the solar-powered figures in perpetual motion.</div>
  </div>
</div>
<div class="container-inner pt-12 pb-6">
  <HighlightImages images={designImages} rows={[2]} width="100%" mobileWidth="100%" gap={24} />
</div>

<!-- Thanks for your support -->
<div class="pt-4 lg:pt-12">
  <ThanksForSupport />
</div>
