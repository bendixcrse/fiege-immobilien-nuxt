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
  <section
    class="bx-accordion-group-container"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="bx-title-container">
      <h2>{{ slice.primary.title }}</h2>
    </div>

    <div class="bx-accordion-group">
      <AccordionItem
        v-for="(item, index) in slice.primary.items"
        :index="index"
        :title="item.title ?? '-'"
        ref="accordions"
        @open="closeAllAccordions(index)"
        :content="item.content"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-accordion-group-container {
  display: flex;
  margin: 64px auto 150px;
  flex-direction: column;

  @media (max-width: $mobileBreakpoint) {
    margin-bottom: 50px;
  }

  .bx-title-container {
    margin-bottom: 2rem;

    @media (max-width: $mobileBreakpoint) {
      margin-bottom: 1rem;
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
