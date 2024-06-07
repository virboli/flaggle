<script lang="ts">
  import { base } from "$app/paths";
</script>

<header class="sticky top-0 z-10 flex flex-col p-2 bg-base-200">
  <div class="grid grid-cols-[1fr_auto_1fr]">
    <div></div>
    <a href="{base}/"
      ><h1 class="text-xl">Flaggle <i class="text-base-content/50">kennyhui.dev</i></h1></a
    >
    <div class="flex gap-4 justify-center items-center">
      <a href="{base}/daily" class="link">Daily</a>
    </div>
  </div>
</header>
