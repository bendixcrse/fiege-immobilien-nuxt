<script setup lang="ts">
import { PrismicRichText } from "#components";
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.QuotesSlice>(["slice", "index", "slices", "context"])
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="bx-section-vertical-spacing-large bx-quotes-section"
    :style="{
      '--background-color': slice.primary.background_color ?? '#fff',
      '--content-color': slice.primary.content_color ?? '#000',
    }"
  >
    <div class="bx-quote-container animate--slide-in scroll-trigger">
      <div class="bx-quote-icon"></div>
      <PrismicRichText :field="slice.primary.text" wrapper="div" class="bx-quote-text" />
      <div class="bx-quote-author">
        {{ slice.primary.subtitle }}
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-quotes-section {
  background-color: var(--background-color, #fff);
  color: var(--content-color, #000);
  max-width: none;
  width: 100%;
}

.bx-quote-container {
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  width: $relativeWidth;

  .bx-quote-icon {
    background-color: var(--content-color, #fff);
    mask-image: url("~/assets/media/quote-icon-black.svg");
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-position: center;
    width: 100%;
    height: 28px;
    margin-bottom: 1rem;

    @media (max-width: $mobileBreakpoint) {
      height: 22px;
    }
  }

  .bx-quote-text {
    font-size: 2rem;
    font-weight: 300;
    max-width: 760px;
    margin: auto;

    @media (max-width: $mobileBreakpoint) {
      font-size: 1.5rem;
    }
  }

  .bx-quote-author {
    font-size: 1rem;
    font-weight: 300;

    &:before {
      content: "⸺";
      margin-right: 0.8rem;
    }
  }
}
</style>
