<script lang="ts">
  interface Country {
    code: string;
    name: string;
  }

  export let items: Country[] = [];
</script>

<div class="flex flex-col gap-4 my-4 overflow-auto">
  {#each items as country, i}
    <div class="relative flex h-48 bg-base-200/50 items-end rounded-box rounded-r-none">
      <p class="absolute top-0 left-0 m-4 opacity-25 text-5xl">{items.length - i}</p>
      <p class="m-4">{country.name}</p>
      <img alt={country.name} class="bg-base-100/50 h-full aspect-[3/2] ml-auto" />
      <img alt="{country.name} overlay" class="bg-base-100/50 h-full aspect-[3/2] ml-2" />
    </div>
  {/each}
</div>
