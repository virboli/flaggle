<script lang="ts">
  import { Toaster } from "svelte-french-toast";

  import Header from "$lib/components/Header.svelte";
  import StatsModal from "$lib/components/StatsModal.svelte";

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
  <button class="btn btn-sm" on:click={statsModal.show}>Stats</button>
</Header>
<div class="p-4"><slot></slot></div>
<p class="opacity-50 pointer-events-none fixed bottom-0 left-0 mx-3 my-2"><i>kennyhui.dev</i></p>
<Toaster toastOptions={{ position: "bottom-center" }}></Toaster>
<StatsModal bind:this={statsModal}></StatsModal>
