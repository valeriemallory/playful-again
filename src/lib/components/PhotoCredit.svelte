<script lang="ts">
  import type { Photo } from '$lib/types.js';

  interface Props {
    photo: Photo;
  }

  let { photo }: Props = $props();
</script>

<!-- Shown below the photo in the Lightbox (on its dark backdrop), never over the photo -->
{#if photo.credit}
  <p class="photo-credit">
    Photo by
    {#if photo.creditUrl}
      <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer">{photo.credit}</a>
    {:else}
      <span class="name">{photo.credit}</span>
    {/if}
  </p>
{/if}

<style>
  .photo-credit {
    margin: 0;
    padding-top: 0.5rem;
    font-size: 0.8125rem;
    line-height: 1.4;
    letter-spacing: 0.03em;
    text-align: right;
    color: rgba(255, 255, 255, 0.5);
  }

  .name,
  a {
    color: rgba(255, 255, 255, 0.85);
  }

  a {
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
    text-underline-offset: 0.2em;
    transition: text-decoration-color 0.15s ease;
  }

  a:hover,
  a:focus-visible {
    text-decoration-color: currentColor;
  }
</style>
