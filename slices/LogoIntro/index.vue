<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.LogoIntroSlice>(["slice", "index", "slices", "context"])
);

const introAnimation = useLogoAnimation();
const finishedAnimation = ref(false);
const logoAnimation = ref(false);

onMounted(() => {
  setTimeout(() => {
    logoAnimation.value = true;

    setTimeout(() => {
      finishAnimation();
    }, 300);
  }, 600);
});

function finishAnimation() {
  logoAnimation.value = true;
  finishedAnimation.value = true;

  setTimeout(() => {
    introAnimation.value = false;
  }, 1000);
}
</script>

<template>
  <section
    v-if="introAnimation"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="bx-logo-intro-container"
    :class="{ 'logo-done': logoAnimation, finish: finishedAnimation }"
    @click="finishAnimation"
  >
    <!-- <div class="bx-logo-container">
      <div
        class="bx-logo"
        v-if="slice.primary.logo?.url"
        :style="{ '--logo-url': `url(${slice.primary.logo.url})` }"
      ></div>
    </div> -->
    <div class="bx-text-logo scroll-trigger animate--fade-in"><strong>Leif Fiege</strong> Immobilienmanagement</div>
  </section>
</template>

<style lang="scss" scoped>
.bx-logo-intro-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  margin: 0;
  min-height: 100svh;
  --logo-scale: 1;
  --logo-color: #{$brandColor};
  max-width: none;

  &.logo-done {
    .bx-logo-container {
      animation: none;
      opacity: 1;
    }

    .bx-text-logo {
      @media (min-width: $mobileBreakpoint) {
        font-size: 1.3rem;
        top: 30px;
      }

      @media (max-width: $mobileBreakpoint) {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
  }

  &.finish {
    pointer-events: none;
    --logo-scale: 2;
    --logo-color: #{$whiteColor};

    @media (max-width: $mobileBreakpoint) {
      --logo-scale: 1.5;
    }

    &::before {
      opacity: 0;
    }

    .bx-text-logo {
      @media (max-width: $mobileBreakpoint) {
        opacity: 0;
      }
    }

    .bx-logo-container {
      opacity: 0;
    }
  }

  &:before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($backgroundColor, 1);
    opacity: 1;
    // backdrop-filter: blur(15px);
    transition: opacity 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg);
    }
    50% {
      transform: translate(-50%, -50%) rotate(90deg);
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  .bx-text-logo {
    display: block;
    position: fixed;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    font-size: 1.5rem;
    line-height: 1;
    letter-spacing: -0.02rem;
    transition: all .6s ease-in-out;
    color: #555b77;
    
    strong {
      color: $brandColor;
      font-weight: 650;
    }

    @media (max-width: $mobileBreakpoint) {
      text-align: center;
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
  }

  .bx-logo-container {
    width: 75%;
    max-width: 112px;
    position: fixed;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(var(--logo-scale));
    opacity: 0;
    animation: 1s 0.3s forwards fadeIn;
    transition: all 0.5s ease-in-out, opacity 0.3s 0.3s ease-in-out;

    @media (max-width: $mobileBreakpoint) {
      max-width: 86px;
    }

    .bx-logo {
      width: 100%;
      height: 86px;
      background-color: var(--logo-color);
      mask-image: var(--logo-url);
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
      transition: all 0.3s ease-in-out;
      user-select: none;
    }
  }
}
</style>
