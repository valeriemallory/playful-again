<script lang="ts">
  import type { PhotoCell } from '$lib/types.js';

  interface Props {
    photo: PhotoCell;
    onclick: () => void;
  }

  let { photo, onclick }: Props = $props();
</script>

<button
  type="button"
  class="gallery-item"
  style="width: {photo.displayWidth}px; height: {photo.displayHeight}px;"
  {onclick}
  aria-label="View photo{photo.alt ? ': ' + photo.alt : ''}"
  oncontextmenu={(e) => e.preventDefault()}
>
  <img
    src={photo.src}
    alt={photo.alt || ''}
    width={Math.round(photo.displayWidth)}
    height={Math.round(photo.displayHeight)}
    loading="lazy"
    draggable="false"
    class="gallery-img"
  />
  <!-- Transparent overlay prevents right-click image URL access -->
  <div class="gallery-overlay" aria-hidden="true"></div>
</button>

<style>
  .gallery-item {
    position: relative;
    display: block;
    overflow: hidden;
    cursor: zoom-in;
    padding: 0;
    border: none;
    background: var(--border);
    flex-shrink: 0;
  }

  .gallery-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    transition: transform 0.4s ease;
  }

  .gallery-item:hover .gallery-img {
    transform: scale(1.03);
  }

  .gallery-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
</style>
