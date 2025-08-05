<script setup lang="ts">
import { type Content } from "@prismicio/client";

const accordions = ref([])

defineProps(
  getSliceComponentProps<Content.AccordionGroupSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

function closeAllAccordions(index: Number) {
  for (var i = 0; i < accordions.value.length; i++) {
    if (i == index) continue;
    accordions.value[i].close();
  }
}
</script>

<template>
  <section class="bx-accordion-group-container" :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation">
    <div class="bx-side-col">
      <h3 v-html="slice.primary.sidetext" class="bx-side-title"></h3>
    </div>
    <div class="bx-col">
      <div class="bx-title-row">
        <h2>{{ slice.primary.title }}</h2>
        <div class="bx-description">
          <PrismicRichText wrapper="div" :field="slice.primary.description" />
        </div>
      </div>

      <div class="bx-accordion-group">
        <AccordionItem v-for="(item, index) in slice.items" :index="index" :title="item.title ?? '-'" ref="accordions"
          @open="closeAllAccordions(index)" :content="item.content" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-accordion-group-container {
  display: flex;
  margin: 64px auto 150px;

  @media(max-width: $mobileBreakpoint) {
    flex-direction: column;
    margin-bottom: 50px;
  }

  .bx-side-col {
    flex: 0 0 25%;
    width: 25%;

    @media(max-width: $mobileBreakpoint) {
      flex: 1;
      width: 100%;
    }

    .bx-side-title {
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .bx-title-row {
    display: flex;
    align-items: flex-start;
    gap: 14%;
    margin-bottom: 76px;

    @media(max-width: $mobileBreakpoint) {
      flex-direction: column;
      gap: 12px;
      margin-bottom: 26px;
    }

    h2 {
      flex: 0 0 30%;
      width: 30%;
      font-size: 56px;
      margin: 0;
      text-transform: none;
      line-height: 1.2;

      @media(max-width: $mobileBreakpoint) {
        width: 90%;
        flex: 1;
        font-size: 46px;
      }
    }

    .bx-description {
      flex: 1;
      font-weight: 300;
      font-size: 16px;
      line-height: 1.5;
      
      @media(max-width: $mobileBreakpoint) {
        font-size: 16px;
        width: 90%;
        margin-top: 12px;
      }

      :deep(p) {
        margin: 0;
      }
    }
  }

  .bx-accordion-group {
    :deep(.bx-accordion-item-container) {
      border-bottom: 0;

      &:last-child {
        border-bottom: 1px solid $blackColor;
      }
    }
  }
}
</style>