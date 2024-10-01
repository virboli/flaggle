<script lang="ts">
  export let value: number;
  export let postfix: string = "🔥";

  $: effect = (() => {
    if (value >= 1000) {
      return "rainbow";
    } else if (value >= 500) {
      return "yellow";
    } else if (value >= 250) {
      return "green";
    } else if (value >= 100) {
      return "blue";
    } else if (value >= 50) {
      return "purple";
    } else if (value >= 10) {
      return "red";
    }
  })();
</script>

<p class="font-bold whitespace-nowrap">
  <span class={effect}>{value.toLocaleString()} </span>
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

  .blue {
    @apply bg-gradient-to-b from-[#4923df] via-[#50c6ed] to-[#70face] text-transparent bg-clip-text;
    text-shadow: 0 0 10px #50c6ed;
  }

  .green {
    @apply bg-gradient-to-b from-[#23dfa7] via-[#50ed68] to-[#d3fa70] text-transparent bg-clip-text;
    text-shadow: 0 0 10px #50ed68;
  }

  .yellow {
    @apply bg-gradient-to-b from-[#df8123] via-[#e8ed50] to-[#a7fa70] text-transparent bg-clip-text;
    text-shadow: 0 0 10px #e8ed50;
  }

  /* Adapted from https://codepen.io/shironitus/pen/QWyNBqx */
  .rainbow {
    @apply relative text-transparent bg-clip-text;
    background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    animation: animate 5s linear infinite;
  }

  .rainbow:before {
    content: "";
    @apply absolute inset-x-0 inset-y-2 -z-[1] rounded-full blur-[10px];
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    animation: animate 5s linear infinite;
  }

  @keyframes animate {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }

  .glow {
    text-shadow: 0 0 10px red;
  }
</style>
