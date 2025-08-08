<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.AnimatedNumbersSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    class="bx-animated-numbers-section"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    :styles="{
      '--background-color':
        props.slice.variation == 'default'
          ? props.slice.primary.background_color
          : 'inherit',
      '--text-color':
        props.slice.variation == 'default'
          ? props.slice.primary.content_color
          : 'inherit',
    }"
  >
    <div v-if="slice.variation == 'default'" class="bx-animated-numbers-row">
      <AnimatedNumber
        v-for="(item, index) in slice.primary.numbers"
        :key="index"
        :number="item.number as number"
        :unit="item.unit as string"
        :name="item.title as string"
      >
      </AnimatedNumber>
    </div>
    <div
      v-else-if="slice.variation == 'animatedNumbersSplitRow'"
      class="bx-animated-numbers-split-row"
    >
      <div class="bx-col">
        <MediaItem v-if="slice.primary.image.url" :prismic-media="slice.primary.image" :ratio="1" />
        <h2>{{ slice.primary.title }}</h2>
        <PrismicRichText wrapper="div" :field="slice.primary.description" />
      </div>
      <div class="bx-col numbers">
        <AnimatedNumber
          v-for="(item, index) in slice.primary.numbers"
          :key="index"
          :number="item.number as number"
          :unit="item.unit as string"
          :name="item.title as string"
        >
        </AnimatedNumber>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-animated-numbers-section {
  background-color: var(--background-color, #{$backgroundColor});
  color: var(--text-color, #{$fontColor});
}

.bx-animated-numbers-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 8rem 0;

  @media(max-width: $mobileBreakpoint) {
	flex-direction: column;
  }
}

.bx-animated-numbers-split-row {
  display: flex;
  gap: 2rem;
  padding: 4rem 0;
  font-size: 1.2rem;
  align-items: center;

  @media(max-width: $mobileBreakpoint) {
	flex-direction: column;
  }

  .bx-col {
	flex: 1;
	width: 100%;

	&.numbers {
	  display: flex;
	  flex-direction: column;
	  gap: 2rem;
	}
  }
}
</style>
