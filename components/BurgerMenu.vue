<script setup lang="ts">
const burgerMenu = useBurgerMenuOpen();
const settings = useSettings();

function closeMenu() {
  burgerMenu.value = false;
}

function submenuHasItems(subItems: any) {
  let nonEmptyItems = subItems.filter((item: any) => !!item.text);
  return nonEmptyItems.length > 0;
}
</script>

<template>
  <Transition name="burgerMenu">
    <div v-show="burgerMenu" class="bx-burger-menu-container">
      <div class="bx-menu-container">
        <div class="bx-centered">
          <div
            v-for="(item, index) in settings?.data.menu"
            :key="index"
            class="bx-menu-item"
          >
            <prismic-link @click="closeMenu" :field="item.parent_link">{{
              item.parent_link.text
            }}</prismic-link>

            <div class="bx-submenu-container" v-if="submenuHasItems(item.sub_items)">
              <ul>
                <li v-for="(link, linkIndex) of item.sub_items" :key="linkIndex">
                  <PrismicLink @click="closeMenu" :document="link">{{
                    link.text
                  }}</PrismicLink>
                </li>
              </ul>
            </div>

            <div
              v-if="
                item.parent_link.text == $t('products') &&
                settings?.data.products.length > 0
              "
              class="bx-products-row-container"
            >
              <div
                @click="closeMenu"
                class="bx-product-item"
                v-for="(item, index) of settings?.data.products"
                :key="index"
              >
                <PrismicLink :document="item.link">
                  <div v-if="!!item.image.url" class="bx-image">
                    <MediaItem :prismicMedia="item.image" :ratio="9 / 16" />
                  </div>

                  <h3>{{ item.title }}</h3>
                </PrismicLink>
              </div>
            </div>
          </div>
        </div>

        <div class="bx-menu-item cta">
          <!-- <PrismicLink class="bx-cta-button" :document="settings?.data.cta_button">{{
            settings?.data.cta_button.text
          }}</PrismicLink> -->

          <ContactButton
            class="bx-contact-button"
            v-if="settings?.data.cta_button"
            :link="settings?.data.cta_button"
            :contact_name="'Johann Oesterwind'"
            :contact_image="'https://images.prismic.io/bmms/aECh0bh8WN-LVnyM_1748419527118.jpeg?auto=format,compress&fit=crop&w=200&h=200'"
          ></ContactButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.burgerMenu-enter-active,
.burgerMenu-leave-active {
  transition: all 0.3s ease;
}

.burgerMenu-enter-from,
.burgerMenu-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.bx-burger-menu-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  backdrop-filter: blur(20px);
  z-index: 99;
  text-align: center;
  background-color: rgba($darkBackgroundColor, 0.95);
  z-index: 999;
  color: #fff;

  align-items: flex-start;
  padding: 96px 0 76px;
  justify-content: center;
  text-align: left;
  box-sizing: border-box;

  .bx-products-row-container {
    display: flex;
    flex-flow: nowrap;
    overflow-x: scroll;
    gap: 6px;
    margin: 2px 0 12px;
    padding: 12px 0;

    .bx-product-item {
      flex: 0 0 60%;

      a {
        color: #fff;
        transition: color 0.3s ease-in-out;
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

  .bx-menu-container {
    width: $relativeWidth;
    max-width: $boxedWidth;
    height: 100%;
    display: flex;
    flex-direction: column;

    .bx-centered {
      display: flex;
      flex-direction: column;
      gap: 32px;
      align-items: center;
      margin: auto;
    }

    .bx-menu-item {
      &:not(.has-button) {
        a {
          color: inherit;
          font-size: 24px;
        }
      }

      &.cta {
        width: 100%;

        .bx-contact-button {
          :deep(.bx-button-container) {
            gap: 12px;
            --content-color: #{$fontColor};
            --background-color: #{$accentColor};

            .bx-contact-image {
              height: 42px;
              width: 42px;
            }

            .bx-button-text {
              font-size: 16px;

              .bx-contact-name {
                font-size: 14px;
              }
            }

            .bx-arrow {
              margin-left: auto;
            }
          }
        }
      }

      .bx-submenu-container {
        margin: 0 0 16px 0;

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;

          li {
            padding: 2px 0;
            display: flex;
            align-items: center;
            gap: 12px;

            &::before {
              content: "";
              display: block;
              width: 22px;
              height: 1px;
              background-color: #fff;
              opacity: 0.5;
            }

            a {
              font-weight: 300;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
