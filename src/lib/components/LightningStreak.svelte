<script lang="ts">
  import { db } from "$lib/db";
  import { liveQuery } from "dexie";

  const streak = liveQuery(() => db.stats.get("lightning-streak"));
</script>

{#if $streak?.value || 0 > 0}
  <div class="bg-base-300 px-3 self-stretch rounded-btn flex items-center">
    <p class="font-bold">{$streak?.value} 🔥</p>
  </div>
{/if}
