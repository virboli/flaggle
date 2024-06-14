<script lang="ts">
  import { lightningStreak } from "$lib/stats";
</script>

{#if $lightningStreak || 0 > 0}
  <div class="bg-base-300 px-3 self-stretch rounded-btn flex items-center">
    <p class="font-bold">{$lightningStreak.toLocaleString()} 🔥</p>
  </div>
{/if}
