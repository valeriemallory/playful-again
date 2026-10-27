<script lang="ts">
  // Per-page title + description, mirrored into the Open Graph / Twitter tags.
  // Site-wide tags (canonical, og:url, og:image, robots...) live in +layout.svelte.
  let { title, description }: { title: string; description: string } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
</svelte:head>
