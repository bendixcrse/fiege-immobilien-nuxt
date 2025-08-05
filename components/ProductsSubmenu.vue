<script setup lang="ts">
const settings = useSettings();
const hoveredMenuItem = useState("useHoveredMenuItem");
</script>

<template>
  <div
    v-show="hoveredMenuItem == $t('products') && (settings?.data?.products?.length ?? 0) > 0"
    @mouseleave="hoveredMenuItem = null"
    class="bx-products-submenu-container"
  >
    <div class="bx-boxed">
      <div
        class="bx-product-item"
        v-for="(item, index) of settings?.data.products"
        :key="index"
      >
        <PrismicLink :document="item.link">
          <div v-if="!!item.image.url" class="bx-image">
            <MediaItem :prismicMedia="item.image" :ratio="0.46" />
          </div>

          <h3>{{ item.title }}</h3>
        </PrismicLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bx-products-submenu-container {
  position: sticky;
  width: 100%;
  padding: 10px 0 0;
  border-top: 1px solid rgba(#fff, .05);
  margin-top: 10px;

  @media (max-width: $mobileBreakpoint) {
    display: none;
  }

  .bx-boxed {
    display: flex;
    flex-flow: nowrap;
    overflow-x: scroll;
    gap: 12px;

    .bx-product-item {
      flex: 1;
      max-width: 160px;

      a {
        color: #fff;
        transition: color .3s ease-in-out;
      }

      h3 {
        color: inherit;
        font-size: 12px;
        margin: 6px 0 0;
        text-transform: uppercase;
        font-weight: 300;
      }

      &:hover a {
        color: $accentColor;
      }
    }
  }
}
</style>
