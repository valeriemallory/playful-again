<script lang="ts">
    import PageMeta from "$lib/components/PageMeta.svelte";
    import ContactForm from "$lib/components/ContactForm.svelte";
</script>

<PageMeta
    title="Contact — Playful Again"
    description="Get in touch with the team behind Playful Again, an art installation at Burning Man 2023 by Valerie Mallory and Mikell Haynes."
/>

<div class="prose mx-8 mt-24 max-w-3xl py-4 lg:mx-auto lg:mt-32 md:prose-lg">
    <div class="space-y-6 text-center lg:space-y-8">
        <h1 class="not-prose text-xl font-semibold sm:text-2xl">Contact</h1>
        <div>Want to get in touch? We'd love to hear from you.</div>
        <div>
            Or email us directly at:
            <a
                class="font-base text-orange-600 dark:text-orange-400"
                href="mailto:valerie@valeriemallory.com"
                >valerie@valeriemallory.com</a
            >
        </div>
    </div>
</div>

<div class="mx-8 max-w-3xl pt-6 pb-16 lg:mx-auto lg:pb-24">
    <div class="mx-auto max-w-2xl">
        <ContactForm />
    </div>
</div>
