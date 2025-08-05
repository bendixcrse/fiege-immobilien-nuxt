<script setup lang="ts">
defineProps(["subItems"]);
const hoveredMenuItem = useState("useHoveredMenuItem");
</script>

<template>
  <div class="bx-submenu-container">
    <ul>
      <li v-for="(link, linkIndex) of subItems" :key="linkIndex">
        <PrismicLink :document="link">{{ link.text }}</PrismicLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.bx-submenu-container {
  padding: 4px 32px 4px 12px;
  position: absolute;
  top: calc(100% + 26px);
  left: 0;
  background-color: $whiteColor;
  border: 1px solid $borderColor;
  border-top: 0;

  @media (max-width: $mobileBreakpoint) {
    display: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      padding: 4px 0;
      white-space: nowrap;

      a {
          color: var(--content-color);
          transition: color 0.3s ease-in-out;
          cursor: pointer;
        }

        &:hover a {
          color: $accentColor;
        }
    }
  }
}
</style>
