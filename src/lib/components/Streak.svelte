<script lang="ts">
  import { streak } from "$lib/stats";
</script>

{#if $streak || 0 > 0}
  <div class="bg-base-300 px-3 self-stretch rounded-btn flex items-center">
    <p class="font-bold">{$streak.toLocaleString()} 🔥</p>
  </div>
{/if}
