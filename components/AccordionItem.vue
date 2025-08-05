<script setup lang="ts">
const emit = defineEmits(['open']);
const isOpen = ref(false);
const sectionRef = ref();
const contentRef = ref();
const contentMaxHeight = ref(0);

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Object,
    required: true
  },
  index: Number
});

function toggleAccordion() {
  if (isOpen.value) {
    close();
  } else {
    open();
  }
}

function open() {
  // emit('open'); /* close all */
  isOpen.value = true;

  setTimeout(() => {
    // const yOffset = window.innerWidth < 800 ? -55 : -70;
    // const y = sectionRef.value.getBoundingClientRect().top + window.scrollY + yOffset;
    // window.scrollTo({ top: y, behavior: 'smooth' });
    
    contentMaxHeight.value = contentRef.value.scrollHeight;
  }, 100);
}

function close() {
  contentMaxHeight.value = 0;
  isOpen.value = false;
}

defineExpose({
  close
})
</script>

<template>
  <div class="bx-accordion-item-container" ref="sectionRef" :class="{ 'open': isOpen }">
    <div @click="toggleAccordion" class="bx-title-button-container">
      <h3>{{ title }}</h3>
      <div class="bx-icon"></div>
    </div>

    <div class="bx-content-container" ref="contentRef" :style="{ 'max-height': `${contentMaxHeight}px` }">
      <PrismicRichText class="bx-richtext" wrapper="div" :field="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bx-accordion-item-container {
  border-top: 1px solid $blackColor;
  border-bottom: 1px solid $blackColor;
  padding: 26px 0;

  @media(max-width: $mobileBreakpoint) {
    padding: 22px 0;
  }

  &.open {
    .bx-title-button-container .bx-icon {
      transform: rotate(180deg);

      &:after {
        transform: translate(-50%, -50%) rotate(0);
      }
    }
  }

  .bx-content-container {
    transition: max-height .3s ease-in-out;
    overflow: hidden;

    .bx-richtext {
      padding: 16px 0 0;
    }

    &:deep(h1,
      h2,
      h3,
      h4,
      h5) {
        text-transform: uppercase;
        margin-top: 48px;
    }
    
    &:deep(ul, p) {
      @media(max-width: $mobileBreakpoint) {
        font-size: 16px;
      }
    }
  }

  .bx-title-button-container {
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    @media(max-width: $mobileBreakpoint) {
      font-size: 16px;
    }

    h3 {
      margin: 0;
      text-transform: uppercase;
    }

    .bx-icon {
      height: 36px;
      width: 36px;
      position: relative;
      transition: all .3s ease-in-out;

      @media(max-width: $mobileBreakpoint) {
        width: 26px;
        height: 26px;
      }

      &:before,
      &:after {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: $blackColor;
        transition: all .3s ease-in-out;
      }

      &:after {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
  }
}
</style>