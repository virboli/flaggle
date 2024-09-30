<script lang="ts">
  let modal: HTMLDialogElement;

  import LucideX from "~icons/lucide/x";

  export function show() {
    modal.showModal();
  }

  export let title: string;
  export let centered: boolean = false;
</script>

<dialog class="modal backdrop:bg-transparent" bind:this={modal} on:close>
  <div class="modal-box p-4">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" aria-label="Close">
        <LucideX></LucideX>
      </button>
    </form>
    <div class="flex flex-col gap-2 mx-1" class:items-center={centered}>
      <h1 class="font-bold text-2xl self-start">{title}</h1>
      <slot></slot>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop bg-black/20">
    <button>close</button>
  </form>
</dialog>
