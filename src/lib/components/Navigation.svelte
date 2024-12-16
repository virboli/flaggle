<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";

  import LucideUndo2 from "~icons/lucide/undo-2";
  import LucideSettings from "~icons/lucide/settings";

  const modes = [
    { name: "Daily", path: "daily" },
    { name: "Classic", path: "classic" },
    { name: "Lightning", path: "lightning" },
  ];
</script>

{#if $page.url.pathname !== "/"}
  <nav
    in:fly={{ y: 100 }}
    out:fly={{ y: 100 }}
    class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 mb-3 bg-base-200 p-2 rounded-full flex gap-3 shadow-lg"
  >
    <a href="/" class="btn btn-sm btn-square rounded-full" aria-label="Settings">
      <LucideUndo2></LucideUndo2>
    </a>
    {#each modes as mode}
      {@const active = $page.url.pathname === "/" + mode.path}
      <a
        href="/{mode.path}"
        class="font-[BigNoodleTitling] italic text-2xl hover:scale-105 transition-transform {active
          ? 'text-accent'
          : ''}"
      >
        {mode.name}
      </a>
    {/each}
    <slot></slot>
    <a href="/settings" class="btn btn-sm btn-square rounded-full" aria-label="Settings">
      <LucideSettings></LucideSettings>
    </a>
  </nav>
{/if}
