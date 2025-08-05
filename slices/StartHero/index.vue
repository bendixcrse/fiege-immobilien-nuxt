<script setup lang="ts">
import { type Content } from "@prismicio/client";
const section = ref(null)

defineProps(
  getSliceComponentProps<Content.StartHeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

function scrollToFirstSection() {
  window.scrollTo({
    top: section.value.clientHeight,
    behavior: "smooth",
  });
}
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    ref="section"
    class="bx-start-hero-container"
  >
    <div v-if="slice.primary.background_media" class="bx-background-media">
      <video
        v-if="slice.primary.background_media?.url?.includes('.mp4')"
        :src="slice.primary.background_media.url"
        loop
        muted
        autoplay
        playsinline
      ></video>
      <img v-else :src="slice.primary.background_media.url" />

      <div v-if="slice.primary.secondary_background_media.url" class="bx-secondary-image">
        <MediaItem
          :prismicMedia="slice.primary.secondary_background_media"
        />
      </div>
    </div>

    <div class="bx-content-container">
      <div
        class="bx-overline animate--slide-in scroll-trigger"
        :style="{ '--animation-order': '1' }"
      >
        {{ slice.primary.overline }}
      </div>

      <h1
        v-html="slice.primary.title?.replaceAll('\n', '<br>')"
        class="animate--slide-in scroll-trigger"
        :style="{ '--animation-order': '2' }"
      ></h1>

      <div
        v-if="slice.primary.description"
        class="bx-description animate--slide-in scroll-trigger"
        :style="{ '--animation-order': '3' }"
      >
        <PrismicRichText wrapper="div" :field="slice.primary.description" />
      </div>

      <Button
        :light="true"
        :link="slice.primary.button"
        :style="{ '--animation-order': '4' }"
        class="animate--slide-in scroll-trigger"
        @click.native="
          slice.primary.button.link_type != 'Any' ? null : scrollToFirstSection()
        "
      />

      <div class="bx-boxes-container" v-if="slice.items.length > 0">
        <div
          v-for="(box, index) in slice.items"
          class="bx-box-item animate--slide-in scroll-trigger"
          :key="index"
          :style="{ '--animation-order': index + 3 }"
        >
          <h2>{{ box.title }}</h2>
          <div class="bx-description">
            <PrismicRichText wrapper="div" :field="box.description" />
          </div>
          <Button :light="true" :link="box.button" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-start-hero-container {
  position: relative;
  background: $darkBackgroundColor;
  min-height: 76svh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  max-width: none;
  margin: 0;

  @media (max-width: $mobileBreakpoint) {
    min-height: auto;
  }

  .bx-content-container {
    position: relative;
    z-index: 1;
    width: $relativeWidth;
    max-width: $boxedWidth;
    margin: auto;
    margin-bottom: 0;
    padding: 180px 0 70px;
    color: #fff;

    @media (max-width: $mobileBreakpoint) {
      padding: 22px 0 26px;
    }

    h1 {
      font-size: 32px;
      width: 100%;
      line-height: 1.2;
      margin: 8px 0 22px;
      text-shadow: 0px 2px 15px rgba(0, 0, 0, 0.18);
      max-width: 1000px;

      @media (max-width: $mobileBreakpoint) {
        width: 95%;
        font-size: 24px;
        margin: 12px 0;
      }
    }

    .bx-description {
      max-width: 1000px;
      margin-bottom: 32px;
      max-width: 700px;

      :deep(p) {
        font-size: 18px;
        line-height: 1.5;

        @media (max-width: $mobileBreakpoint) {
          font-size: 16px;
        }
      }
    }

    :deep(.bx-button-container) {
      --content-color: #fff;
    }

    .bx-boxes-container {
      display: flex;
      gap: 16px;
      margin: 38px 0;
      align-items: flex-start;

      @media (max-width: $mobileBreakpoint) {
        flex-direction: column;
        gap: 8px;
        margin: 18px 0 32px;
      }

      .bx-box-item {
        border-radius: 14px;
        backdrop-filter: blur(40px);
        overflow: hidden;
        padding: 16px 24px 24px;
        background-color: rgba($whiteColor, 0.1);
        max-width: 370px;

        @media (max-width: $mobileBreakpoint) {
          padding: 10px 18px 14px;
          max-width: none;
        }

        h2 {
          font-weight: bold;
          font-size: 18px;
          text-transform: uppercase;
          margin: 0 0 8px;
        }

        .bx-description {
          font-size: 13px;
          width: 95%;
          max-width: 900px;

          :deep(p) {
            margin: 0;
            line-height: 1.3;
          }
        }
      }
    }
  }

  .bx-background-media {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $darkBackgroundColor;

    @media (max-width: $mobileBreakpoint) {
      position: relative;
      height: 36svh;
    }

    .bx-secondary-image {
      position: absolute;
      top: 0;
      right: 0;
      width: 40%;
      height: 100%;
      z-index: 1;
    }

    img,
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center right;
      z-index: 0;
      opacity: 0.75;
      
      @media(max-width: $mobileBreakpoint) {
        object-position: bottom right;
      }
    }
  }
}
</style>
