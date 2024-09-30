<script lang="ts">
  import { settings } from "$lib/settings";

  import toast from "svelte-french-toast";

  import SettingsField from "./SettingsField.svelte";
  import Confirm from "$lib/components/Confirm.svelte";

  import BiGithub from "~icons/bi/github";

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

<SettingsField type="select" title="Theme" options={themes} bind:value={$settings.theme}>
  Select a theme
</SettingsField>
<SettingsField
  type="toggle"
  title="Dark Background"
  options={themes}
  bind:value={$settings.diffDarkBg}
>
  Use a dark background behind the "difference" panel regardless of theme
</SettingsField>
<a href="https://github.com/khui0/flaggle" title="GitHub" class="self-center text-2xl"
  ><BiGithub></BiGithub></a
>
<p class="text-center">{version}</p>

<Confirm bind:this={confirm}></Confirm>
