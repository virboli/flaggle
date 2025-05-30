<script lang="ts">
  import { streak } from "$lib/stats";
  import Streak from "$lib/components/Streak.svelte";

  import GameInput from "$lib/components/GameInput.svelte";
  import GameFeed from "$lib/components/GameFeed.svelte";
  import Confirm from "$lib/components/Confirm.svelte";

  import { generateDiff } from "$lib/diff";
  import data from "$lib/data.json";

  import { db } from "$lib/db";
  import { onMount } from "svelte";
  import { settings } from "$lib/settings";
  import { fly } from "svelte/transition";

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
    const flags =
      $settings?.identicalFlags === "true" ? data : data.filter((item) => !item.duplicate);
    const previous = parseInt(window.localStorage.getItem("unfinished-flaggle-classic") || "");
    target = previous ? flags[previous] : getRandomTarget();
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
  return {
    code: "TR",
    name: { common: "Turkey" },
    flag: "🇹🇷",
    region: "Asia",
    subregion: "Western Asia",
    borders: ["ARM", "AZE", "BGR", "GEO", "GRC", "IRN", "IRQ", "SYR"],
    area: 783562,
  };
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

<div class="flex gap-2">
  {#if $streak > 0}
    <div class="text-xl flex items-center px-1">
      <Streak value={$streak}></Streak>
    </div>
  {/if}
  <div class="flex-1">
    {#if !isGameOver}
      <GameInput on:submit={addGuess}></GameInput>
    {:else}
      <p in:fly={{ duration: 500, x: -50 }} class="font-[BigNoodleTitling] italic text-4xl">
        {target.name}
      </p>
    {/if}
  </div>
</div>
<GameFeed {items}></GameFeed>
{#if items.length > 0 && !isGameOver}
  <button
    class="font-[BigNoodleTitling] font-normal italic text-2xl text-base-content/50 hover:text-error transition-colors btn self-center"
    on:click={() => {
      confirm
        .prompt("Are you sure you want to give up?", "This will reset your streak!", "Give Up")
        .then(giveUp);
    }}>Give Up</button
  >
{:else if isGameOver}
  <button
    class="font-[BigNoodleTitling] italic text-2xl text-base-content/50 btn self-center"
    on:click={playAgain}>Play Again</button
  >
{/if}
<Confirm bind:this={confirm}></Confirm>
