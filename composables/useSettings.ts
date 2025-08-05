export const useSettings = () => {
    const { localeProperties } = useI18n()
    const prismic = usePrismic()
    return useAsyncData(
      '$settings',
      () => prismic.client.getSingle('general_settings', { lang: localeProperties.value.language }),
      { watch: [localeProperties]}
    ).data
  }