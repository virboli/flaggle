<script lang="ts">
  import { settings } from "$lib/settings";

  import toast from "svelte-french-toast";

  import SettingsField from "./SettingsField.svelte";
  import Confirm from "$lib/components/Confirm.svelte";

  let confirm: Confirm;

  interface Option {
    name: string;
    value: string;
  }

  const themes: Option[] = [
    { value: "auto", name: "Auto" },
    { value: "dark", name: "Dark" },
    { value: "light", name: "Light" },
  ];

  const version: string = import.meta.env.PACKAGE_VERSION;
</script>

<div class="h-full flex flex-col gap-2 w-[min(100%,800px)] mx-auto">
  <SettingsField type="select" title="Theme" options={themes} bind:value={$settings.theme}
    >Select a theme</SettingsField
  >
  <p class="text-center">{version}</p>
</div>

<Confirm bind:this={confirm}></Confirm>
