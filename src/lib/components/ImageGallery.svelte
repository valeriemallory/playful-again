<script lang="ts">
    import type { Photo, PhotoCell, GalleryRow } from "$lib/types.js";
    import GalleryImage from "./GalleryImage.svelte";
    import Lightbox from "./Lightbox.svelte";

    interface Props {
        photos: Photo[];
        gap?: number;
        layout?: "justified" | "natural";
        width?: string;
        maxWidth?: string;
    }

    let { photos, gap = 5, layout = "justified", width = "100vw", maxWidth = "3000px" }: Props = $props();

    let containerEl: HTMLDivElement | undefined = $state(undefined);
    let containerWidth = $state(1200);
    let lightboxIndex = $state<number | null>(null);

    let rowHeight = $derived(
        containerWidth < 480
            ? 160
            : containerWidth < 768
              ? 200
              : containerWidth < 1280
                ? 260
                : 300,
    );

    let rows = $derived.by(() =>
        layout === "justified"
            ? computeJustifiedRows(photos, containerWidth, rowHeight, gap)
            : computeNaturalRows(photos, containerWidth, rowHeight, gap),
    );

    let flatPhotos = $derived(rows.flatMap((r) => r.photos));

    $effect(() => {
        if (!containerEl) return;
        const ro = new ResizeObserver(([entry]) => {
            containerWidth = entry.contentRect.width;
        });
        ro.observe(containerEl);
        return () => ro.disconnect();
    });

    // Justified: every row (including the last) fills exactly containerWidth.
    // A lone photo bumped to its own last row is merged back with the previous
    // row at a slightly reduced height when the result stays >= 65% of rowHeight.
    function computeJustifiedRows(
        photos: Photo[],
        width: number,
        rowHeight: number,
        gap: number,
    ): GalleryRow[] {
        if (width === 0 || photos.length === 0) return [];

        const batches: Photo[][] = [];
        let batch: Photo[] = [];
        let batchNaturalWidth = 0;

        for (const photo of photos) {
            const ar = photo.width / photo.height;
            const scaledW = rowHeight * ar;
            const gapAdd = batch.length > 0 ? gap : 0;

            if (batch.length > 0 && batchNaturalWidth + gapAdd + scaledW > width) {
                batches.push(batch);
                batch = [photo];
                batchNaturalWidth = scaledW;
            } else {
                batch.push(photo);
                batchNaturalWidth += gapAdd + scaledW;
            }
        }
        if (batch.length > 0) batches.push(batch);

        if (batches.length >= 2 && batches[batches.length - 1].length === 1) {
            const combined = [...batches[batches.length - 2], ...batches[batches.length - 1]];
            const combinedSumAR = combined.reduce((s, p) => s + p.width / p.height, 0);
            const mergedHeight = (width - (combined.length - 1) * gap) / combinedSumAR;
            if (mergedHeight >= rowHeight * 0.65) {
                batches.splice(batches.length - 2, 2, combined);
            }
        }

        return batches.map((b, i) => {
            const totalGapWidth = (b.length - 1) * gap;
            const sumAR = b.reduce((s, p) => s + p.width / p.height, 0);
            const actualHeight = (width - totalGapWidth) / sumAR;
            return {
                photos: b.map((p) => ({
                    ...p,
                    displayWidth: actualHeight * (p.width / p.height),
                    displayHeight: actualHeight,
                })),
                isLast: i === batches.length - 1,
            };
        });
    }

    // Natural: photos keep their true aspect ratio at the target rowHeight.
    // Rows vary in width and are centered. A single photo wider than the
    // container is capped at container width (object-fit: cover handles crop).
    function computeNaturalRows(
        photos: Photo[],
        width: number,
        rowHeight: number,
        gap: number,
    ): GalleryRow[] {
        if (width === 0 || photos.length === 0) return [];

        const rows: GalleryRow[] = [];
        let batch: Photo[] = [];
        let batchWidth = 0;

        for (const photo of photos) {
            const ar = photo.width / photo.height;
            const displayW = Math.min(rowHeight * ar, width);
            const gapAdd = batch.length > 0 ? gap : 0;

            if (batch.length > 0 && batchWidth + gapAdd + displayW > width) {
                rows.push(buildNaturalRow(batch, rowHeight));
                batch = [photo];
                batchWidth = displayW;
            } else {
                batch.push(photo);
                batchWidth += gapAdd + displayW;
            }
        }
        if (batch.length > 0) rows.push(buildNaturalRow(batch, rowHeight));

        return rows;
    }

    function buildNaturalRow(photos: Photo[], rowHeight: number): GalleryRow {
        return {
            photos: photos.map((p) => ({
                ...p,
                displayWidth: rowHeight * (p.width / p.height),
                displayHeight: rowHeight,
            })),
            isLast: false,
        };
    }

    function openLightbox(photo: PhotoCell) {
        const idx = flatPhotos.findIndex(
            (p) => p.id === photo.id && p.src === photo.src,
        );
        if (idx !== -1) lightboxIndex = idx;
    }
</script>

<div class="gallery" style="--gallery-width: {width}; --gallery-max-width: {maxWidth};" bind:this={containerEl}>
    {#each rows as row}
        <div
            class="gallery-row"
            class:centered={layout === "natural"}
            style="gap: {gap}px; margin-bottom: {gap}px;"
        >
            {#each row.photos as photo}
                <GalleryImage {photo} onclick={() => openLightbox(photo)} />
            {/each}
        </div>
    {/each}
</div>

{#if lightboxIndex !== null}
    <Lightbox
        photos={flatPhotos}
        startIndex={lightboxIndex}
        onclose={() => (lightboxIndex = null)}
    />
{/if}

<style>
    .gallery {
        width: var(--gallery-width);
        max-width: var(--gallery-max-width);
        margin: 0 auto;
        padding: 0 0 2rem;
        box-sizing: border-box;
    }

    .gallery-row {
        display: flex;
        align-items: flex-start;
    }

    .gallery-row.centered {
        justify-content: center;
    }
</style>
