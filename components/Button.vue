<script setup lang="ts">
const props = defineProps(["link", "text", "light"]);
const buttonText = computed(() => props.link.text ?? props.text ?? "");
</script>

<template>
  <prismic-link v-if="link && buttonText" :field="link">
    <div class="bx-button-container" :class="{ light: light }">
      <div class="bx-arrow"></div>
      <div class="bx-text">
        {{ buttonText }}
      </div>
    </div>
  </prismic-link>
  <div class="bx-button-container" v-else-if="buttonText" :class="{ light: light }">
    <div class="bx-arrow"></div>
    <div class="bx-text">
      {{ buttonText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bx-button-container {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  --content-color: #{$darkBackgroundColor};
  cursor: pointer;
  color: var(--content-color);

  @media (max-width: $mobileBreakpoint) {
    gap: 12px;
  }

  &.light {
    --content-color: #{$whiteColor};
  }

  .bx-arrow {
    width: 33px;
    height: 28px;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: bottom;
    mask-image: url(../assets/media/button-arrow.svg);
    background-color: var(--content-color);

    @media (max-width: $mobileBreakpoint) {
        width: 24px
    }
  }

  &:hover {
    .bx-text {
      &:after {
        width: 0;
        right: 100%;
        transition: width 0.3s ease, right 0s linear 0.3s;
      }
    }
  }

  .bx-text {
    position: relative;
    font-size: 1.125em;

    &:after {
      content: "";
      transition: all 0.3s ease-in-out;
      position: absolute;
      bottom: -1px;
      width: 100%;
      height: 1px;
      right: 0;
      background-color: var(--content-color);
      transition: width 0.3s ease, right 0.3s ease;
    }
  }
}
</style>
