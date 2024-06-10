<script lang="ts">
  import { getDeltaDay } from "$lib/date";
  import { db } from "$lib/db";
  import { liveQuery } from "dexie";
  import pluralize from "pluralize";

  const daily = liveQuery(() => db.daily.toArray());

  $: lastMissedDay = $daily?.findLastIndex(
    (result, i) => getDeltaDay(result.date) !== ($daily.length - i - 1) * -1,
  );
  $: dailyStreak = lastMissedDay === -1 ? $daily?.length : lastMissedDay - 1;
</script>

{#if dailyStreak > 0}
  <div class="bg-base-300 px-3 self-stretch rounded-btn flex items-center">
    <p class="font-bold">{dailyStreak.toLocaleString()} {pluralize("day", dailyStreak)}</p>
  </div>
{/if}
