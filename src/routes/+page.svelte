<script lang="ts">
  import GameInput from "$lib/components/GameInput.svelte";
  import GameFeed from "$lib/components/GameFeed.svelte";
  import Confirm from "$lib/components/Confirm.svelte";

  import { generateDiff } from "$lib/diff";
  import data from "$lib/data.json";

  import { db } from "$lib/db";
  import { onMount } from "svelte";

  let confirm: Confirm;

  interface Country {
    code: string;
    name: string;
  }

  interface Guess extends Country {
    diff?: string;
    win?: boolean;
  }

  // Game state
  let target: Country;
  let items: Guess[] = [];
  let isGameOver: boolean = false;

  onMount(() => {
    const previous = parseInt(window.localStorage.getItem("unfinished-flaggle-classic") || "");
    target = previous ? data[previous] : getRandomTarget();
    // Play again on enter
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && isGameOver) {
        e.preventDefault();
        playAgain();
      }
    });
  });

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
    if (win) {
      // Record game as win
      db.classic.add({
        win,
        guesses: items.length,
      });
      // Increment streak
      const currentStreak = (await db.stats.get("streak"))?.value || 0;
      const maxStreak = (await db.stats.get("max-streak"))?.value || 0;
      db.stats.put({ name: "streak", value: currentStreak + 1 });
      if (currentStreak + 1 > maxStreak) {
        // Record current streak as max streak
        db.stats.put({ name: "max-streak", value: currentStreak + 1 });
      }
      // Remove unfinished game state
      window.localStorage.removeItem("unfinished-flaggle-classic");
      // Mark game as over
      isGameOver = true;
    }
  }

  function checkWin(guess: Country): boolean {
    if (target.code === guess.code) {
      return true;
    }
    return false;
  }

  function getRandomTarget(): Country {
    const max = data.length;
    const index = Math.floor(Math.random() * max);
    // Store game state
    window.localStorage.setItem("unfinished-flaggle-classic", index.toString());
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
    const guess: Guess = {
      code: target.code,
      name: target.name,
    };
    // Record game as loss
    db.classic.add({
      win: false,
      guesses: items.length,
    });
    // Reset streak to 0
    db.stats.put({ name: "streak", value: 0 });
    items = [guess, ...items];
    // Remove unfinished game state
    window.localStorage.removeItem("unfinished-flaggle-classic");
  }
</script>

<div class="flex flex-col gap-4 w-[min(100%,800px)] mx-auto">
  {#if !isGameOver}
    <GameInput on:submit={addGuess}></GameInput>
  {:else}
    <button class="btn self-center" on:click={playAgain}>Play Again</button>
  {/if}
  <GameFeed {items}></GameFeed>
  {#if items.length > 0 && !isGameOver}
    <button
      class="btn self-center"
      on:click={() => {
        confirm
          .prompt("Are you sure you want to give up?", "This will reset your streak!", "Give Up")
          .then(giveUp);
      }}>Give Up</button
    >
  {/if}
</div>

<Confirm bind:this={confirm}></Confirm>
