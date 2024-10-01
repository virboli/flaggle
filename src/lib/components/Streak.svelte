<script lang="ts">
  import { Howl } from "howler";
  import sound from "$lib/assets/kill.mp3";

  export let value: number;
  export let postfix: string = "🔥";

  let ready: boolean = false;
  let show: boolean = false;

  const audio = new Howl({
    src: sound,
  });

  $: value,
    (() => {
      if (!ready) {
        ready = true;
        return;
      }
      if (
        value === 10 ||
        value === 50 ||
        value === 100 ||
        value === 250 ||
        value === 500 ||
        value === 1000
      ) {
        show = true;
        setTimeout(() => {
          show = false;
        }, 2000);
        audio.stop();
        audio.play();
      }
    })();

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

{#if show}
  <div class="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
    <p class="big font-bold whitespace-nowrap text-8xl">
      <span class={effect}>{value.toLocaleString()} </span>
      <span class="glow">{postfix}</span>
    </p>
  </div>
{/if}

<style>
  .red {
    @apply bg-gradient-to-b from-[#df4223] via-[#ed7150] to-[#fae070] text-transparent bg-clip-text;
    text-shadow: 0 0 0.625em red;
  }

  .purple {
    @apply bg-gradient-to-b from-[#7b23df] via-[#c850ed] to-[#fa70b7] text-transparent bg-clip-text;
    text-shadow: 0 0 0.625em #c850ed;
  }

  .blue {
    @apply bg-gradient-to-b from-[#4923df] via-[#50c6ed] to-[#70face] text-transparent bg-clip-text;
    text-shadow: 0 0 0.625em #50c6ed;
  }

  .green {
    @apply bg-gradient-to-b from-[#23dfa7] via-[#50ed68] to-[#d3fa70] text-transparent bg-clip-text;
    text-shadow: 0 0 0.625em #50ed68;
  }

  .yellow {
    @apply bg-gradient-to-b from-[#df8123] via-[#e8ed50] to-[#a7fa70] text-transparent bg-clip-text;
    text-shadow: 0 0 0.625em #e8ed50;
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
    @apply absolute inset-x-0 inset-y-2 -z-[1] rounded-full blur-[0.625em];
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
    text-shadow: 0 0 0.625em red;
  }

  .big {
    animation: intro 1s 2 ease forwards alternate;
  }

  @keyframes intro {
    0% {
      scale: 0.5;
      opacity: 0;
      transform: rotateY(-180deg) rotateZ(10deg);
    }
    100% {
      scale: 1;
      opacity: 1;
      transform: rotateY(0);
    }
  }
</style>
