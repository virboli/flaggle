<script lang="ts">
  import { Toaster } from "svelte-french-toast";
  import Navigation from "$lib/components/Navigation.svelte";
  import StatsModal from "$lib/components/StatsModal.svelte";

  import LucideBarChart3 from "~icons/lucide/bar-chart-3";

  let statsModal: StatsModal;

  const version: string = import.meta.env.PACKAGE_VERSION;
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
  target="_blank"
  rel="noopener noreferrer"
  class="font-bold leading-none fixed bottom-0 left-0 m-3 opacity-30 active:scale-95 transition-transform"
  href="https://kennyhui.dev/"
>
  kennyhui.dev
</a>
<p class="leading-none fixed bottom-0 right-0 m-3 opacity-30">{version}</p>
<Toaster toastOptions={{ position: "bottom-center" }}></Toaster>
<StatsModal bind:this={statsModal}></StatsModal>
