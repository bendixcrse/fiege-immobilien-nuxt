<script setup lang="ts">
import { components } from '~/slices'
const transparentHeader = useState('transparent_header')

const { localeProperties } = useI18n()
const prismic = usePrismic()
const route = useRoute()
const { data: page, error } =  useAsyncData(`${localeProperties.value.language}/${route.params.uid}`, () =>
  prismic.client.getByUID('page', route.params.uid as string, { lang: localeProperties.value.language })
);

watch(() => error.value, () => {
  if(error.value) showError({ statusCode: 404 })
}, { immediate: true })

watch(() => page.value, () => {
  useAlternateLanguages().value = page.value?.alternate_languages || []
  transparentHeader.value = page.value?.data?.transparent_header ?? false;
}, { immediate: true })

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
  <div>
    <div v-if="!page?.data?.slices || page?.data?.slices.length == 0" class="bx-title-container">
      <h1>{{ prismic.asText(page?.data?.title) }}</h1>
      <PrismicRichText wrapper="div" class="bx-page-description-container" :field="page?.data?.description" />
    </div>
    <SliceZone v-else wrapper="div" class="bx-slice-zone" :slices="page?.data?.slices ?? []" :components="components" />
  </div>
</template>

<style lang="scss" scoped>
.bx-title-container {
  width: $relativeWidth;
  max-width: $boxedWidth;
  margin: 100px auto;

  h1 {
    font-size: 26px;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 46px;
  }

  .bx-page-description-container {
    max-width: 1000px;
  }
}
</style>