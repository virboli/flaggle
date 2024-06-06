<script lang="ts">
  import GameInput from "./GameInput.svelte";
  import GameFeed from "./GameFeed.svelte";

  let items = [
    { code: "cn", name: "China" },
    { code: "cn", name: "United States Minor Outlying Islands" },
    { code: "cn", name: "Philippines" },
    { code: "cn", name: "United States" },
  ];
</script>

<GameInput></GameInput>
<GameFeed {items}></GameFeed>
