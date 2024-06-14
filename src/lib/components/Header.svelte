<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  import pluralize from "pluralize";

  import { streak, lightningStreak, dailyStreak } from "$lib/stats";

  import Streak from "./Streak.svelte";
  import GameModes from "./GameModes.svelte";

  import LucideSettings from "~icons/lucide/settings";
</script>

<header class="sticky top-0 z-10 p-2 bg-base-200 grid grid-cols-[1fr_auto_1fr]">
  <div class="flex justify-start items-center h-full">
    {#if $page.url.pathname === base + "/"}
      <Streak value={$streak}></Streak>
    {:else if $page.url.pathname === base + "/lightning"}
      <Streak value={$lightningStreak}></Streak>
    {:else if $page.url.pathname === base + "/daily"}
      <Streak value={$dailyStreak} postfix={pluralize("day", $dailyStreak)}></Streak>
    {/if}
    <slot></slot>
  </div>
  <a href="{base}/">
    <h1 class="text-xl font-bold active:scale-95 transition-transform">Flaggle</h1>
  </a>
  <div class="flex justify-end items-center h-full">
    <GameModes></GameModes>
    <a href="{base}/settings" class="btn btn-sm btn-square" aria-label="Settings">
      <LucideSettings></LucideSettings>
    </a>
  </div>
</header>
