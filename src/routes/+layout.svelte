<script lang="ts">
  import { Toaster } from "svelte-french-toast";

  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>Flaggle</title>
  <meta
    name="description"
    content="Flag guessing game inspired by Wordle. Test your knowledge of countries and flags!"
  />
</svelte:head>

<Header></Header>
<div class="p-4"><slot></slot></div>
<Toaster toastOptions={{ position: "bottom-center" }}></Toaster>
