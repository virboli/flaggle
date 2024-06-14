<script lang="ts">
  import { Toaster } from "svelte-french-toast";

  import Header from "$lib/components/Header.svelte";
  import StatsModal from "$lib/components/StatsModal.svelte";

  import LucideBarChart3 from "~icons/lucide/bar-chart-3";

  let statsModal: StatsModal;
</script>

<svelte:head>
  <title>Flaggle</title>
  <meta
    name="description"
    content="Flag guessing game inspired by Wordle. Test your knowledge of countries and flags!"
  />
</svelte:head>

<Header>
  <button class="btn btn-sm btn-square" on:click={statsModal.show} aria-label="Stats">
    <LucideBarChart3></LucideBarChart3>
  </button>
</Header>
<div class="flex flex-col gap-4 w-[min(100%,800px)] mx-auto p-4">
  <slot></slot>
</div>
<p class="opacity-50 pointer-events-none fixed bottom-0 left-0 mx-3 my-2"><i>kennyhui.dev</i></p>
<Toaster toastOptions={{ position: "bottom-center" }}></Toaster>
<StatsModal bind:this={statsModal}></StatsModal>
