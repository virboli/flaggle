<script lang="ts">
  import GameInput from "./GameInput.svelte";
  import GameFeed from "./GameFeed.svelte";

  import { generateDiff } from "$lib/diff";

  interface Country {
    code: string;
    name: string;
  }

  interface Guess extends Country {
    diff: string;
  }

  let target = { code: "ph", name: "Philippines" };

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
    console.log(guess);
  }
</script>

<GameInput on:submit={addGuess}></GameInput>
<GameFeed {items}></GameFeed>
