<script lang="ts">
  import { getDeltaDay } from "$lib/date";
  import { db } from "$lib/db";
  import { liveQuery } from "dexie";
  import pluralize from "pluralize";

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
</script>

{#if dailyStreak > 0}
  <div class="bg-base-300 px-3 self-stretch rounded-btn flex items-center">
    <p class="font-bold">{dailyStreak.toLocaleString()} {pluralize("day", dailyStreak)}</p>
  </div>
{/if}
