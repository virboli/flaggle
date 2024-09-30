<script lang="ts">
  import MainMenuItem from "$lib/components/MainMenuItem.svelte";

  import LucideCalendarDays from "~icons/lucide/calendar-days";
  import LucideFlag from "~icons/lucide/flag";
  import LucideZap from "~icons/lucide/zap";
</script>

<MainMenuItem path="daily" title="Daily">
  A new flag every day
  <span slot="icon"><LucideCalendarDays></LucideCalendarDays></span>
</MainMenuItem>
<MainMenuItem path="classic" title="Classic">
  Match colors and shapes
  <span slot="icon"><LucideFlag></LucideFlag></span>
</MainMenuItem>
<MainMenuItem path="lightning" title="Lightning">
  Fast-paced quick identification
  <span slot="icon"><LucideZap></LucideZap></span>
</MainMenuItem>
