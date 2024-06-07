<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  import BiGearFill from "~icons/bi/gear-fill";
</script>

<header class="sticky top-0 z-10 p-2 bg-base-200 grid grid-cols-[1fr_auto_1fr]">
  <div class="flex justify-center items-center h-full"></div>
  <a href="{base}/"><h1 class="text-xl font-bold">Flaggle</h1></a>
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
    @apply bg-base-100/50;
  }
</style>
