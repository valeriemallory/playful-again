<script lang="ts">
    import PageMeta from "$lib/components/PageMeta.svelte";
    import Carousel from "$lib/components/Carousel.svelte";
    import ThanksForSupport from "$lib/components/ThanksForSupport.svelte";
    import HighlightImages from "$lib/components/HighlightImages.svelte";
    import type { HighlightImage } from "$lib/types.js";

    const heroImages = [
        {
            src: "/img/hero/hero_img_01_lg.jpg",
            srcSm: "/img/hero/hero_img_01_sm.jpg",
            alt: "Playful Again by day: an ornate pavilion topped by a dancing figure, with cast figures and lamp posts around it on the playa",
        },
        {
            src: "/img/hero/hero_img_02_lg.jpg",
            srcSm: "/img/hero/hero_img_02_sm.jpg",
            alt: "Playful Again at dusk, its canopy glowing in rainbow colors above a pool of red light",
        },
        {
            src: "/img/hero/hero_img_03_lg.jpg",
            srcSm: "/img/hero/hero_img_03_sm.jpg",
            alt: "Playful Again at night under the moon, its canopy lit in teal and purple",
        },
        {
            src: "/img/hero/hero_concept_art_01_lg.jpg",
            srcSm: "/img/hero/hero_concept_art_01_sm.jpg",
            alt: "Concept art for Playful Again: a red and blue carousel-like pavilion topped by a dancing figure on the playa",
        },
        {
            src: "/img/hero/hero_concept_art_02_lg.jpg",
            srcSm: "/img/hero/hero_concept_art_02_sm.jpg",
            alt: "Concept art for Playful Again at night, the pavilion lit by spotlights and lamp posts",
        },
    ];

    // Highlight and installation images, in display order
    const highlightImages: HighlightImage[] = [
        {
            id: "highlight-img-01",
            src: "/img/ui/highlight_img_01.jpg",
            alt: "Side view of the rusted pavilion in daylight with a torch-bearing figure on top and red steps below",
            width: 450,
            height: 450,
        },
        {
            id: "highlight-img-02",
            src: "/img/ui/highlight_img_02.jpg",
            alt: "The illuminated pavilion at dusk with its red steps, the project sign and sculptures arranged around it",
            width: 450,
            height: 450,
        },
        {
            id: "highlight-img-03",
            src: "/img/ui/highlight_img_03.jpg",
            alt: "The pavilion at twilight with lantern posts, green roof lighting and colorful light on the playa",
            width: 450,
            height: 450,
        },
        {
            id: "highlight-img-04",
            src: "/img/ui/highlight_img_04.jpg",
            alt: "A glowing dragon-shaped art car parked in front of the illuminated pavilion at night",
            width: 450,
            height: 450,
        },
    ];

    const installationImages: HighlightImage[] = [
        {
            id: "highlight-img-05",
            src: "/img/ui/highlight_img_05.jpg",
            alt: "Hooded figure holding a white orb, with a crouching fur-covered figure behind it",
            width: 300,
            height: 450,
        },
        {
            id: "highlight-img-06",
            src: "/img/ui/highlight_img_06.jpg",
            alt: "Sculpted woman with long braided hair seated in a golden alcove, partly draped in fabric",
            width: 300,
            height: 450,
        },
        {
            id: "highlight-img-07",
            src: "/img/ui/highlight_img_07.jpg",
            alt: "Close-up of a green-toned horned figure bound with green rope, holding a tall staff topped with fur and feathers",
            width: 300,
            height: 450,
        },
    ];
</script>

<PageMeta
    title="Playful Again | Burning Man 2023"
    description="Official site of Playful Again, an art installation at Burning Man 2023 by American contemporary artists Valerie Mallory and Mikell Haynes"
/>

<!-- Hero area: same margins as the valerie-mallory-studio home page -->
<div class="hero">
    <div class="site-container">
        <Carousel images={heroImages} intervalMs={15000} />
    </div>
</div>

<!-- Welcome -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto lg:pt-16 md:prose-lg">
    <div class="space-y-6 lg:space-y-8">
        <div class="text-center text-xl font-semibold sm:text-2xl">
            Welcome to Playful Again!
        </div>
        <div>
            Playful Again is a large-scale art installation created for Burning
            Man 2023. The piece is an invitation to reconnect to the childlike
            joy and wonder that comes from the pure act of play.
        </div>
    </div>
</div>
<div class="container-inner pt-8 lg:pt-12 pb-2">
    <HighlightImages
        images={highlightImages}
        rows={[2, 2]}
        width="100%"
        mobileWidth="100%"
        gap={24}
    />
</div>

<!-- Let’s Spin, Let’s Dance, Let’s Play! -->
<div class="prose mx-8 max-w-3xl pt-12 pb-6 lg:mx-auto md:prose-lg">
    <div class="space-y-6 lg:space-y-8">
        <div class="text-center text-xl font-semibold sm:text-2xl">
            Let’s Spin, Let’s Dance, Let’s Play!
        </div>
        <div>
            When we were children, we loved to play. Life was magical when we
            were at play — we could create anything and everything we imagined
            was so very real. We learned to use our hands, interact with each
            other and explore the world through play.
        </div>
        <div>
            Playful Again is about resurrecting that dreamy, whimsical world of
            play and bringing us back to that magical place.
        </div>
    </div>
</div>

<!-- Installation Images -->
<div class="container-inner pt-6 lg:pt-12 pb-8">
    <HighlightImages
        images={installationImages}
        rows={[3]}
        width="100%"
        mobileWidth="100%"
        gap={18}
    />
</div>

<!-- Thanks for your support -->
<div class="pt-4 lg:pt-12">
    <ThanksForSupport />
</div>

<style>
    /* 80px clears the fixed nav bar; 2.5rem/1.5rem match the studio home page padding */
    .hero {
        padding: calc(80px + 2.5rem) 1.5rem 0;
    }
</style>
