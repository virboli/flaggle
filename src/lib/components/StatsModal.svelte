<script lang="ts">
  import Modal from "./Modal.svelte";

  import LucideCalendarDays from "~icons/lucide/calendar-days";
  import LucideFlag from "~icons/lucide/flag";
  import LucideZap from "~icons/lucide/zap";

  import {
    classic,
    classicWins,
    classicLosses,
    classicAverageGuesses,
    streak,
    maxStreak,
    lightning,
    lightningWins,
    lightningLosses,
    lightningAverageGuesses,
    lightningStreak,
    maxLightningStreak,
    dailyStreak,
  } from "$lib/stats";

  let modal: Modal;

  export function show() {
    modal.show();
  }
</script>

<Modal title="Statistics" bind:this={modal}>
  <h3 class="font-bold text-xl inline-flex gap-2 items-center">
    <LucideCalendarDays></LucideCalendarDays>Daily
  </h3>
  <div class="grid grid-cols-2 gap-y-2 mb-4 pl-3 border-l-2">
    <h4>Current streak</h4>
    <p>{$dailyStreak}</p>
  </div>
  <h3 class="font-bold text-xl inline-flex gap-2 items-center"><LucideFlag></LucideFlag>Classic</h3>
  <div class="grid grid-cols-2 gap-y-2 mb-4 pl-3 border-l-2">
    <h4>Games played</h4>
    <p>{$classic?.length || 0}</p>
    <h4>Games won</h4>
    <p>{$classicWins}</p>
    <h4>Games lost</h4>
    <p>{$classicLosses}</p>
    <h4>Win/Loss ratio</h4>
    <p>{(($classicWins / $classicLosses) * 100 || 0).toFixed(1)}%</p>
    <h4>Average guesses</h4>
    <p>{$classicAverageGuesses}</p>
    <h4>Current streak</h4>
    <p>{$streak}</p>
    <h4>Highest streak</h4>
    <p>{$maxStreak}</p>
  </div>
  <h3 class="font-bold text-xl inline-flex gap-2 items-center"><LucideZap></LucideZap>Lightning</h3>
  <div class="grid grid-cols-2 gap-y-2 pl-3 border-l-2">
    <h4>Games played</h4>
    <p>{$lightning?.length || 0}</p>
    <h4>Games won</h4>
    <p>{$lightningWins}</p>
    <h4>Games lost</h4>
    <p>{$lightningLosses}</p>
    <h4>Win/Loss ratio</h4>
    <p>{(($lightningWins / $lightningLosses) * 100 || 0).toFixed(1)}%</p>
    <h4>Average guesses</h4>
    <p>{$lightningAverageGuesses}</p>
    <h4>Current streak</h4>
    <p>{$lightningStreak}</p>
    <h4>Highest streak</h4>
    <p>{$maxLightningStreak}</p>
  </div>
</Modal>
