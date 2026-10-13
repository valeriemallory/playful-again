<script lang="ts">
    import ImageGallery from "$lib/components/ImageGallery.svelte";
    import photoData from "$lib/data/gallery.json";
    import type { Photo } from "$lib/types.js";

    const photos = photoData as Photo[];
</script>

<svelte:head>
    <title>Gallery — Playful Again</title>
    <meta
        name="description"
        content="Photos of Playful Again, an art installation at Burning Man 2023 by Valerie Mallory and Mikell Haynes."
    />
</svelte:head>

<div class="gallery-page mt-24 lg:mt-32">
    <div
        class="prose mx-8 max-w-3xl pt-4 pb-10 lg:mx-auto lg:pb-12 md:prose-lg"
    >
        <div class="space-y-6 text-center lg:space-y-8">
            <h1 class="not-prose text-xl font-semibold sm:text-2xl">
                Playful Again at Burning Man 2023
            </h1>
        </div>
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
