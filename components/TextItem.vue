<script setup lang="ts">
defineProps([
  "media",
  "isKeyPoint",
  "underlined",
  "overline",
  "title",
  "description",
  "button",
]);
</script>

<template>
  <div class="bx-text-item-container" :class="{ 'is-keypoint': isKeyPoint }">
    <PrismicLink class="bx-image-link" :document="button" v-if="media && media.url">
      <MediaItem class="bx-media" :ratio="0.55" :prismic-media="media" />
      <div v-if="!!button" class="bx-button"></div>
    </PrismicLink>
    <div v-if="underlined" class="bx-underline">{{ underlined }}</div>
    <div v-if="overline" class="bx-overline">{{ overline }}</div>
    <h3 v-if="title">{{ title }}</h3>
    <PrismicRichText
      v-if="description"
      wrapper="div"
      :field="description"
      class="bx-description"
    />
    <Button :link="button" v-if="!!button" />
  </div>
</template>

<style lang="scss" scoped>
.bx-text-item-container {
  margin: 26px 0;

  @media (max-width: $mobileBreakpoint) {
    margin: 16px 0;
  }

  .bx-media {
    margin-bottom: 28px;
    opacity: 0.9;
    transition: all 0.3s ease-in-out;

    @media (max-width: $mobileBreakpoint) {
      margin-bottom: 18px;
    }
  }

  &:hover {
    .bx-media {
      opacity: 1;
    }
  }

  .bx-image-link {
    position: relative;
    display: block;

    .bx-button {
      position: absolute;
      bottom: 18px;
      right: 18px;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      background-color: rgba(#000, 0.3);
      z-index: 1;
      transform: scale(0.5);
      opacity: 0;
      transition: all 0.3s ease-in-out;

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        mask-image: url(~/assets/media/arrow-black.svg);
        mask-position: center;
        mask-repeat: no-repeat;
        mask-size: 18px;
        background-color: #fff;
      }
    }

    &:hover {
      .bx-button {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  .bx-underline {
    font-size: 16px;
    text-transform: uppercase;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .bx-overline {
    text-transform: uppercase;
    font-size: 16px;
    line-height: 1.5;
    color: $darkGrey;
    font-weight: bold;
  }

  h3 {
    text-transform: uppercase;
    font-size: 16px;
    line-height: 1.5;
    width: 95%;
    color: $fontColor;

    @media (max-width: $mobileBreakpoint) {
      width: 95%;
      font-size: 16px;
    }
  }

  .bx-description {
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    color: $fontColor;

    @media (max-width: $mobileBreakpoint) {
      margin: 14px 0;
    }
  }

  &.is-keypoint {
    h3 {
      display: flex;
      gap: 24px;
      margin: 0;

      @media (max-width: $mobileBreakpoint) {
        gap: 12px;
      }

      &::before {
        content: "";
        display: block;
        width: 40px;
        flex: 0 0 40px;
        height: 5px;
        background-color: $accentColor;
        position: relative;
        top: 7px;

        @media (max-width: $mobileBreakpoint) {
          width: 26px;
          flex: 0 0 26px;
        }
      }
    }

    .bx-description {
      text-align: left;
    }
  }

  :deep(.bx-button-container) {
    margin-bottom: 34px;
  }
}
</style>
