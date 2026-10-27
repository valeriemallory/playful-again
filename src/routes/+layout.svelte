<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { initTheme } from '$lib/theme.svelte.js';
  import NavBar from '$lib/components/NavBar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';

  let { children } = $props();

  const siteTitle = 'Playful Again | Burning Man 2023';
  const siteDescription =
    'Official site of Playful Again, an art installation at Burning Man 2023 by American contemporary artists Valerie Mallory and Mikell Haynes';
  const previewImage = 'https://playfulagain.org/playful-again-site-preview.jpg';

  // Each page can set its own description by returning one from its +page.ts load
  const pageUrl = $derived(`https://playfulagain.org${page.url.pathname}`);
  const description = $derived(page.data.description ?? siteDescription);

  onMount(() => {
    initTheme();
  });
</script>

<svelte:head>
  <title>{siteTitle}</title>
  {#if !page.error}
    <link rel="canonical" href={pageUrl} />
  {/if}
  <meta name="title" content={siteTitle} />
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Playful Again" />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:title" content={siteTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={previewImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="628" />
  <meta property="og:image:alt" content="Playful Again at dusk on the playa at Burning Man: an ornate pavilion with a glowing canopy, surrounded by cast figures and lamp posts" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={siteTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={previewImage} />
  <meta name="robots" content={page.error ? 'noindex' : 'index, follow'} />
  <meta name="theme-color" content="#F8F7F4" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#171717" media="(prefers-color-scheme: dark)" />
</svelte:head>

<!-- min-h-dvh + flex-1 keep the Footer at the bottom of the window on short pages (e.g. 404) -->
<div class="flex min-h-dvh flex-col">
  <NavBar />

  <div class="flex-1 overflow-hidden">
    {@render children()}
  </div>

  <Footer />
</div>
