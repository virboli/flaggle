<script lang="ts">
  import MainGameMode from "$lib/components/MainGameMode.svelte";

  import LucideCalendarDays from "~icons/lucide/calendar-days";
  import LucideFlag from "~icons/lucide/flag";
  import LucideZap from "~icons/lucide/zap";
</script>

<MainGameMode path="daily" title="Daily">
  A new flag every day
  <span slot="icon"><LucideCalendarDays></LucideCalendarDays></span>
</MainGameMode>
<MainGameMode path="classic" title="Classic">
  Match colors and shapes
  <span slot="icon"><LucideFlag></LucideFlag></span>
</MainGameMode>
<MainGameMode path="lightning" title="Lightning">
  Fast-paced quick identification
  <span slot="icon"><LucideZap></LucideZap></span>
</MainGameMode>
