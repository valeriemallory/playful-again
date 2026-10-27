<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
  import ThanksForSupport from '$lib/components/ThanksForSupport.svelte';
  import teamData from '$lib/data/team-list.json';

  const team = teamData.team;
</script>

<PageMeta
  title="Team — Playful Again"
  description="Meet the artists, builders and crew behind Playful Again, an art installation at Burning Man 2023 by Valerie Mallory and Mikell Haynes."
/>

<!-- Hero area -->
<div class="container-inner prose mx-auto mt-20 py-12 text-center text-xl font-semibold sm:text-2xl">Team</div>

<!-- Team pics and bios -->
<div class="container-inner mx-2 sm:mx-auto">
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
    {#each team as member (member.id)}
      <div class="flex flex-col items-center pb-6 lg:pb-8">
        <img class="w-full" src={`/img/team/${member.img}`} alt={member.name} />
        <div class="prose flex justify-center pt-8 font-semibold md:prose-lg">{member.name}</div>
        <div class="prose flex justify-center pt-2 md:prose-lg md:pt-4">{member.bio}</div>
      </div>
    {/each}
  </div>
</div>

<!-- Thanks for your support -->
<div class="pt-8 lg:pt-12">
  <ThanksForSupport />
</div>
