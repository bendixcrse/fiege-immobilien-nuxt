<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.TitleTextListSlice>([
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
  >
  <div class="bx-title-text-list-container">
	<div v-for="(item, index) in slice.primary.items" class="bx-title-list-item animate--slide-in scroll-trigger" :key="index">
		<div class="bx-title-container">
			<div class="bx-index">{{ index < 9 ? '0' : '' }}{{ index + 1 }}</div>
			<h2>{{ item.title }}</h2>
		</div>

		<div class="bx-content-container">
			<PrismicRichText
				:field="item.description"
				wrapper="div"
				class="bx-text"
			/>
			<Button
				class="bx-button"
				:link="item.button"
			/>
		</div>
	</div>
  </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-title-text-list-container {
	display: flex;
	flex-direction: column;

	.bx-title-list-item {
		border-bottom: 1px solid $blackColor;
		padding: 3rem;
		display: flex;
		justify-content: space-between;

		@media(max-width: $mobileBreakpoint) {
			padding: 3rem 0;
			flex-direction: column;
			gap: 28px;
		}

		.bx-title-container {
			display: flex;
			max-width: 500px;
			flex: 1;
			gap: 42px;

			@media(max-width: $mobileBreakpoint) {
				gap: 32px;
			}
			
			h2 {
				font-size: 3rem;
				max-width: 300px;
				margin: 0;
				line-height: 1.2;
				
				@media(max-width: $mobileBreakpoint) {
					font-size: 2rem;
				}
			}

			.bx-index {
				margin-top: 10px;
			}
		}

		.bx-content-container {
			max-width: 500px;

			.bx-text {
				font-size: 1.125rem;

				:deep(p) {
					margin: 0;
				}
			}

			.bx-button {
				display: inline-block;
				margin-top: 2rem;
			}
		}
	}
}
</style>