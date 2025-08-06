<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.FullMediaSlice>(["slice", "index", "slices", "context"])
);

const sectionRef = ref(null);
const percentageScrolled = ref(0);

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  if (!sectionRef.value) return;
  let section: any = sectionRef.value;

  let sectionBottom = section.getBoundingClientRect().bottom;
  let windowHeight = window.innerHeight;
  let sectionHeight = section.getBoundingClientRect().height;

  let sectionInView = 1 - sectionBottom / (windowHeight + sectionHeight);
  sectionInView = Math.max(0, Math.min(sectionInView, 1));

  percentageScrolled.value = Math.round(sectionInView * 1000) / 1000;
}
</script>

<template>
  <section
    ref="sectionRef"
    class="bx-full-media-container"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    :style="{ '--percentage-scrolled': `${percentageScrolled}` }"
  >
    <MediaItem :prismicMedia="slice.primary.media" :ratio="0" />
  </section>
</template>

<style lang="scss" scoped>
.bx-full-media-container {
  --content-width: min(#{$relativeWidth}, #{$boxedWidth});
  --zoom-down: min(10rem, calc(100vw - var(--content-width)));

  position: relative;
  max-width: none;
  margin: 5rem auto;
  width: calc(100svw - (var(--zoom-down) * var(--percentage-scrolled, 0)));
  min-width: var(--content-width);
  height: 40svw;
  max-height: 50svh;

  @media (max-width: $mobileBreakpoint) {
    height: 100svw;
    max-height: 70svh;
  }

  .bx-background-media {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
