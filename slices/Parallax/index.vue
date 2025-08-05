<script setup lang="ts">
import { type Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.ParallaxSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const hasContent = computed(() => {
  return props.slice.primary.title || props.slice.primary.description[0];
});
const sectionRef = ref(null);
const percentageScrolled = ref(0);

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
})
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
})

function handleScroll() {
  if (!sectionRef.value) return;
  let section: any = sectionRef.value;

  let sectionBottom = section.getBoundingClientRect().bottom;
  let windowHeight = window.innerHeight;
  let sectionHeight = section.getBoundingClientRect().height;

  let sectionInView = 1 - (sectionBottom / (windowHeight + sectionHeight));
  sectionInView = Math.max(0, Math.min(sectionInView, 1));

  percentageScrolled.value = Math.round(sectionInView * 1000) / 1000;
}
</script>

<template>
  <section ref="sectionRef" class="bx-parallax-container" :id="slice.primary.anchor_id ?? ''" :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation" :class="{ 'no-content': !hasContent }"
    :style="{ '--desktop-ratio': `${(slice.primary?.desktop_ratio ?? 0.33) * 100}%`, '--mobile-ratio': `${(slice.primary?.desktop_ratio ?? 1) * 100}%`, '--percentage-scrolled': `${percentageScrolled * 100}%` }">
    <MediaItem :prismicMedia="slice.primary.background_media" :ratio="0" />

    <div v-if="hasContent" class="bx-content-container" :style="{'--vertical-spacing': `${slice.primary.content_vertical_spacing ?? 100 }px`, '--mobile-vertical-spacing': `${slice.primary.mobile_content_vertical_spacing ?? 150 }px` }">
      <div class="bx-boxed">
        <div class="bx-overline">{{ slice.primary.overline }}</div>
        <component :is="slice.primary.title_tag ?? 'h2'">{{ slice.primary.title }}</component>
        <PrismicRichText wrapper="div" class="bx-description" :field="slice.primary.description"
          v-if="slice.primary.description[0]" />

        <Button :light="true" :link="slice.primary.button" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-parallax-container {
  position: relative;
  background-color: $blackColor;
  overflow: hidden;
  max-width: none;
  width: 100%;
  margin: 0;

  &.no-content {
    &:before {
      content: "";
      display: block;
      padding-bottom: var(--desktop-ratio);

      @media(max-width: $mobileBreakpoint) {
        padding-bottom: var(--mobile-ratio);
      }
    }
  }

  &:not(.no-content) {
    &:after {
      content: "";
      display: block;
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      background: $darkBackgroundColor;
      opacity: .6;
    }
  }

  .bx-background-media {
    --height-scale: 1.3;
    --transform-end: calc(1 - (1 / var(--height-scale)));
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(var(--height-scale) * 100%);
    z-index: 0;
    will-change: transform;
    transform: translateY(calc(var(--percentage-scrolled) * var(--transform-end) * -1));

    @media(max-width: $mobileBreakpoint) {
      --height-scale: 1.2;
    }
  }

  .bx-content-container {
    position: relative;
    z-index: 3;
    padding: var(--vertical-spacing) 0;
    
    @media(max-width: $mobileBreakpoint) {
      padding: var(--mobile-vertical-spacing) 0;
    }

    .bx-boxed {
      display: flex;
      flex-direction: column;
      gap: 22px;
      color: #fff;
      text-align: center;
      justify-content: center;
      align-items: center;
      min-height: 250px;

      h1,
      h2 {
        margin: 0;
        line-height: 1;
        text-transform: uppercase;
        color: #fff;
        background: none;
        -webkit-text-fill-color: unset;
      }
      
      h1 {
        font-size: 42px;

        @media(max-width: $mobileBreakpoint) {
          font-size: 32px;
        }
      }

      :deep(a) {
        color: #fff;
      }

      .bx-description {
        max-width: 600px;
        width: 90%;

        :deep(p) {
          margin: 0;
        }
      }
    }
  }
}
</style>