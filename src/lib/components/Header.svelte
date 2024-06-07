<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
</script>

<header class="sticky top-0 z-10 p-2 bg-base-200 grid grid-cols-[1fr_auto_1fr] place-items-center">
  <div class="flex justify-center items-center h-full"></div>
  <a href="{base}/"><h1 class="text-xl font-bold">Flaggle</h1></a>
  <div class="flex justify-center items-center h-full">
    {#if $page.url.pathname === base + "/"}
      <a href="{base}/daily" class="btn btn-sm">Classic</a>
    {:else if $page.url.pathname === base + "/daily"}
      <a href="{base}/" class="btn btn-sm">Daily</a>
    {/if}
    <a href="{base}/daily" class="btn btn-sm">Settings</a>
  </div>
</header>
