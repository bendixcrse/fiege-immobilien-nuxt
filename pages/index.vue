<script setup lang="ts">
import { components } from "~/slices";
const transparentHeader = useTransparentHeader();
const { localeProperties } = useI18n();
const prismic = usePrismic();

const { data: page } = useAsyncData(`${localeProperties.value.language}/index`, () =>
  prismic.client.getByUID("page", "home", { lang: localeProperties.value.language })
);

watch(
  () => page.value,
  () => {
    useAlternateLanguages().value = page.value?.alternate_languages || [];
    transparentHeader.value = page.value?.data.transparent_header ?? true;
  },
  { immediate: true }
);

useSeoMeta({
  title: () => page.value?.data.meta_title ?? prismic.asText(page.value?.data.title),
  ogTitle: () => page.value?.data.meta_title ?? prismic.asText(page.value?.data.title),
  description: () => page.value?.data.meta_description,
  ogDescription: () => page.value?.data.meta_description,
  ogImage: () => page.value?.data.meta_image?.url,
});

useHead({
  titleTemplate: '%s'
})
</script>

<template>
  <SliceZone wrapper="div" class="bx-slice-zone" :slices="page?.data.slices ?? []" :components="components" />
</template>
