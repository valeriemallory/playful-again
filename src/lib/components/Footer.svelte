<script lang="ts">
    import SocialMediaLinks from "./SocialMediaLinks.svelte";
</script>

<footer class="bg-stone-500 py-10 text-white dark:bg-stone-700">
    <div class="container-inner mx-auto flex flex-col items-center space-y-6">
        <div class="text-center text-sm leading-7 md:text-base">
            Copyright &copy; {new Date().getFullYear()} Valerie Mallory and Nate
            Williams
        </div>
        <SocialMediaLinks />
    </div>
</footer>
