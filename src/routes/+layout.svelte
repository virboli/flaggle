<script lang="ts">
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>Flaggle</title>
  <meta name="description" content="Flag guessing game" />
</svelte:head>

<Header></Header>
<div class="p-4"><slot></slot></div>
