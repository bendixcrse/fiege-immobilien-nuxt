<script setup lang="ts">
import { PrismicRichText } from "#components";
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
    top: (section?.value?.clientHeight ?? window.innerHeight) - 50,
    behavior: "smooth",
  });
}

const sectionRef = ref(null);
const transformY = ref(0);

onMounted(() => {
  window.addEventListener("scroll", () => transformY.value = window.scrollY * 0.5, { passive: true });
})
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    ref="sectionRef"
    class="bx-start-hero-container"
  >
    <MediaItem
      :style="{ transform: `translateY(${transformY}px)` }"
      :prismic-media="slice.primary.background_media"
      class="bx-media-container"
    />
    <div class="bx-content-container bx-boxed animate--slide-in scroll-trigger">
      <div class="bx-overline">{{ slice.primary.overline }}</div>
      <h1 class="bx-title">{{ slice.primary.title }}</h1>
      <PrismicRichText
        :field="slice.primary.description"
        wrapper="div"
        class="bx-description"
      />
      <Button
        :link="slice.primary.button"
        :light="true"
        @click="!(slice.primary.button as any).url ? scrollToFirstSection() : null"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-start-hero-container {
  background-color: $blackColor;
  height: 100svh;
  margin: 0;
  width: 100%;
  max-width: none;
  color: #fff;
  position: relative;
  overflow: hidden;
  font-size: 16px;

  @media (max-width: $mobileBreakpoint) {
    font-size: 14px;
  }

  .bx-media-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.6;
  }

  .bx-content-container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    height: 100%;
    padding-bottom: 8em;
    box-sizing: border-box;

    .bx-overline {
      font-size: 1em;
      margin-bottom: 0.5em;
      color: #fff;
      letter-spacing: 0.5px;
    }

    .bx-title {
      font-size: 2.5em;
      margin-bottom: 1em;
      margin: 0;
    }

    .bx-description {
      max-width: 800px;
      font-size: 1.2em;
      line-height: 1.25;
      margin-bottom: 2em;
    }
  }
}
</style>
