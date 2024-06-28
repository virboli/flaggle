<script lang="ts">
  export let value: number;
  export let postfix: string = "🔥";
</script>

{#if value > 0}
  <div class="bg-base-300 px-3 self-stretch rounded-btn flex items-center">
    <p class="font-bold">
      {#if value >= 10}
        <span
          class="bg-gradient-to-b from-[#df4223] via-[#ed7150] to-[#fae070] text-transparent bg-clip-text"
          >{value.toLocaleString()}
        </span>
      {:else}
        {value.toLocaleString()}
      {/if}
      {postfix}
    </p>
  </div>
{/if}
