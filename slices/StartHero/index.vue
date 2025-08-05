<script setup lang="ts">
import { type Content } from "@prismicio/client";
const section = ref<HTMLElement | null>(null)

defineProps(
  getSliceComponentProps<Content.StartHeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

function scrollToFirstSection() {
  window.scrollTo({
    top: section?.value?.clientHeight ?? window.innerHeight,
    behavior: "smooth",
  });
}
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    ref="section"
    class="bx-start-hero-container"
  >
  </section>
</template>

<style lang="scss" scoped>
.bx-start-hero-container {
}
</style>
