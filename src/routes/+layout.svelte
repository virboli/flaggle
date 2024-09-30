<script lang="ts">
  import { Toaster } from "svelte-french-toast";
  import Navigation from "$lib/components/Navigation.svelte";
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

<Navigation>
  <button class="btn btn-sm btn-square rounded-full" on:click={statsModal.show} aria-label="Stats">
    <LucideBarChart3></LucideBarChart3>
  </button>
</Navigation>
<div class="flex flex-col gap-4 w-[min(100%,800px)] mx-auto p-4 pb-24">
  <slot></slot>
</div>
<a
  class="bg-base-200 px-2 py-0.5 fixed bottom-0 left-0 m-3 rounded-md text-base-content/50"
  href="https://kennyhui.dev/"
>
  kennyhui.dev
</a>
<Toaster toastOptions={{ position: "bottom-center" }}></Toaster>
<StatsModal bind:this={statsModal}></StatsModal>
