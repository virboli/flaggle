<script lang="ts">
  import GameInput from "$lib/components/GameInput.svelte";
  import LightningFeed from "$lib/components/LightningFeed.svelte";
  import Confirm from "$lib/components/Confirm.svelte";

  import data from "$lib/data.json";

  import { db } from "$lib/db";
  import { onMount } from "svelte";

  let confirm: Confirm;

  interface Country {
    code: string;
    name: string;
  }

  interface Guess {
    name: string;
    win: boolean;
  }

  // Game state
  let target: Country;
  let items: Guess[] = [];
  let isGameOver: boolean = false;

  onMount(() => {
    const previous = parseInt(window.localStorage.getItem("unfinished-flaggle-lightning") || "");
    target = previous ? data[previous] : getRandomTarget();
  });

  async function addGuess(e: CustomEvent) {
    if (isGameOver) return;
    const country: Country = e.detail;
    const win = checkWin(country);
    const guess: Guess = {
      name: country.name,
      win: win,
    };
    items = [guess, ...items];
    if (win) {
      // Record game as win
      db.lightning.add({
        win,
        guesses: items.length,
      });
      // Increment streak
      const currentStreak = (await db.stats.get("lightning-streak"))?.value || 0;
      const maxStreak = (await db.stats.get("max-lightning-streak"))?.value || 0;
      db.stats.put({ name: "lightning-streak", value: currentStreak + 1 });
      if (currentStreak + 1 > maxStreak) {
        // Record current streak as max streak
        db.stats.put({ name: "max-lightning-streak", value: currentStreak + 1 });
      }
      // Remove unfinished game state
      window.localStorage.removeItem("unfinished-flaggle-lightning");
    }
  }

  function checkWin(guess: Country): boolean {
    if (target.code === guess.code) {
      isGameOver = true;
      return true;
    }
    return false;
  }

  function getRandomTarget(): Country {
    const max = data.length;
    const index = Math.floor(Math.random() * max);
    // Store game state
    window.localStorage.setItem("unfinished-flaggle-lightning", index.toString());
    return data[index];
  }

  function playAgain() {
    target = getRandomTarget();
    items = [];
    isGameOver = false;
  }

  function giveUp() {
    isGameOver = true;
    // Display correct answer
    // Record game as loss
    db.lightning.add({
      win: false,
      guesses: items.length,
    });
    // Reset streak to 0
    db.stats.put({ name: "lightning-streak", value: 0 });
    // Remove unfinished game state
    window.localStorage.removeItem("unfinished-flaggle-lightning");
  }
</script>

<div class="flex flex-col gap-4 w-[min(100%,800px)] mx-auto">
  {#if target}
    <div class="h-[20vw] min-h-20 max-h-48 flex justify-center">
      <img
        src="./flags/{target?.code}.png"
        alt={target?.name}
        class="bg-base-100/50 aspect-[3/2]"
      />
    </div>
  {/if}
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
  <LightningFeed {items}></LightningFeed>
  <button
    class="btn self-center"
    on:click={() => {
      confirm
        .prompt("Are you sure you want to give up?", "This will reset your streak!", "Give Up")
        .then(giveUp);
    }}>Give Up</button
  >
</div>

<Confirm bind:this={confirm}></Confirm>
