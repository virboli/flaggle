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

  let dailyStreak: number;

  $: $daily, (dailyStreak = calculateDailyStreak() || 0);

  function calculateDailyStreak() {
    if (!$daily) return;
    let streak: number = 0;
    for (let i = $daily.length - 1; i >= 0; i--) {
      const targetDelta = i - $daily.length + 1;
      const currentDelta = getDeltaDay($daily[i].date);
      if (targetDelta === currentDelta) streak++;
    }
    return streak;
  }

  const lightningStreak = liveQuery(() => db.stats.get("lightning-streak"));
  const maxLightningStreak = liveQuery(() => db.stats.get("max-lightning-streak"));
  const lightning = liveQuery(() => db.lightning.toArray());

  $: lightningWins = $lightning?.filter((result) => result.win).length;
  $: lightningLosses = $lightning?.filter((result) => !result.win).length;
  $: lightningAverageGuesses = $lightning
    ?.filter((result) => result.win)
    .map((result) => result.guesses);

  function average(array: number[]) {
    if (array.length === 0) return;
    return array.reduce((a, b) => a + b) / array.length;
  }
</script>

<Modal title="Statistics" bind:this={modal}>
  <h3 class="font-bold">Classic</h3>
  <div class="grid grid-cols-2 gap-y-2 mb-2">
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
  <div class="grid grid-cols-2 gap-y-2 mb-2">
    <h4>Games played</h4>
    <p>{$lightning?.length}</p>
    <h4>Games won</h4>
    <p>{lightningWins}</p>
    <h4>Games lost</h4>
    <p>{lightningLosses}</p>
    <h4>Win/Loss ratio</h4>
    <p>{((lightningWins / lightningLosses) * 100 || 0).toFixed(1)}%</p>
    <h4>Average guesses</h4>
    <p>{(lightningAverageGuesses && average(lightningAverageGuesses)?.toFixed(2)) || 0}</p>
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
