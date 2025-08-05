<script setup lang="ts">
import { type Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.LogosSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const contentMarquee = ref(null);
const translateX = ref(0);
const gap = ref(20);
const animationRequest = ref(null);
const isDirectionLeft = ref(true);

onMounted(async () => {
  let relativeGap = window.innerWidth < 800 ? 0.1 : 0.05
  gap.value = window.innerWidth * relativeGap;

  let sideSpacing = gap.value / 2;
  let initProgress = isDirectionLeft.value ? sideSpacing : (sideSpacing * -1);
  let speed = isDirectionLeft.value ? 1 : -1;
  let progress = initProgress;

  const loop = () => {
    const elWidth = contentMarquee?.value?.offsetWidth ?? 0 / 2;
    progress = progress - speed;

    if (progress <= elWidth * -1 || progress >= elWidth) { progress = initProgress; }
    translateX.value = progress;
    animationRequest.value = window.requestAnimationFrame(loop);
  };
  loop();
});

onUnmounted(() => {
  cancelAnimationFrame(animationRequest.value);
})
</script>

<template>
  <section class="bx-logos-row-container" id="partners" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="bx-inner-marque" ref="contentMarquee" :style="{ 'transform': `translateX(${translateX}px)`, gap: `${gap}px` }">
      <template v-for="index in 6">
        <div v-for="logo in slice.items" class="bx-logo-item">
          <img v-if="logo.logo.url" :alt="logo.company" :src="logo.logo.url" />
          <div v-else class="bx-text-logo">{{ logo.company }}</div>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-logos-row-container {
  max-width: none;
  width: 100%;
  margin: 4px auto;
  background-color: $backgroundColor;
  padding: 32px 0;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  &:after,
  &:before {
    content: "";
    position: absolute;
    height: 100%;
    width: calc(((100% - #{$boxedWidth}) / 2) + 10%);
    top: 0;
    z-index: 9;
  }
  
  &:before {
    left: 0;
    background: linear-gradient(90deg, $backgroundColor, $backgroundColor 50%, rgba($backgroundColor, 0));
  }
  
  &:after {
    right: 0;
    background: linear-gradient(270deg, $backgroundColor, $backgroundColor 50%, rgba($backgroundColor, 0));
  }

  .bx-inner-marque {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    flex-flow: nowrap;
    will-change: transform;

    &::-webkit-scrollbar {
      display: none;
    }

    .bx-logo-item {
      display: flex;
      align-items: center;

      img {
        max-width: 176px;
        height: 32px;
        object-fit: contain;
        object-position: center left;

        @media(max-width: $mobileBreakpoint) {
          height: 22px;
          max-width: 100px;
        }
      }

      .bx-text-logo {
        font-size: 18px;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 1px;
        
        @media(max-width: $mobileBreakpoint) {
          font-size: 16px;
        }
      }
    }
  }
}
</style>