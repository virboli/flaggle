<script lang="ts">
  import GameInput from "$lib/components/GameInput.svelte";
  import GameFeed from "$lib/components/GameFeed.svelte";

  import { generateDiff } from "$lib/diff";
  import { sha256 } from "$lib/crypto";
  import { getDeltaDay } from "$lib/date";

  import data from "$lib/data.json";

  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import pluralize from "pluralize";

  interface Country {
    code: string;
    name: string;
  }

  interface Guess extends Country {
    diff?: string;
    win?: boolean;
  }

  const dailyNumber = getDeltaDay("2024-06-06") * -1;

  // Game state
  let target: Country;
  let items: Guess[] = [];
  let isGameOver: boolean = false;

  let guesses: number = 0;

  onMount(async () => {
    // Generate a random number by hashing date and using the first 3 characters as a hex number
    const tzo = new Date().getTimezoneOffset() * 60_000;
    const date = new Date(Date.now() - tzo).toISOString().split("T")[0];
    const hash = await sha256(date);
    const rnd = Number("0x" + hash.slice(0, 3)) / 16 ** 3;
    const index = Math.floor(rnd * data.length);
    target = data[index];
  });

  async function addGuess(e: CustomEvent) {
    if (isGameOver) return;
    const country: Country = e.detail;
    const diff = await generateDiff(country, target);
    const win = checkWin(country);
    const guess: Guess = {
      code: country.code,
      name: country.name,
      diff: diff,
      win: win,
    };
    items = [guess, ...items];
    guesses++;
  }

  function checkWin(guess: Country): boolean {
    if (target.code === guess.code) {
      isGameOver = true;
      return true;
    }
    return false;
  }

  function copyResults() {
    const resultString = `I solved today's Flaggle #${dailyNumber} in ${pluralize("guess", guesses, true)}! Play at https://kennyhui.dev/flaggle/daily`;
    navigator.clipboard.writeText(resultString);
    toast.success("Copied results to clipboard");
  }
</script>

<p class="text-center mb-4">Flaggle #{dailyNumber}</p>
<div class="flex flex-col gap-4 w-[min(100%,800px)] mx-auto">
  <GameInput on:submit={addGuess}></GameInput>
  {#if isGameOver}
    <button class="btn self-center" on:click={copyResults}>Share Results</button>
  {/if}
  <GameFeed {items}></GameFeed>
</div>
