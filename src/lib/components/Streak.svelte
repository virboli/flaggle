<script lang="ts">
  export let value: number;
  export let postfix: string = "🔥";
</script>

<p class="font-bold">
  <span class:fire={value >= 10} class:purple={value >= 50}>{value.toLocaleString()} </span>
  <span class="glow">{postfix}</span>
</p>

<style>
  .red {
    @apply bg-gradient-to-b from-[#df4223] via-[#ed7150] to-[#fae070] text-transparent bg-clip-text;
    text-shadow: 0 0 10px red;
  }

  .purple {
    @apply bg-gradient-to-b from-[#7b23df] via-[#c850ed] to-[#fa70b7] text-transparent bg-clip-text;
    text-shadow: 0 0 10px #c850ed;
  }

  .glow {
    text-shadow: 0 0 10px red;
  }
</style>
