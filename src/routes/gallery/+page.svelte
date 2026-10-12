<script lang="ts">
  import ImageGallery from '$lib/components/ImageGallery.svelte';
  import photoData from '$lib/data/gallery.json';
  import type { Photo } from '$lib/types.js';

  const photos = photoData as Photo[];
</script>

<svelte:head>
  <title>Gallery — Playful Again</title>
  <meta name="description" content="Photos of Playful Again, an art installation at Burning Man 2023 by Valerie Mallory and Mikell Haynes." />
</svelte:head>

<div class="gallery-page">
  <div class="page-header">
    <h1>Gallery</h1>
    <p class="page-subtitle">Playful Again at Burning Man 2023</p>
  </div>
  <ImageGallery {photos} layout="justified" width="80vw" maxWidth="2050px" />
  <div class="back-link-wrap">
    <a href="/" class="back-link">Return to home page</a>
  </div>
</div>

<style>
  .gallery-page {
    padding-bottom: 3rem;
    min-height: 60vh;
  }

  /* margin-top clears the fixed nav bar (matches the team page's mt-20) */
  .page-header {
    margin-top: 5rem;
    text-align: center;
    padding: 3rem 1.5rem 3rem;
  }

  h1 {
    margin: 0 0 0.5rem;
    font-size: 1.75rem;
    font-weight: 300;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-primary);
  }

  .page-subtitle {
    margin: 0;
    font-size: 0.8125rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .back-link-wrap {
    display: flex;
    justify-content: center;
    padding: 2rem 1.5rem 4rem;
  }

  .back-link {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .back-link:hover {
    color: var(--accent);
  }
</style>
