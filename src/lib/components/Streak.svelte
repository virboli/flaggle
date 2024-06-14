<script lang="ts">
  export let value: number;
  export let postfix: string = "🔥";
</script>

{#if value > 0}
  <div class="bg-base-300 px-3 self-stretch rounded-btn flex items-center">
    <p class="font-bold">{value.toLocaleString()} {postfix}</p>
  </div>
{/if}
