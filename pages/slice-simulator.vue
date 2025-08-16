<script setup lang="ts">
import { SliceSimulator } from "@slicemachine/adapter-nuxt/simulator";
import { components } from "~/slices";

definePageMeta({
  layout: "clean",
});
</script>

<template>
  <SliceSimulator v-slot="{ slices }">
    <SliceZone
      wrapper="div" class="bx-slice-zone"
      :slices="slices"
      :components="components"
    />
  </SliceSimulator>
</template>
