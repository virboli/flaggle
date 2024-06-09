<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  import Streak from "./Streak.svelte";

  import BiGearFill from "~icons/bi/gear-fill";
</script>

<header class="sticky top-0 z-10 p-2 bg-base-200 grid grid-cols-[1fr_auto_1fr]">
  <div class="flex justify-start items-center h-full">
    {#if $page.url.pathname === base + "/"}
      <Streak></Streak>
    {/if}
    <button class="btn btn-sm">Stats</button>
  </div>
  <a href="{base}/"><h1 class="text-xl font-bold active:scale-95 transition-transform">Flaggle</h1></a>
  <div class="flex justify-end items-center h-full">
    <a href="{base}/daily" class="btn btn-sm" class:active={$page.url.pathname === base + "/daily"}
      >Daily</a
    >
    <a href="{base}/" class="btn btn-sm" class:active={$page.url.pathname === base + "/"}>Classic</a
    >
    <a href="{base}/settings" class="btn btn-sm btn-square"><BiGearFill></BiGearFill></a>
  </div>
</header>

<style>
  .active {
    @apply bg-primary text-primary-content;
  }
</style>
