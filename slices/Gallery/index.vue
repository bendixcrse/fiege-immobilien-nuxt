<script setup lang="ts">
import { type Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.GallerySlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const slider = ref(null);
const swiperProgress = ref(0);
const swiperRef = ref(null);
useSwiper(swiperRef, {
  mousewheel: {
    invert: false,
    forceToAxis: true
  },
  freeMode: {
    enabled: true,
    sticky: true,
    momentumBounce: false,
    momentumRatio: 0.1
  },
  parallax: true,
  slidesPerView: 'auto',
  spaceBetween: 8,
  centeredSlides: true,
  loop: true,
  on: {
    init: (s: any) => {
      slider.value = s
    },
    realIndexChange: (swiper: any) => {
      swiperProgress.value =
        (swiper.realIndex % props.slice.items.length) / (props.slice.items.length - 1);
    },
  },
});
</script>

<template>
  <section
    class="bx-gallery-section-container"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="bx-title-description-container bx-boxed">
      <div class="bx-overline">{{ slice.primary.overline }}</div>
      <h2>{{ slice.primary.title }}</h2>
      <PrismicRichText wrapper="div" class="bx-description" :field="slice.primary.description" />
    </div>

    <ClientOnly>
      <swiper-container ref="swiperRef" :init="false" class="bx-slide-items-container">
        <swiper-slide
          v-for="(item, index) of slice.items.concat(slice.items)"
          class="bx-media-item"
          :key="'slide-index' + index"
        >
          <video
            v-if="item.media.kind == 'video'"
            :src="item.media.url"
            loop
            muted
            autoplay
            playsinline
          ></video>
          <template v-else>
            <PrismicImage
              class="bx-background-blur"
              draggable="false"
              :field="item.media"
              :imgixParams="{ w: 50 }"
            />
            <span class="bx-blur-layer"></span>
            <PrismicImage
              data-swiper-parallax="5%"
              draggable="false"
              :field="item.media"
              :imgixParams="{ w: 1500, fit: 'max' }"
            />
          </template>
        </swiper-slide>
      </swiper-container>
      <div v-if="slider" class="bx-controls-container bx-boxed">
        <div class="bx-progress-bar">
          <div class="bx-progress" :style="{ width: `${swiperProgress * 100}%` }"></div>
        </div>
        <div class="bx-arrows">
          <div class="bx-arrow prev" @click="slider?.slidePrev()"></div>
          <div class="bx-arrow next" @click="slider?.slideNext()"></div>
        </div>
      </div>
    </ClientOnly>
  </section>
</template>

<style lang="scss" scoped>
.bx-gallery-section-container {
  margin: 26px auto;
  max-width: none;
  width: 100%;

  @media (max-width: $mobileBreakpoint) {
    margin: 16px auto;
  }

  .bx-title-description-container {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;

    h2 {
      margin: 0;
    }
  }

  .bx-slide-items-container {
    line-height: 1;
    width: 100%;
    user-select: none;

    .bx-media-item {
      position: relative;
      background-color: #252525;
      overflow: hidden;
      width: 75%;
      max-width: calc($boxedWidth / 1.5);

      @media (max-width: $mobileBreakpoint) {
        width: 85%;
      }

      &:before {
        content: "";
        display: block;
        padding-bottom: 60%;

        @media (max-width: $mobileBreakpoint) {
          padding-bottom: 120%;
        }
      }

      .bx-background-blur {
        object-fit: cover;
        transform: scale(1);
        opacity: 0.7;
        z-index: 0;
      }

      .bx-blur-layer {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        z-index: 1;
      }

      video,
      img {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        object-fit: contain;
        object-position: center;
        z-index: 2;
        pointer-events: none;
      }
    }
  }
}
</style>
