<script setup lang="ts">
import type { NuxtError } from "#app";

const { locale } = useI18n()

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: `/${locale.value}` });
</script>

<template>
  <NuxtLayout>
    <div class="bx-error-page-content-container bx-boxed">
      <h1>Not found</h1>
      <Button @click.native="handleError" :text="'Back to Home'"></Button>
    </div>
  </NuxtLayout>
</template>


<style scoped lang="scss">
.bx-error-page-content-container {
    margin: 250px auto;

    h1 {
        text-transform: none;
        margin: 24px 0 34px;
        line-height: 1;
    }
}
</style>