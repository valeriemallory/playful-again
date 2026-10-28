<script lang="ts">
    // Layout, colors and drawer copied from valerie-mallory-studio's NavBar.svelte.
    // Nav colors come from the --nav-* vars in src/app.css (light + dark).
    import { page } from "$app/state";
    import { themeState, toggleTheme } from "$lib/theme.svelte.js";

    let isOpen = $state(false);
    let scrolled = $state(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About" },
        { href: "/team", label: "Team" },
        { href: "/contact", label: "Contact" },
    ];

    let pathname = $derived(page.url.pathname);

    function isActive(href: string): boolean {
        return href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(href + "/");
    }

    function close() {
        isOpen = false;
    }

    $effect(() => {
        if (typeof window === "undefined") return;
        const onScroll = () => {
            scrolled = window.scrollY > 20;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    });

    // Close the drawer whenever the route changes
    $effect(() => {
        pathname; // track
        isOpen = false;
    });
</script>

<svelte:window
    onkeydown={(e) => {
        if (e.key === "Escape") close();
    }}
/>

<header class="navbar" class:scrolled>
    <div class="nav-inner">
        <!-- Wordmark -->
        <a href="/" class="wordmark" aria-label="Playful Again — Home"
            >Playful Again</a
        >

        <!-- Desktop nav -->
        <nav class="nav-desktop" aria-label="Main navigation">
            {#each navLinks as link}
                <a
                    href={link.href}
                    class="nav-link"
                    class:active={isActive(link.href)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                >
                    {link.label}
                </a>
            {/each}
            <button
                class="icon-btn theme-btn"
                onclick={toggleTheme}
                aria-label={themeState.mode === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"}
            >
                {#if themeState.mode === "light"}
                    <!-- Moon: switch to dark -->
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path
                            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                        />
                    </svg>
                {:else}
                    <!-- Sun: switch to light -->
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                {/if}
            </button>
            <a
                href="https://www.instagram.com/valerie_mallory/"
                target="_blank"
                rel="noopener noreferrer"
                class="icon-btn ig-link"
                aria-label="Valerie Mallory Art on Instagram"
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
            </a>
        </nav>

        <!-- Mobile controls: burger only — the icons move into the drawer -->
        <div class="nav-mobile">
            <button
                class="burger"
                onclick={() => (isOpen = !isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
            >
                {#if isOpen}
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        aria-hidden="true"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                {:else}
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        aria-hidden="true"
                    >
                        <line x1="3" y1="8" x2="21" y2="8" />
                        <line x1="3" y1="16" x2="21" y2="16" />
                    </svg>
                {/if}
            </button>
        </div>
    </div>
</header>

<!-- Mobile drawer backdrop -->
{#if isOpen}
    <div class="drawer-backdrop" onclick={close} aria-hidden="true"></div>
{/if}

<!-- Mobile drawer -->
<nav
    id="mobile-drawer"
    class="drawer"
    class:open={isOpen}
    aria-label="Mobile navigation"
    aria-hidden={!isOpen}
    inert={!isOpen}
>
    <button class="drawer-close" onclick={close} aria-label="Close menu">
        <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    </button>

    {#each navLinks as link}
        <a
            href={link.href}
            class="drawer-link"
            class:active={isActive(link.href)}
            aria-current={isActive(link.href) ? "page" : undefined}
            onclick={close}
        >
            {link.label}
        </a>
    {/each}

    <div class="drawer-sep" aria-hidden="true"></div>

    <!-- Theme toggle -->
    <button
        class="drawer-link drawer-btn"
        onclick={toggleTheme}
        aria-label={themeState.mode === "light"
            ? "Switch to dark mode"
            : "Switch to light mode"}
    >
        {#if themeState.mode === "light"}
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        {:else}
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        {/if}
        <span>Theme</span>
    </button>

    <!-- Instagram -->
    <a
        href="https://www.instagram.com/valerie_mallory/"
        target="_blank"
        rel="noopener noreferrer"
        class="drawer-link"
        onclick={close}
        aria-label="Valerie Mallory Art on Instagram"
    >
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
        <span>@valerie_mallory</span>
    </a>
</nav>

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 40;
        height: 80px;
        padding: 0 2rem;
        background: var(--nav-bg);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: none;
        transition: box-shadow 0.2s ease;
    }

    .navbar.scrolled {
        box-shadow: var(--nav-shadow-scrolled);
    }

    .nav-inner {
        max-width: 1100px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .wordmark {
        font-family:
            "Montserrat",
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        letter-spacing: 0.025em;
        text-transform: uppercase;
        color: var(--nav-title);
        text-decoration: none;
        transition: color 0.15s ease;
        white-space: nowrap;
    }

    .wordmark:hover {
        color: var(--nav-accent);
    }

    /* Shrink wordmark when burger is visible to prevent overflow */
    @media (max-width: 949px) {
        .wordmark {
            font-size: 1.05rem;
        }
    }

    /* Desktop nav — hidden below 950px */
    .nav-desktop {
        display: none;
        align-items: center;
        gap: 2rem;
    }

    @media (min-width: 950px) {
        .nav-desktop {
            display: flex;
        }
        .nav-mobile {
            display: none !important;
        }
    }

    .nav-link {
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--nav-text);
        text-decoration: none;
        transition: color 0.15s ease;
    }

    .nav-link:hover,
    .nav-link.active {
        color: var(--nav-accent);
    }

    /* Theme toggle + Instagram icons (studio: ThemeToggle .toggle-btn + .ig-link) */
    .icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--nav-text);
        text-decoration: none;
        line-height: 1;
        border-radius: 4px;
        transition: color 0.15s ease;
    }

    .theme-btn {
        padding: 0.375rem;
    }

    .theme-btn:hover {
        color: var(--nav-title);
    }

    .ig-link {
        padding: 0.25rem;
    }

    .ig-link:hover {
        color: var(--nav-accent);
    }

    /* Mobile controls — burger only */
    .nav-mobile {
        display: flex;
        align-items: center;
    }

    .burger {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--nav-title);
        padding: 0.375rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Drawer backdrop */
    .drawer-backdrop {
        position: fixed;
        inset: 0;
        z-index: 48;
        background: rgba(0, 0, 0, 0.3);
    }

    /* Drawer panel */
    .drawer {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 49;
        width: 16rem;
        max-width: 85vw;
        height: 100vh;
        padding: 5.25rem 1rem 2rem;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    .drawer.open {
        transform: translateX(0);
    }

    .drawer-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.7);
        padding: 0.375rem;
        display: flex;
        align-items: center;
        transition: color 0.15s ease;
    }

    .drawer-close:hover {
        color: #ffffff;
    }

    .drawer-link {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.625rem 0.75rem;
        font-size: 1.125rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.75);
        text-decoration: none;
        transition: color 0.15s ease;
        border-radius: 4px;
        min-width: 0;
    }

    .drawer-link span {
        min-width: 0;
        overflow-wrap: anywhere;
    }

    .drawer-link:hover,
    .drawer-link.active {
        color: #ffffff;
    }

    /* Reset button defaults for the theme toggle in the drawer */
    .drawer-btn {
        background: none;
        border: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
        font-family: inherit;
    }

    .drawer-link svg {
        flex-shrink: 0;
    }

    .drawer-sep {
        margin: 0.5rem 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.15);
    }
</style>
