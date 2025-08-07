<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.TeamSlice>(["slice", "index", "slices", "context"])
);
</script>

<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="bx-team-grid-container">
      <div
        class="bx-team-member-item"
        v-for="(member, index) of slice.primary.members"
        :key="index"
      >
        <div class="bx-image-wrapper">
          <MediaItem :prismicMedia="member.image" :ratio="1" />
        </div>
        <div class="bx-member-info">
          <h3>{{ member.name }}</h3>
          <div class="bx-role">{{ member.role }}</div>
          <a v-if="!!member.email" href="mailto:{{ member.email }}">{{ member.email }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bx-team-grid-container {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid $blackColor;
  border-bottom: 1px solid $blackColor;

  .bx-team-member-item {
    flex: 0 0 calc(33.3333% - 2px);
    overflow: hidden;
    position: relative;
    font-size: 18px;
    color: #000;
    border-right: 1px solid $blackColor;
    border-bottom: 1px solid $blackColor;
    margin-bottom: -1px;

    @media (max-width: $mobileBreakpoint) {
      flex: 0 0 calc(50% - 1px);
      font-size: 16px;
    }

    &:nth-child(3n) {
      @media (min-width: $mobileBreakpoint) {
        border-right: 0;
      }
    }

    &:nth-child(2n) {
      @media (max-width: $mobileBreakpoint) {
        border-right: 0;
      }
    }

    &:hover {
      color: #fff;

      .bx-image-wrapper {
        opacity: 1;
      }
    }

    .bx-image-wrapper {
      position: relative;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      z-index: 0;
      background: #000;
    }

    .bx-member-info {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 2em;
      box-sizing: border-box;
      z-index: 0;

      @media (max-width: $mobileBreakpoint) {
        padding: 1em;
      }

      h3 {
        margin-top: 0;
        margin-bottom: auto;
        transition: color 0.3s ease-in-out;
        font-size: 1.5em;

        @media (max-width: $mobileBreakpoint) {
          font-size: 1.3em;
        }
      }

      .bx-role {
        transition: color 0.3s ease-in-out;
      }

      a {
        transition: color 0.3s ease-in-out;
        color: inherit;
      }
    }
  }
}
</style>
