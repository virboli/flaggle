<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  import LucideMenu from "~icons/lucide/menu";

  interface GameMode {
    name: string;
    path: string;
  }

  const gameModes: GameMode[] = [
    { name: "Daily", path: "daily" },
    { name: "Classic", path: "" },
    { name: "Lightning", path: "lightning" },
  ];
</script>

<!-- Full game mode selector -->
<div class="hidden md:block">
  {#each gameModes as mode}
    <a
      href="{base}/{mode.path}"
      class="btn btn-sm font-normal"
      class:active={$page.url.pathname === base + "/" + mode.path}
    >
      {mode.name}
    </a>
  {/each}
</div>
<!-- Mobile game mode selector -->
<div class="dropdown dropdown-end md:hidden">
  <div tabindex="0" role="button" class="btn btn-sm btn-square" aria-label="Game modes">
    <LucideMenu></LucideMenu>
  </div>
  <ul
    tabindex="0"
    role="menu"
    class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-4"
  >
    {#each gameModes as mode}
      <li>
        <a href="{base}/{mode.path}" class:active={$page.url.pathname === base + "/" + mode.path}>
          {mode.name}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .active,
  .menu .active {
    @apply bg-primary text-primary-content;
  }
</style>
