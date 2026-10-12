<script lang="ts">
  interface Props {
    count?: number;
    intervalMs?: number;
  }

  let { count = 4, intervalMs = 15000 }: Props = $props();

  let index = $state(0);

  function num(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  function next() {
    index = (index + 1) % count;
  }

  function prev() {
    index = (index - 1 + count) % count;
  }

  $effect(() => {
    index; // restart the timer whenever the user navigates manually
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  });
</script>

<div class="carousel-image-container relative h-96 w-screen lg:h-screen" role="region" aria-label="Concept art for Playful Again">
  {#key index}
    <picture>
      <source media="(max-width: 650px)" srcset={`/img/ui/hero-${num(index)}-sm.jpg`} />
      <img
        src={`/img/ui/hero-${num(index)}-lg.jpg`}
        alt="Concept art for Playful Again"
        class="absolute h-full w-full object-cover"
      />
    </picture>
  {/key}

  <div class="carousel-nav-btns absolute top-1/2 left-0 -translate-y-1/2">
    <button onclick={prev} class="carousel-nav" aria-label="Previous image">
      <svg class="h-16 w-12 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>
  </div>
  <div class="carousel-nav-btns absolute top-1/2 right-0 -translate-y-1/2">
    <button onclick={next} class="carousel-nav" aria-label="Next image">
      <svg class="h-16 w-12 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </button>
  </div>
</div>

<style>
  /* only show the carousel nav buttons on hover, and only on non-touch/desktop widths */
  @media (min-width: 1024px) {
    .carousel-image-container:hover .carousel-nav-btns {
      display: flex;
    }
  }

  .carousel-image-container .carousel-nav-btns {
    display: none;
  }

  .carousel-nav {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
  }

  .carousel-nav:hover {
    opacity: 0.5;
  }
</style>
