<script lang="ts">
  interface Guess {
    name: string;
    win: boolean;
  }

  export let items: Guess[] = [];
</script>

<div class="flex flex-col gap-2 overflow-auto">
  {#each Array(6) as _, i}
    {@const guess = items[i]}
    {#if guess}
      <div
        class="flex items-center justify-center bg-base-200/50 rounded-btn h-8 gap-4"
        class:correct={guess?.win}
        class:incorrect={!guess?.win}
      >
        <p>{guess.name}</p>
      </div>
    {:else}
      <div class="flex items-center justify-center bg-base-200/50 rounded-btn h-8 gap-4"></div>
    {/if}
  {/each}
</div>

<style>
  .correct {
    @apply bg-primary text-primary-content;
  }
  .incorrect {
    @apply bg-base-300;
  }
</style>
