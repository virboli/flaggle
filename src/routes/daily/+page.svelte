<script lang="ts">
  import GameInput from "$lib/components/GameInput.svelte";
  import GameFeed from "$lib/components/GameFeed.svelte";

  import { generateDiff } from "$lib/diff";
  import { sha256 } from "$lib/crypto";
  import { getDeltaDay } from "$lib/date";

  import data from "$lib/data.json";

  import { onMount } from "svelte";

  interface Country {
    code: string;
    name: string;
  }

  interface Guess extends Country {
    diff?: string;
    win?: boolean;
  }

  const dailyNumber = getDeltaDay("2024-06-07") * -1 + 1;

  // Game state
  let target: Country;
  let items: Guess[] = [];
  let isGameOver: boolean = false;

  onMount(async () => {
    // Generate a random number by hashing date and using the first 3 characters as a hex number
    const date = new Date().toISOString().split("T")[0];
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
  }

  function checkWin(guess: Country): boolean {
    if (target.code === guess.code) {
      isGameOver = true;
      return true;
    }
    return false;
  }
</script>

<p class="text-center mb-4">Flaggle #{dailyNumber}</p>
<div class="flex flex-col gap-4 w-[min(100%,800px)] mx-auto">
  <GameInput on:submit={addGuess}></GameInput>
  <GameFeed {items}></GameFeed>
</div>
