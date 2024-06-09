<script lang="ts">
  import Modal from "./Modal.svelte";

  import { db } from "$lib/db";
  import { liveQuery } from "dexie";

  import { getDeltaDay } from "$lib/date";

  let modal: Modal;

  export function show() {
    modal.show();
  }

  const streak = liveQuery(() => db.stats.get("streak"));
  const maxStreak = liveQuery(() => db.stats.get("max-streak"));
  const classic = liveQuery(() => db.classic.toArray());

  $: classicWins = $classic?.filter((result) => result.win).length;
  $: classicLosses = $classic?.filter((result) => !result.win).length;
  $: averageGuesses = $classic?.filter((result) => result.win).map((result) => result.guesses);

  const daily = liveQuery(() => db.daily.toArray());

  $: lastMissedDay = $daily?.findLastIndex(
    (result, i) => getDeltaDay(result.date) !== ($daily.length - i - 1) * -1,
  );
  $: dailyStreak = lastMissedDay === -1 ? $daily?.length : lastMissedDay - 1;

  const lightningStreak = liveQuery(() => db.stats.get("lightning-streak"));
  const maxLightningStreak = liveQuery(() => db.stats.get("max-lightning-streak"));

  function average(array: number[]) {
    if (array.length === 0) return;
    return array.reduce((a, b) => a + b) / array.length;
  }
</script>

<Modal title="Stats" bind:this={modal}>
  <h3 class="font-bold">Classic</h3>
  <div class="grid grid-cols-2 gap-y-2">
    <h4>Games played</h4>
    <p>{$classic?.length}</p>
    <h4>Games won</h4>
    <p>{classicWins}</p>
    <h4>Games lost</h4>
    <p>{classicLosses}</p>
    <h4>Win/Loss ratio</h4>
    <p>{((classicWins / classicLosses) * 100 || 0).toFixed(1)}%</p>
    <h4>Average guesses</h4>
    <p>{(averageGuesses && average(averageGuesses)?.toFixed(2)) || 0}</p>
    <h4>Current streak</h4>
    <p>{$streak?.value || 0}</p>
    <h4>Highest streak</h4>
    <p>{$maxStreak?.value || 0}</p>
  </div>
  <h3 class="font-bold">Lightning</h3>
  <div class="grid grid-cols-2 gap-y-2">
    <h4>Current streak</h4>
    <p>{$lightningStreak?.value || 0}</p>
    <h4>Highest streak</h4>
    <p>{$maxLightningStreak?.value || 0}</p>
  </div>
  <h3 class="font-bold">Daily</h3>
  <div class="grid grid-cols-2 gap-y-2">
    <h4>Current streak</h4>
    <p>{dailyStreak}</p>
  </div>
</Modal>
