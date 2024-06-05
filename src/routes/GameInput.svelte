<script lang="ts">
  import Fuse from "fuse.js";
  import data from "$lib/data.json";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  const fuse = new Fuse(data, {
    includeScore: true,
    shouldSort: true,
    keys: ["code", "name"],
  });

  interface Country {
    code: string;
    name: string;
  }

  let container: HTMLDivElement;
  let query: string = "";
  let results: Country[] = [];
  let focused: boolean = false;

  $: query,
    (() => {
      results = fuse
        .search(query)
        .map((result) => result.item)
        .slice(0, 10);
    })();

  onMount(() => {
    document.addEventListener("click", (e) => {
      if (container.contains(e.target as Node)) {
        focused = true;
      } else {
        focused = false;
      }
    });
  });

  function selectQuery() {
    const country = data.find((country) => country.name.toLowerCase() === query.toLowerCase());
    if (country) {
      submitGuess(country);
    }
  }

  function fillFirstResult() {
    query = results[0].name;
  }

  function submitGuess(country: Country) {
    dispatch("submit", country);
    resetInput();
  }

  function resetInput() {
    query = "";
  }
</script>

<div bind:this={container} class="relative flex flex-col">
  <input
    bind:value={query}
    type="text"
    class="input input-bordered"
    placeholder="Guess a flag!"
    on:keydown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        selectQuery();
      } else if (e.key === "Tab") {
        if (results.length > 0) {
          e.preventDefault();
          fillFirstResult();
        }
      }
    }}
  />
  {#if results.length > 0 && focused}
    <div
      class="absolute top-[calc(100%+1rem)] w-full bg-base-200 rounded-btn flex flex-col shadow-lg"
    >
      {#each results as country}
        <button
          class="text-start px-3 py-2 hover:bg-base-100/50"
          on:click={() => {
            submitGuess(country);
          }}>{country.name}</button
        >
      {/each}
    </div>
  {/if}
</div>
