<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.LargeTextSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
	:class="'bx-section-vertical-spacing-' + slice.primary.vertical_spacing"
  >
	<div class="bx-large-text-container">
		<div v-if="slice.primary.side_text" class="bx-side-text animate--slide-in scroll-trigger">
			{{ slice.primary.side_text }}
		</div>

		<div class="bx-text-container animate--slide-in scroll-trigger">
			<h2 class="bx-title">{{ slice.primary.title }}</h2>
			<PrismicRichText
				:field="slice.primary.description"
				wrapper="div"
				class="bx-text"
			/>
			<Button
				class="bx-button"
				:link="slice.primary.button"
			/>
		</div>
	</div>
  </section>
</template>

<style lang="scss" scoped>
.bx-large-text-container {
	display: flex;
	gap: 14%;
	justify-content: space-between;

	@media(max-width: $mobileBreakpoint) {
		flex-direction: column;
	}

	.bx-side-text {
		white-space: nowrap;
		text-transform: uppercase;
		font-size: 0.8rem;
		margin: 1rem 0;
		
		@media(max-width: $mobileBreakpoint) {
			margin: 0.5rem 0;
		}
	}

	.bx-text-container {
		width: 75%;

		@media(max-width: $mobileBreakpoint) {
			width: 100%;
		}

		h2 {
			margin: 0;
		}

		.bx-text {
			font-size: 2rem;
			line-height: 1.3;
			margin: 0.5em 0 1em;

			@media(max-width: $mobileBreakpoint) {
				font-size: 1.5rem;
			}

			:deep(p) {
				margin: 0;
			}
		}

		.bx-button {
			font-size: 1.2em;
			
			@media(max-width: $mobileBreakpoint) {
				font-size: 1em;
			}
		}
	}
}
</style>