<script setup lang="ts">
import { PrismicRichText } from "#components";
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.ImageCardsSlice>([
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

  <div class="bx-items-container">
	<div class="bx-image-card"
		v-for="(item, index) in slice.primary.items"
		:key="index">
		<div class="bx-col">
			<MediaItem :prismicMedia="item.image" :ratio="1" />
		</div>
		<div class="bx-col">
			<h2>{{ item.title }}</h2>
			<PrismicRichText :field="item.description" wrapper="div" />
			<Button :link="item.button"></Button>
		</div>
	</div>
  </div>

  </section>
</template>

<style lang="scss" scoped>
.bx-items-container {
	border-top: 1px solid $borderColor;

	.bx-image-card {
		padding: 2rem 0;
		display: flex;
		align-items: center;
		gap: 4rem;
		font-size: 18px;
		border-bottom: 1px solid $borderColor;
		position: relative;
		
		@media (max-width: $mobileBreakpoint) {
			padding: 1.5rem 0 3rem;
			flex-direction: column-reverse !important;
			gap: 2.5rem;
		}

		&:after {
			content: "";
			position: absolute;
			left: 50%;
			top: 0;
			height: 100%;
			width: 1px;
			background: $borderColor;

			@media (max-width: $mobileBreakpoint) {
				display: none;
			}
		}

		&:nth-child(odd) {
			flex-direction: row-reverse;
		}

		.bx-col {
			flex: 1;
			width: 100%;
		}

		h2 {
			margin-bottom: 2rem;
			margin-top: 0;
			
			@media (max-width: $mobileBreakpoint) {
				font-size: 2rem;
			}
		}
	}
}
</style>