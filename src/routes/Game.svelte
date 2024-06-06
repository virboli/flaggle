<script lang="ts">
  import GameInput from "./GameInput.svelte";
  import GameFeed from "./GameFeed.svelte";

  import { generateDiff } from "$lib/diff";

  import data from "$lib/data.json";

  interface Country {
    code: string;
    name: string;
  }

  interface Guess extends Country {
    diff: string;
  }

  let target = getRandomTarget();

  let items: Guess[] = [];

  async function addGuess(e: CustomEvent) {
    const country: Country = e.detail;
    const diff = await generateDiff(country, target);
    const guess: Guess = {
      code: country.code,
      name: country.name,
      diff: diff,
    };
    items = [guess, ...items];
    checkWin(country);
  }

  function checkWin(guess: Country) {
    if (target.code === guess.code) {
      alert("you win!");
    }
  }

  function getRandomTarget(): Country {
    const max = data.length;
    const index = Math.floor(Math.random() * max);
    return data[index];
  }
</script>

<GameInput on:submit={addGuess}></GameInput>
<GameFeed {items}></GameFeed>
