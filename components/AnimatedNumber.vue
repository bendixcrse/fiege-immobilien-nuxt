<script setup lang="ts">
const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
  },
  name: {
    type: String,
  },
});

const shownNumber = computed(() => props.number);
</script>

<template>
  <div class="bx-animated-number">
    <div class="bx-number-wrapper">
      <div class="bx-number">{{ shownNumber }}</div>
      <div class="bx-unit">{{ unit }}</div>
    </div>
    <div class="bx-name">{{ name }}</div>
  </div>
</template>

<style lang="scss" scoped>
.bx-animated-number {
  display: flex;
  flex-direction: column;
  align-items: center;

  .bx-number-wrapper {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    font-size: 5rem;
    font-weight: 600;
  }

  .bx-name {
    font-size: 1.2rem;
    // font-weight: 300;
  }
}
</style>
