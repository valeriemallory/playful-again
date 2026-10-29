<script lang="ts">
    import PageMeta from "$lib/components/PageMeta.svelte";
    import ThanksForSupport from "$lib/components/ThanksForSupport.svelte";
    import HighlightImages from "$lib/components/HighlightImages.svelte";
    import type { HighlightImage } from "$lib/types.js";

    // Highlight images below the About the Installation and Design sections, in display order
    const aboutImages: HighlightImage[] = [
        {
            id: "about-img-01",
            src: "/img/ui/about_img_01.jpg",
            alt: "Front view of Playful Again at dusk, with the moon rising and sculptures kneeling and doing the splits at its base",
            width: 450,
            height: 450,
        },
        {
            id: "about-img-02",
            src: "/img/ui/about_img_02.jpg",
            alt: "A cloth-draped figure suspended from the lattice dome inside the pavilion, seen from below",
            width: 450,
            height: 450,
        },
        {
            id: "about-img-03",
            src: "/img/ui/about_img_03.jpg",
            alt: "Painted portraits of two women framing the arched doorway, with a sculpture visible on the playa at sunset",
            width: 563,
            height: 450,
        },
        {
            id: "about-img-04",
            src: "/img/ui/about_img_04.jpg",
            alt: "Night view of the horned figure with its fur-topped staff, lit green, with the moon and city lights behind",
            width: 300,
            height: 450,
        },
    ];

    const designImages: HighlightImage[] = [
        {
            id: "concept-art-01",
            src: "/img/ui/playful_again_concept_art_01.jpg",
            alt: "Sepia drawing of a nude woman with large bat-like wings",
            width: 450,
            height: 450,
        },
        {
            id: "concept-art-02",
            src: "/img/ui/playful_again_concept_art_02.jpg",
            alt: "Concept art for a spinning 'human chandelier'",
            width: 300,
            height: 450,
        },
        {
            id: "concept-art-03",
            src: "/img/ui/playful_again_concept_art_03.jpg",
            alt: "Concept art for a kneeling woman with a curly ram-like horns on her head",
            width: 300,
            height: 450,
        },
        {
            id: "concept-art-04",
            src: "/img/ui/playful_again_concept_art_04.jpg",
            alt: "Concept art of the wooden, pagoda-style pavilion at night on the playa",
            width: 450,
            height: 450,
        },
        {
            id: "concept-art-05",
            src: "/img/ui/playful_again_concept_art_05.jpg",
            alt: "Concept art of Playful Again at night, the pavilion lit by spotlights and lamp posts",
            width: 450,
            height: 450,
        },
    ];
</script>

<PageMeta
    title="About — Playful Again"
    description="About Playful Again, a large-scale interactive art installation at Burning Man 2023 that invites us to reconnect with the joy of play."
/>

<!-- About the Installation -->
<div
    class="prose mx-8 mt-24 max-w-3xl py-4 pb-6 lg:mx-auto lg:mt-32 md:prose-lg"
>
    <div class="space-y-6 lg:space-y-8">
        <h1 class="not-prose text-center text-xl font-semibold sm:text-2xl">
            About the Installation
        </h1>
        <div>
            Playful Again is a large-scale art installation created for Burning
            Man 2023 by artist and sculptor Valerie Mallory and illustrator and
            concept designer Mikell Haynes.
        </div>
        <div>
            Inspired by the spirit of childhood, the piece invites us to set
            aside the cares of adulthood and rediscover the simple delight of
            playing for its own sake.
        </div>
    </div>
</div>
<div class="container-inner pt-12 pb-2">
    <HighlightImages
        images={aboutImages}
        rows={[2, 2]}
        width="100%"
        mobileWidth="100%"
        gap={{ mobile: 12, desktop: 24 }}
    />
</div>

<!-- Philosophy -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto md:prose-lg">
    <div class="space-y-6 lg:space-y-8">
        <div class="text-center text-xl font-semibold sm:text-2xl">
            Philosophy
        </div>
        <div>
            Think back to childhood, when play was the center of our world. Sand
            could become a castle, a backyard a faraway kingdom, and whatever we
            dreamed up felt completely real. Play was how we learned — how we
            discovered what our hands could do, how we connected with one
            another, and how we came to understand the world around us.
        </div>
        <div>
            Sadly, as we grow older, play slips quietly out of our lives. We
            forget how to simply be ourselves. We lose our innocence and the
            practice of seeing life without filters. Our connection to joy
            fades, replaced by the fear of expectations and criticism, and life
            becomes weighed down by judgment and consequences.
        </div>
        <div>
            Playful Again is an invitation to reconnect to the childlike joy and
            wonder that comes from the pure act of play, bringing us back to
            that magical place.
        </div>
    </div>
</div>
<div class="container-inner mx-auto pt-8 lg:pt-10 lg:pb-2">
    <!-- Square version for phones in portrait, wide version otherwise -->
    <picture>
        <source
            media="(orientation: portrait) and (max-width: 767px)"
            srcset="/img/ui/playful_again_concept_playground_square.gif"
        />
        <img
            src="/img/ui/playful_again_concept_playground_wide.gif"
            alt="Concept art of the playground with spinning figures"
        />
    </picture>
</div>

<!-- Whimsical World of Play -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto md:prose-lg">
    <div class="space-y-6 lg:space-y-8">
        <div class="text-center text-xl font-semibold sm:text-2xl">
            Whimsical World of Play
        </div>
        <div>
            Playful Again creates an interactive world of mythical fairy tales,
            wonder and play. The piece has cast figures within, a playground
            outside, and casts of “humanimals” with horns and wings set across
            the scene.
        </div>
        <div>
            Within the dome ceiling, a “human chandelier” of aerialist
            sculptures hang from a hoop, circling in perpetual motion, fully
            powered by solar energy.
        </div>
        <div>
            The walls inside have giant paintings of acrobats and performers. At
            night, ornate figures in perpetual motion create dramatic shadow
            play throughout the space.
        </div>
    </div>
</div>
<div class="container-inner pt-12 pb-6">
    <HighlightImages
        images={designImages}
        rows={[3, 2]}
        width="100%"
        mobileWidth="100%"
        gap={{ mobile: 12, desktop: 24 }}
    />
</div>

<!-- Thanks for your support -->
<div class="pt-4 lg:pt-12">
    <ThanksForSupport />
</div>
