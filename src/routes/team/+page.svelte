<script lang="ts">
  import DonateNow from '$lib/components/DonateNow.svelte';
  import teamData from '$lib/data/team-list.json';

  const team = teamData.team;
</script>

<svelte:head>
  <title>Team — Playful Again</title>
</svelte:head>

<!-- Hero area -->
<div class="container-inner prose mx-auto mt-20 py-12 text-center text-xl font-semibold sm:text-2xl">Team</div>

<!-- Team pics and bios -->
<div class="container-inner mx-2 sm:mx-auto">
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
    {#each team as member (member.id)}
      <div class="flex flex-col items-center pb-6 lg:pb-8">
        <img class="w-full" src={`/img/${member.img}`} alt={member.name} />
        <div class="prose flex justify-center pt-8 font-semibold md:prose-lg">{member.name}</div>
        <div class="prose flex justify-center pt-2 md:prose-lg md:pt-4">{member.bio}</div>
      </div>
    {/each}
  </div>
</div>

<!-- Donate Now -->
<div class="pt-8 lg:pt-12">
  <DonateNow />
</div>
