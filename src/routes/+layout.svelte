<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { initTheme } from '$lib/theme.svelte.js';
  import NavBar from '$lib/components/NavBar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';

  let { children } = $props();

  // Absolute URLs for search engines and social previews. The origin is fixed so
  // Netlify deploy previews still point at the live site.
  const siteUrl = 'https://playfulagain.org';
  const previewImage = `${siteUrl}/playful_again_site_preview.jpg`;
  const previewImageAlt =
    'Playful Again at dusk on the playa at Burning Man: an ornate pavilion with a glowing canopy, surrounded by cast figures and lamp posts';
  const pageUrl = $derived(siteUrl + page.url.pathname);

  onMount(() => {
    initTheme();
  });
</script>

<svelte:head>
  {#if page.error}
    <meta name="robots" content="noindex" />
  {:else}
    <link rel="canonical" href={pageUrl} />
    <meta name="robots" content="index, follow" />
  {/if}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Playful Again" />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:image" content={previewImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="628" />
  <meta property="og:image:alt" content={previewImageAlt} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={previewImage} />
  <meta name="twitter:image:alt" content={previewImageAlt} />
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
