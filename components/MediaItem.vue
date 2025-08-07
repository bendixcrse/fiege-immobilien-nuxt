<script setup lang="ts">
defineProps({
  prismicMedia: {
    type: Object,
    required: true,
  },
  ratio: {
    type: Number,
    default: 0.6,
  },
});
</script>

<template>
  <div
    v-if="prismicMedia"
    class="bx-background-media"
    :style="{ '--media-ratio': `${ratio * 100}%` }"
  >
    <video
      v-if="prismicMedia.url?.includes('mp4')"
      :src="prismicMedia.url"
      loop
      muted
      autoplay
      playsinline
    ></video>
    <PrismicImage
      v-else-if="prismicMedia"
      :field="{
        dimensions: prismicMedia.dimensions ?? { width: prismicMedia.width, height: prismicMedia.height },
        ...prismicMedia,
      }"
      draggable="false" :imgixParams="{w: 1500, fit: 'max' }"
    />
  </div>
</template>

<style lang="scss" scoped>
.bx-background-media {
  position: relative;
  width: 100%;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    padding-bottom: var(--media-ratio, 60%);
  }

  img,
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
