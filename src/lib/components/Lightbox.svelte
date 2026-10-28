<script lang="ts">
  import { untrack } from 'svelte';
  import { onMount } from 'svelte';
  import type { Photo } from '$lib/types.js';
  import PhotoCredit from './PhotoCredit.svelte';

  interface Props {
    photos: Photo[];
    startIndex: number;
    onclose: () => void;
  }

  let { photos, startIndex, onclose }: Props = $props();

  // untrack: startIndex is the initial open position; we manage navigation internally
  let currentIndex = $state(untrack(() => startIndex));
  let current = $derived(photos[currentIndex]);

  let touchStartX = 0;
  let touchStartY = 0;

  function prev() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  }

  function next() {
    currentIndex = (currentIndex + 1) % photos.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'Escape') { e.preventDefault(); onclose(); }
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) onclose();
  }

  onMount(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="lb-backdrop"
  onclick={handleBackdropClick}
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
  role="dialog"
  aria-modal="true"
  aria-label="Photo viewer"
  tabindex="-1"
>
  <!-- Close -->
  <button class="lb-close" onclick={onclose} aria-label="Close photo viewer">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>

  <!-- Prev -->
  {#if photos.length > 1}
    <button class="lb-nav lb-prev" onclick={prev} aria-label="Previous photo">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <button class="lb-nav lb-next" onclick={next} aria-label="Next photo">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  {/if}

  <!-- Image -->
  <div class="lb-figure" class:has-credit={!!current.credit}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="lb-img-wrap" role="presentation" oncontextmenu={(e) => e.preventDefault()}>
      <img
        src={current.src}
        alt={current.alt || 'Artwork by Valerie Mallory'}
        class="lb-img"
        draggable="false"
      />
      <!-- Credited photos belong to another photographer, so they don't get Valerie's watermark -->
      {#if !current.credit && !current.creditUrl}
        <div class="lb-watermark" aria-hidden="true">© Valerie Mallory Art</div>
      {/if}
    </div>
    <div class="lb-credit">
      <PhotoCredit photo={current} />
    </div>
  </div>

  <!-- Counter -->
  {#if photos.length > 1}
    <div class="lb-counter" aria-live="polite" aria-atomic="true">
      {currentIndex + 1} / {photos.length}
    </div>
  {/if}
</div>

<style>
  .lb-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
  }

  .lb-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.65);
    padding: 0.5rem;
    z-index: 10;
    display: flex;
    align-items: center;
    transition: color 0.15s ease;
  }

  .lb-close:hover {
    color: #ffffff;
  }

  .lb-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.55);
    padding: 1rem 0.75rem;
    z-index: 10;
    display: flex;
    align-items: center;
    transition: color 0.15s ease;
  }

  .lb-nav:hover {
    color: #ffffff;
  }

  .lb-prev { left: 0.5rem; }
  .lb-next { right: 0.5rem; }

  .lb-figure {
    display: flex;
    flex-direction: column;
    cursor: default;
  }

  /* width: 0 + min-width: 100% keeps the credit from widening the figure past the image */
  .lb-credit {
    width: 0;
    min-width: 100%;
  }

  /* Leave room below the image for the credit line */
  .has-credit .lb-img-wrap,
  .has-credit .lb-img {
    max-height: calc(85vh - 2rem);
  }

  .lb-img-wrap {
    position: relative;
    cursor: default;
    max-width: 90vw;
    max-height: 85vh;
    user-select: none;
    -webkit-user-select: none;
  }

  .lb-img {
    display: block;
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  .lb-watermark {
    position: absolute;
    bottom: 0.625rem;
    right: 0.75rem;
    color: rgba(255, 255, 255, 0.18);
    font-size: 0.6875rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
  }

  .lb-counter {
    position: absolute;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.8125rem;
    pointer-events: none;
    white-space: nowrap;
  }

  /* Phones in landscape: the space below the image is too short for the counter,
     so it would cover the bottom of the photo */
  @media (orientation: landscape) and (max-height: 500px) {
    .lb-counter {
      display: none;
    }
  }
</style>
