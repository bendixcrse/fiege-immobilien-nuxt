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

const observer = ref<IntersectionObserver | null>(null);
const animatedNumber = ref(0);
const elementRef = ref<HTMLElement | null>(null);
const hasAnimated = ref(false);

const isDecimal = computed(() => props.number % 1 !== 0);

const displayedNumber = computed(() => {
  return isDecimal.value
    ? animatedNumber.value.toFixed(1).replace(".", ",")
    : Math.round(animatedNumber.value);
});

function startCounting() {
  const steps = Math.min(32, props.number);
  const duration = Math.min(steps * 100, 2500);
  const interval = duration / steps;
  const increment = props.number / steps;

  let current = 0;
  const counter = setInterval(() => {
    current += increment;
    if (current >= props.number) {
      animatedNumber.value = props.number;
      clearInterval(counter);
    } else {
      animatedNumber.value = current;
    }
  }, interval);
}

onMounted(() => {
  if (elementRef.value) {
    observer.value = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true;
          startCounting();
        }
      },
      { threshold: 0.6 }
    );

    // Fix page transition
    setTimeout(() => {
      if (elementRef.value && observer.value) observer.value.observe(elementRef.value);
    }, 1000);
  }
});

onUnmounted(() => {
  if (elementRef.value && observer.value) {
    observer.value.unobserve(elementRef.value);
  }
});
</script>

<template>
  <div class="bx-animated-number" ref="elementRef">
    <div class="bx-number-wrapper">
      <div class="bx-number">{{ displayedNumber }}</div>
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
    text-align: center;
  }
}
</style>
