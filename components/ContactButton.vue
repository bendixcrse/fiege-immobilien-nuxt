<script setup lang="ts">
const props = defineProps(["link", "contact_name", "contact_image"]);
</script>

<template>
  <prismic-link v-if="link" :field="link">
    <div class="bx-button-container">
      <div class="bx-contact-image">
        <img :src="contact_image" :alt="contact_name" />
      </div>
      <div class="bx-button-text">
        <div class="bx-text">
          {{ link.text }}
        </div>
        <div class="bx-contact-name">
          <span v-if="contact_name">{{ contact_name }}</span>
          <span v-else>Contact Us</span>
        </div>
      </div>
      <div class="bx-arrow"></div>
    </div>
  </prismic-link>
</template>

<style lang="scss" scoped>
.bx-button-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0px 12px 0px 0px;
  cursor: pointer;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
  background-color: var(--background-color);
  color: var(--content-color);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  --content-color: #{$whiteColor};
  --background-color: #{$brandColor};

  &:hover {
    --content-color: #{$whiteColor};
    --background-color: #{$accentColor};

    .bx-arrow {
      left: 4px;
    }
  }

  .bx-contact-image {
    height: 48px;
    width: 48px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .bx-button-text {
    font-size: 14px;
    line-height: 1;

    .bx-text {
      font-weight: 500;
      font-size: 16px;
    }

    .bx-contact-name {
      font-size: 12px;
      margin-top: 4px;
    }
  }

  .bx-arrow {
    width: 24px;
    height: 24px;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-image: url(../assets/media/arrow-black.svg);
    background-color: var(--content-color);
    position: relative;
    left: 0px;
    transition: all 0.3s ease-in-out;
    flex-shrink: 0;
    margin-left: 8px;
  }
}
</style>
