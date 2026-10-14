<script lang="ts">
  // Based on valerie-mallory-studio's Carousel.svelte. Difference: each image also
  // has a square "sm" crop that's used on phones/tablets held in portrait.
  interface CarouselImage {
    src: string; // 3:2 "lg" image: desktop + landscape
    srcSm: string; // 1:1 "sm" image: portrait phones/tablets
    alt: string;
  }

  interface Props {
    images: CarouselImage[];
    intervalMs?: number;
  }

  let { images, intervalMs = 20000 }: Props = $props();

  // Keep in sync with the aspect-ratio media query in the styles below.
  const PORTRAIT_QUERY = '(max-width: 949px) and (orientation: portrait)';

  let index = $state(0);
  let resetKey = $state(0);

  function next() {
    index = (index + 1) % images.length;
    resetKey++;
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    resetKey++;
  }

  $effect(() => {
    resetKey; // re-run (and restart the timer) whenever the user navigates manually
    if (images.length <= 1) return;
    const id = setInterval(() => {
      index = (index + 1) % images.length;
    }, intervalMs);
    return () => clearInterval(id);
  });
</script>

<div class="carousel" role="region" aria-label="Featured images">
  {#each images as image, i (image.src)}
    <picture>
      <source media={PORTRAIT_QUERY} srcset={image.srcSm} />
      <img
        src={image.src}
        alt={image.alt}
        class="carousel-image"
        class:active={i === index}
        draggable="false"
        loading={i === 0 ? 'eager' : 'lazy'}
      />
    </picture>
  {/each}

  {#if images.length > 1}
    <button class="carousel-nav prev" onclick={prev} aria-label="Previous image">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
    <button class="carousel-nav next" onclick={next} aria-label="Next image">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    border-radius: 4px;
    background: var(--surface);
  }

  /* Portrait phones/tablets: square frame for the square "sm" images */
  @media (max-width: 949px) and (orientation: portrait) {
    .carousel {
      aspect-ratio: 1 / 1;
    }
  }

  .carousel-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.8s ease;
    user-select: none;
    -webkit-user-select: none;
  }

  .carousel-image.active {
    opacity: 1;
  }

  .carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.35);
    color: #ffffff;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, background 0.15s ease;
    pointer-events: none;
  }

  .carousel:hover .carousel-nav {
    opacity: 1;
    pointer-events: auto;
  }

  .carousel-nav:hover {
    background: rgba(0, 0, 0, 0.55);
  }

  .carousel-nav.prev {
    left: 1rem;
  }

  .carousel-nav.next {
    right: 1rem;
  }

  @media (max-width: 640px) {
    .carousel-nav {
      width: 2.25rem;
      height: 2.25rem;
    }
  }
</style>
