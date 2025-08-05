<script setup lang="ts">
const { $initializeScrollAnimationTrigger } = useNuxtApp()
onMounted(() => {
  setTimeout(() => $initializeScrollAnimationTrigger(), 1000)
})
</script>

<template>
    <NuxtLoadingIndicator :height="3" color="#000" />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>