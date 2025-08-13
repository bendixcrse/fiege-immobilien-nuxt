<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.SplitPageHeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
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

  let sectionScrolled = Math.abs(Math.min(section.getBoundingClientRect().top, 0));
  let windowHeight = section.getBoundingClientRect().height;

  let percentage = sectionScrolled / windowHeight;
  percentage = Math.max(0, Math.min(percentage * 1.8, 1));
  if (isNaN(percentage)) percentage = 0;

  percentageScrolled.value = Math.round(percentage * 1000) / 1000;
}
</script>

<template>
  <section
    ref="sectionRef"
    class="bx-split-page-hero-container"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    :style="{ '--percentage-scrolled': `${percentageScrolled ?? 0}` }"
  >
    <div class="bx-col text">
      <div class="bx-left-boxed">
        <div class="bx-overline">{{ slice.primary.overline }}</div>
        <h1>{{ slice.primary.title }}</h1>
      </div>
    </div>
    <div class="bx-col media">
      <div class="bx-media-wrapper">
        <MediaItem :prismicMedia="slice.primary.image" :ratio="1" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-split-page-hero-container {
  --content-width: min(90svw, #{$boxedWidth});
  display: flex;
  max-width: none;
  width: 100%;
  height: calc(100svh - 66px);
  margin: 0;
  align-items: flex-end;
  position: relative;

  @media (max-width: $mobileBreakpoint) {
    flex-direction: column-reverse;
    height: auto;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -2px;
    width: calc(var(--content-width) * var(--percentage-scrolled, 0));
    max-width: $boxedWidth;
    height: 1px;
    background: $borderColor;
    left: 50%;
    transform: translateX(-50%);
  }

  .bx-col {
    flex: 1;
    width: 100%;

    &.media {
      height: 100%;

      .bx-media-wrapper {
        --boxed-space-right: calc((100svw - var(--content-width)) / 2);

        position: relative;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: calc(var(--percentage-scrolled, 0) * 3rem)
          calc(var(--percentage-scrolled, 0) * var(--boxed-space-right))
          calc(var(--percentage-scrolled, 0) * 3rem) calc(var(--percentage-scrolled, 0) * 3rem);

        @media (max-width: $mobileBreakpoint) {
          padding: calc(var(--percentage-scrolled, 0) * var(--boxed-space-right));
        }

        .bx-background-media {
          height: 100%;

          &:deep(img, video) {
            will-change: transform;
            transform: scale(calc(1 + var(--percentage-scrolled) * 0.3));
          }
        }
      }
    }

    &.text {
      display: flex;
      align-items: flex-end;
    }
  }

  h1 {
    font-size: 3.5rem;
    margin: 0.5rem 0;
    box-sizing: border-box;
    padding-right: 38px;

    @media (max-width: $mobileBreakpoint) {
      font-size: 2rem;
    }
  }

  .bx-left-boxed {
    width: $relativeWidth;
    max-width: calc(50svw - ((100svw - #{$boxedWidth}) / 2));
    margin-left: auto;
    padding-bottom: 86px;

    @media (max-width: $mobileBreakpoint) {
      width: $relativeWidth;
      max-width: none;
      padding: 32px 0;
      margin: auto;
    }
  }
}
</style>
