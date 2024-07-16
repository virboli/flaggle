<script lang="ts">
  import MainGameMode from "$lib/components/MainGameMode.svelte";

  import LucideCalendarDays from "~icons/lucide/calendar-days";
  import LucideFlag from "~icons/lucide/flag";
  import LucideZap from "~icons/lucide/zap";
</script>

<MainGameMode path="daily" title="Daily"
  >Challenge yourself with a new flag each day
  <span slot="icon"><LucideCalendarDays></LucideCalendarDays></span>
</MainGameMode>
<MainGameMode path="classic" title="Classic">
  Original gameplay where you match colors and shapes
  <span slot="icon"><LucideFlag></LucideFlag></span>
</MainGameMode>
<MainGameMode path="lightning" title="Lightning">
  Fast-paced gameplay where you are immediately shown the flag
  <span slot="icon"><LucideZap></LucideZap></span>
</MainGameMode>
