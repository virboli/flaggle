<script lang="ts">
  export let href: string;
  export let title: string;
  export let target: string = "";
</script>

<a
  {href}
  {target}
  class="flex flex-col gap-1 py-4 px-5 rounded-box bg-base-200 relative overflow-hidden group"
>
  <h2
    class="font-[BigNoodleTitling] italic text-4xl font-bold group-hover:text-accent transition-colors z-10"
  >
    {title}
  </h2>
  <p class="text-neutral-content z-10 mr-20"><slot></slot></p>
  <div
    class="absolute right-4 bottom-[-0.6rem] text-6xl text-neutral group-hover:text-accent transition-colors z-0"
  >
    <slot name="icon"></slot>
  </div>
</a>
