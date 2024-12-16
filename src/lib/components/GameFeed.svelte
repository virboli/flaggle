<script lang="ts">
  import { settings } from "$lib/settings";

  interface Country {
    code: string;
    name: string;
  }

  interface Guess extends Country {
    diff?: string;
    win?: boolean;
  }

  export let items: Guess[] = [];
</script>

<div class="flex flex-col gap-4 overflow-auto">
  {#each items as guess, i}
    <div
      class="relative flex h-[20vw] min-h-20 max-h-48 bg-base-200/50 items-end rounded-box rounded-r-none {guess.win
        ? 'bg-gradient-to-r from-accent via-base-200 to-base-200'
        : ''}"
    >
      <p class="absolute top-0 left-0 m-4 text-5xl">
        <span class="font-[BigNoodleTitling] italic text-base-content/25"
          >{guess.diff ? items.length - i : "Answer"}</span
        >
        {guess.win ? " 👑" : ""}
      </p>
      <p class="m-4">{guess.name}</p>
      <img
        src="./flags/{guess.code}.png"
        alt={guess.name}
        class="bg-base-100/50 h-full aspect-[3/2] ml-auto"
      />
      {#if guess.diff}
        <img
          src={guess.diff}
          alt="{guess.name} diff"
          class="{$settings.diffDarkBg === 'true'
            ? 'bg-[#1a1a1a]'
            : 'bg-base-100/50'} h-full aspect-[3/2] ml-2"
        />
      {/if}
    </div>
  {/each}
</div>
