<script lang="ts">
    import type { HighlightImage } from "$lib/types.js";

    // A block of 2–9 highlight images in 1–3 justified rows: the images in each
    // row share one height and together fill the row's width, whatever their
    // aspect ratios. Usage:
    //   <HighlightImages images={highlights} rows={[2, 2]} />
    // `rows` lists how many images go in each row, in order — e.g. [2] (1x2),
    // [2, 2] (2x2), [3, 3] or [2, 2, 2] (6 images), [3, 3, 3] (3x3), [2, 1, 2].
    // Leave it out for a balanced default (up to 3 per row).
    // `gap` is one number for every screen size, or set mobile and desktop
    // separately: gap={{ mobile: 12, desktop: 24 }}. Like width/mobileWidth,
    // "mobile" means below 950px.
    interface Props {
        images: HighlightImage[];
        rows?: number[];
        /** Block width on desktop (950px and up) */
        width?: string;
        /** Block width on phones and small tablets (below 950px) */
        mobileWidth?: string;
        /** No row grows taller than this; a taller row is narrowed and centered */
        maxRowHeight?: number;
        /** Space between images, in px: one number, or { mobile, desktop }
         *  (a missing key uses the other one's value) */
        gap?: number | { mobile?: number; desktop?: number };
    }

    const DEFAULT_GAP = 5;

    let {
        images,
        rows,
        width = "60vw",
        mobileWidth = "80vw",
        maxRowHeight = 500,
        gap = DEFAULT_GAP,
    }: Props = $props();

    const desktopGap = $derived(
        typeof gap === "number" ? gap : (gap.desktop ?? gap.mobile ?? DEFAULT_GAP),
    );
    const mobileGap = $derived(
        typeof gap === "number" ? gap : (gap.mobile ?? gap.desktop ?? DEFAULT_GAP),
    );

    // Balanced default: as few rows as possible (max 3 images per row), with the
    // larger rows first — 4 → [2, 2], 5 → [3, 2], 7 → [3, 2, 2], 8 → [3, 3, 2].
    function defaultRows(count: number): number[] {
        if (count <= 3) return [count];
        const rowCount = Math.ceil(count / 3);
        const base = Math.floor(count / rowCount);
        const extra = count % rowCount;
        return Array.from({ length: rowCount }, (_, i) => base + (i < extra ? 1 : 0));
    }

    const layout = $derived.by(() => {
        if (images.length < 2 || images.length > 9) {
            console.warn(`HighlightImages: expected 2–9 images, got ${images.length}`);
        }
        const valid =
            rows &&
            rows.length >= 1 &&
            rows.length <= 3 &&
            rows.every((n) => Number.isInteger(n) && n >= 1) &&
            rows.reduce((sum, n) => sum + n, 0) === images.length;
        if (rows && !valid) {
            console.warn(
                `HighlightImages: rows [${rows.join(", ")}] must be 1–3 rows that add up to ${images.length} images; using the default layout`,
            );
        }
        const counts = valid ? rows! : defaultRows(images.length);

        let start = 0;
        return counts.map((count) => {
            const rowImages = images.slice(start, (start += count)).map((image) => ({
                ...image,
                ratio: image.width / image.height,
                ratioSm:
                    image.srcSm && image.widthSm && image.heightSm
                        ? image.widthSm / image.heightSm
                        : image.width / image.height,
            }));
            return {
                images: rowImages,
                ratioSum: rowImages.reduce((sum, i) => sum + i.ratio, 0),
                ratioSumSm: rowImages.reduce((sum, i) => sum + i.ratioSm, 0),
            };
        });
    });

    // Keep in sync with the matching @media rule in the styles below
    const PORTRAIT_PHONE = "(orientation: portrait) and (max-width: 767px)";
</script>

<!-- Each image's flex-grow and aspect-ratio are both its width/height ratio, so
     all images in a row end up the same height. A row's natural height is
     (row width - gaps) / (sum of ratios), so capping the row's width at
     maxRowHeight x (sum of ratios) + gaps caps its height without cropping. -->
<div
    class="highlight-images"
    style="--hl-width: {width}; --hl-mobile-width: {mobileWidth}; --hl-max-row-height: {maxRowHeight}px; --hl-gap-desktop: {desktopGap}px; --hl-gap-mobile: {mobileGap}px;"
>
    {#each layout as row, r (r)}
        <div
            class="highlight-row"
            style="--row-ratio: {row.ratioSum}; --row-ratio-sm: {row.ratioSumSm}; --row-gaps: {row.images.length - 1};"
        >
            {#each row.images as image (image.id)}
                <picture
                    class="highlight"
                    style="--ratio: {image.ratio}; --ratio-sm: {image.ratioSm};"
                >
                    {#if image.srcSm}
                        <source media={PORTRAIT_PHONE} srcset={image.srcSm} />
                    {/if}
                    <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        draggable="false"
                    />
                </picture>
            {/each}
        </div>
    {/each}
</div>

<style>
    .highlight-images {
        --hl-gap: var(--hl-gap-desktop);
        width: var(--hl-width);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--hl-gap);
    }

    .highlight-row {
        display: flex;
        gap: var(--hl-gap);
        width: 100%;
        max-width: calc(var(--hl-max-row-height) * var(--row-ratio) + var(--hl-gap) * var(--row-gaps));
        margin: 0 auto;
    }

    .highlight {
        display: block;
        flex: var(--ratio) 1 0;
        aspect-ratio: var(--ratio);
        min-width: 0;
        overflow: hidden;
        background: var(--border);
    }

    .highlight img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        user-select: none;
        -webkit-user-select: none;
    }

    /* Phones and small tablets: mobile width and gap (950px matches .site-container in app.css) */
    @media (max-width: 949px) {
        .highlight-images {
            --hl-gap: var(--hl-gap-mobile);
            width: var(--hl-mobile-width);
        }
    }

    /* Portrait phones: images with a small version switch to its ratio */
    @media (orientation: portrait) and (max-width: 767px) {
        .highlight-row {
            max-width: calc(var(--hl-max-row-height) * var(--row-ratio-sm) + var(--hl-gap) * var(--row-gaps));
        }

        .highlight {
            flex: var(--ratio-sm) 1 0;
            aspect-ratio: var(--ratio-sm);
        }
    }
</style>
