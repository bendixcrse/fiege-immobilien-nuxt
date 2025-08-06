<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.MediaWithTextSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="bx-section-vertical-spacing-normal"
  >
    <div
      class="bx-media-with-text-container"
      :class="{ reversed: !!slice.primary.reversed }"
    >
      <div class="col animate--slide-in scroll-trigger">
        <MediaItem
          v-if="!!slice.primary.image.url"
          :prismic-media="slice.primary.image"
          class="bx-media-container"
          :ratio="1"
        />
        <div v-else class="bx-title-container">
          <div class="bx-overline">{{ slice.primary.overline }}</div>
          <h2>{{ slice.primary.title }}</h2>
        </div>
      </div>
      <div class="col content animate--slide-in scroll-trigger" :style="{'--animation-order': 1}">
        <div class="bx-centered">
          <div v-if="!!slice.primary.image.url" class="bx-title-container">
            <div class="bx-overline">{{ slice.primary.overline }}</div>
            <h2>{{ slice.primary.title }}</h2>
          </div>
          <PrismicRichText
            wrapper="div"
            class="bx-text"
            :field="slice.primary.description"
          />
          <Button :link="slice.primary.button"></Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-media-with-text-container {
  display: flex;
  flex-direction: row;
  gap: 6rem;
  font-size: 1.125rem;

  @media (max-width: $mobileBreakpoint) {
    flex-direction: column;
    gap: 1rem;
  }

  &.reversed {
    flex-direction: row-reverse;
  }

  .col {
    flex: 1;
    max-width: 50%;

    @media (max-width: $mobileBreakpoint) {
      max-width: 100%;
    }

	&.content {
	  display: flex;
	  align-items: center;
	  justify-content: center;

	  .bx-centerd {
		margin: auto;
	  }
	}
  }

  .bx-text {
    margin: 0 0 32px;

	:deep(p) {
		margin: 0;
	}
  }
}
</style>
