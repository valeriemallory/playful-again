<script lang="ts">
  import { page } from '$app/state';
  import { themeState, toggleTheme } from '$lib/theme.svelte.js';

  let isOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
  ];

  let pathname = $derived(page.url.pathname);

  function isActive(href: string): boolean {
    return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');
  }

  function close() {
    isOpen = false;
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

      <!-- Theme toggle + Instagram: icon-only on desktop; icon + label in the
           mobile drawer, below a separator (same layout as valerie-mallory-studio) -->
      <li class="drawer-sep lg:hidden" aria-hidden="true"></li>
      <li>
        <button
          class="nav-btn icon-btn"
          onclick={toggleTheme}
          aria-label={themeState.mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {#if themeState.mode === 'light'}
            <!-- Moon: switch to dark -->
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          {:else}
            <!-- Sun: switch to light -->
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          {/if}
          <span class="lg:hidden">Theme</span>
        </button>
      </li>
      <li>
        <a
          href="https://www.instagram.com/valerie_mallory/"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-btn icon-btn"
          onclick={close}
          aria-label="Valerie Mallory Art on Instagram"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
          </svg>
          <span class="ig-handle lg:hidden">@valerie_mallory</span>
        </a>
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
  /* Theme toggle + Instagram items */
  .icon-btn {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    text-align: left;
  }

  /* Instagram handle in the drawer: lighter and smaller than the uppercase
     links so it fits the drawer width; wraps if it still doesn't */
  .ig-handle {
    min-width: 0;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: normal;
    text-transform: none;
    overflow-wrap: anywhere;
  }

  .icon-btn svg {
    flex-shrink: 0;
  }

  @media (min-width: 1024px) {
    .icon-btn {
      width: auto;
      height: 100%;
      padding: 0.75rem 0.375rem; /* same side padding as the studio site's toggle */
    }
  }

  .drawer-sep {
    margin: 0.5rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }
</style>
