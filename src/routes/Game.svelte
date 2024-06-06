<script lang="ts">
  import GameInput from "./GameInput.svelte";
  import GameFeed from "./GameFeed.svelte";

  import { generateDiff } from "$lib/diff";

  import data from "$lib/data.json";

  interface Country {
    code: string;
    name: string;
  }

  interface Guess extends Country {
    diff?: string;
    win?: boolean;
  }

  // Game state
  let target = getRandomTarget();
  let items: Guess[] = [];
  let isGameOver: boolean = false;
  let streak: number = 0;

  async function addGuess(e: CustomEvent) {
    if (isGameOver) return;
    const country: Country = e.detail;
    const diff = await generateDiff(country, target);
    const win = checkWin(country);
    const guess: Guess = {
      code: country.code,
      name: country.name,
      diff: diff,
      win: win,
    };
    items = [guess, ...items];
  }

  function checkWin(guess: Country): boolean {
    if (target.code === guess.code) {
      isGameOver = true;
      streak++;
      return true;
    }
    return false;
  }

  function getRandomTarget(): Country {
    const max = data.length;
    const index = Math.floor(Math.random() * max);
    return data[index];
  }

  function playAgain() {
    target = getRandomTarget();
    items = [];
    isGameOver = false;
  }

  function giveUp() {
    isGameOver = true;
    streak = 0;
    // Display correct answer
    const guess: Guess = {
      code: target.code,
      name: target.name,
    };
    items = [guess, ...items];
  }
</script>

{#if streak > 0}
  <p class="fixed z-20 top-0 left-0 px-3 py-2 bg-base-300 rounded-btn m-2 font-bold">{streak}</p>
{/if}
<div class="flex flex-col gap-4 w-[min(100%,800px)] mx-auto">
  <GameInput
    on:submit={addGuess}
    on:enterkey={() => {
      if (isGameOver) {
        playAgain();
      }
    }}
  ></GameInput>
  {#if isGameOver}
    <button class="btn self-center" on:click={playAgain}>Play Again</button>
  {/if}
  <GameFeed {items}></GameFeed>
  {#if items.length > 0 && !isGameOver}
    <button class="btn self-center" on:click={giveUp}>Give Up</button>
  {/if}
</div>
