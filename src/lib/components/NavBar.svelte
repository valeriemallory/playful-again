<script lang="ts">
  import { page } from '$app/state';

  let isOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/team', label: 'Team' },
  ];

  let pathname = $derived(page.url.pathname);

  function isActive(href: string): boolean {
    return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');
  }

  function close() {
    isOpen = false;
  }

  function donateNow() {
    window.open('https://www.gofundme.com/f/playful-again-burningman-2023', '_blank', 'noopener,noreferrer');
  }

  // Close the mobile drawer whenever the route changes
  $effect(() => {
    pathname; // track
    isOpen = false;
  });
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') close(); }} />

<header class="fixed top-0 left-0 z-40 w-full bg-neutral-700/50">
  <nav class="container-inner mx-auto flex flex-wrap items-center justify-between">
    <a href="/" onclick={close}>
      <div class="py-6 text-center text-xl font-semibold text-white sm:text-2xl lg:px-4 lg:py-6">
        Playful Again
      </div>
    </a>

    <!-- Burger / close button — mobile only -->
    <div class="relative z-30 block lg:hidden">
      <button
        onclick={() => (isOpen = !isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        class="flex items-center"
      >
        {#if isOpen}
          <svg class="h-8 w-8 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        {:else}
          <svg class="h-6 w-6 fill-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        {/if}
      </button>
    </div>

    <ul
      id="mobile-nav"
      class="nav-btn-container space-y-2 pb-4 font-bold tracking-wide uppercase lg:flex lg:space-y-0 lg:pb-0"
      class:open={isOpen}
    >
      {#each navLinks as link}
        <li>
          <a href={link.href} onclick={close} aria-current={isActive(link.href) ? 'page' : undefined}>
            <div class="nav-btn px-4 py-2 lg:py-3" class:active={isActive(link.href)}>{link.label}</div>
          </a>
        </li>
      {/each}
      <li>
        <button onclick={donateNow} class="nav-btn block w-full px-4 py-2 text-left font-bold tracking-wide uppercase lg:w-auto lg:border lg:border-white lg:py-3">
          Donate
        </button>
      </li>
    </ul>
  </nav>
</header>

<!-- Drawer backdrop (mobile only) -->
{#if isOpen}
  <div class="drawer-backdrop lg:hidden" onclick={close} aria-hidden="true"></div>
{/if}

<style>
  .nav-btn-container {
    font-size: 1rem;
    flex: 1 1 auto;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media (max-width: 1023px) {
    .nav-btn-container:not(.open) {
      display: none;
    }

    .nav-btn-container.open {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 20;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      width: 14rem;
      height: 100vh;
      padding: 4.25rem 0.625rem 2rem;
      font-size: 1.25rem;
      background-color: rgba(0, 0, 0, 0.75);
    }
  }

  .drawer-backdrop {
    position: fixed;
    inset: 0;
    z-index: 30;
    background: rgba(0, 0, 0, 0.3);
  }

  .nav-btn {
    color: white;
    transition: background-color 0.15s ease;
  }

  .nav-btn:hover,
  .nav-btn.active {
    background-color: rgba(115, 115, 115, 0.7); /* neutral-500 */
  }
</style>
