<script lang="ts">
  import NavBar from '$lib/components/NavBar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>Playful Again | Burning Man 2023</title>
  <meta name="title" content="Playful Again | Burning Man 2023" />
  <meta name="description" content="Official site of Playful Again, an art installation for Burning Man 2023 by American contemporary artists Valerie Mallory and Mikell Haynes" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://playfulagain.org/" />
  <meta property="og:title" content="Playful Again | Burning Man 2023" />
  <meta property="og:description" content="Official site of Playful Again, an art installation at Burning Man 2023 by American contemporary artists Valerie Mallory and Mikell Haynes" />
  <meta property="og:image" content="https://playfulagain.org/playful-again-concept-art.jpg" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://playfulagain.org/" />
  <meta property="twitter:title" content="Playful Again | Burning Man 2023" />
  <meta property="twitter:description" content="Official site of Playful Again, an art installation at Burning Man 2023 by American contemporary artists Valerie Mallory and Mikell Haynes" />
  <meta property="twitter:image" content="https://playfulagain.org/playful-again-concept-art.jpg" />
  <meta name="robots" content="index, follow" />
</svelte:head>

<NavBar />

<div class="overflow-hidden">
  {@render children()}
</div>

<Footer />
