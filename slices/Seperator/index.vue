<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.SeperatorSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <div
    class="bx-seperator"
    :class="{ 'with-line': slice.primary.show_line ?? true }"
    :id="slice.primary.anchor_id"
    :style="{
      '--spacing-top': slice.primary.top_space + 'px',
      '--spacing-bottom': slice.primary.bottom_space + 'px',
    }"
  ></div>
</template>
<style lang="scss" scoped>
.bx-seperator {
  height: 1px;
  width: 100%;
  display: block;
  margin-top: var(--spacing-top, 26px);
  margin-bottom: var(--spacing-bottom, 26px);

  &.with-line {
    background-color: $blackColor;
  }
}
</style>
