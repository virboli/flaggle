<script lang="ts">
  import pluralize from "pluralize";

  import { dailyStreak } from "$lib/stats";
</script>

{#if $dailyStreak > 0}
  <div class="bg-base-300 px-3 self-stretch rounded-btn flex items-center">
    <p class="font-bold">{$dailyStreak.toLocaleString()} {pluralize("day", $dailyStreak)}</p>
  </div>
{/if}
