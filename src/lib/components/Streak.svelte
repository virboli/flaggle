<script lang="ts">
  export let value: number;
  export let postfix: string = "🔥";
</script>

<p class="font-bold">
  <span class:fire={value >= 10}>{value.toLocaleString()} </span>
  <span class="glow">{postfix}</span>
</p>

<style>
  .fire {
    @apply bg-gradient-to-b from-[#df4223] via-[#ed7150] to-[#fae070] text-transparent bg-clip-text;
    text-shadow: 0 0 10px red;
  }

  .glow {
    text-shadow: 0 0 10px red;
  }
</style>
