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
      <div class="bx-image-container">
        <PrismicImage
          v-if="settings?.data.menu_image?.url"
          :field="settings?.data.menu_image"
        />
      </div>
      <div class="bx-menu-container">
        <div class="bx-centered">
          <div class="bx-overline">Menu</div>
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
          </div>

          <div class="bx-contact-information-container">
            <div class="bx-overline">Kontaktinformation</div>
            <div class="bx-contact-items-container">
              <div class="bx-contact-item email">
                <a :href="'mailto:' + settings?.data.contact_email">{{
                  settings?.data.contact_email
                }}</a>
              </div>
              <div class="bx-contact-item telephone">
                <a :href="'tel:' + settings?.data.contact_telephone">{{
                  settings?.data.contact_telephone
                }}</a>
              </div>
              <div class="bx-contact-item location">{{ settings?.data.address }}</div>
            </div>
          </div>
        </div>

        <div class="bx-menu-item cta">
          <ContactButton
            class="bx-contact-button"
            v-if="settings?.data.cta_button"
            :link="settings?.data.cta_button"
            :contact_name="settings?.data.contact_name"
            :contact_image="settings?.data.menu_image?.url"
          ></ContactButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.burgerMenu-enter-active,
.burgerMenu-leave-active {
  transition: all .5s ease-in-out;
}

// Transition enter
.burgerMenu-enter-from {
  opacity: 0;

  &.bx-burger-menu-container {
    .bx-image-container {
      clip-path: inset(0% 0% 100%);
    }

    .bx-menu-container {
      clip-path: inset(100% 0% 0%);
    }
  }
}

// Transition Target
.burgerMenu-enter-to,
.burgerMenu-leave-from {
  opacity: 1;

  &.bx-burger-menu-container {
    .bx-image-container {
      clip-path: inset(0% 0% 0%);
    }

    .bx-menu-container {
      clip-path: inset(0% 0% 0%);
    }
  }
}

// Transition leave
.burgerMenu-leave-to {
  opacity: 0;

  &.bx-burger-menu-container {
    .bx-image-container {
      clip-path: inset(100% 0% 0%);
    }

    .bx-menu-container {
      clip-path: inset(0% 0% 100%);
    }
  }
}

.bx-burger-menu-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  z-index: 999;
  color: #fff;

  align-items: flex-start;
  justify-content: center;
  text-align: left;
  box-sizing: border-box;

  @media (max-width: $mobileBreakpoint) {
    flex-direction: column;
  }

  .bx-image-container {
    width: 50%;
    display: flex;
    justify-content: center;
    flex: 0 0 50%;
    position: relative;
    height: 100%;
    clip-path: inset(0% 0% 0%);
    transition: clip-path .5s ease-in-out;

    @media (max-width: $mobileBreakpoint) {
      // flex: none;
      // width: 100%;
      // height: 300px;
      display: none;
    }

    :deep(img) {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .bx-menu-container {
    width: 100%;
    max-width: $boxedWidth;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    backdrop-filter: blur(20px);
    background-color: rgba(#060918, 0.95);
    clip-path: inset(0% 0% 0%);
    transition: clip-path .5s ease-in-out;

    .bx-centered {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
      margin: auto auto 0;
      width: 85%;
      padding: 120px 0 48px 0;

      @media (max-width: $mobileBreakpoint) {
        width: $relativeWidth;
        padding: 96px 0 0px 0;
        margin-bottom: auto;
        margin-top: 0;
        height: 100%;
        gap: 4px;
      }
    }

    .bx-overline {
      color: $secondaryColor;
      font-size: 12px;
      margin-bottom: 6px;
      font-weight: 300;
      letter-spacing: 1px;
    }

    .bx-contact-information-container {
      margin-top: 28px;
      padding-top: 28px;
      width: 100%;

      @media (max-width: $mobileBreakpoint) {
        margin-top: auto;
        margin-bottom: 48px;
      }

      .bx-overline {
        margin-bottom: 16px;
      }

      .bx-contact-items-container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .bx-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;

          &:before {
            content: "";
            display: block;
            width: 24px;
            height: 24px;
            background-color: $secondaryColor;
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
          }

          &.email:before {
            mask-image: url("~/assets/media/email-icon.svg");
          }

          &.telephone:before {
            mask-image: url("~/assets/media/telephone-icon.svg");
          }

          &.location:before {
            mask-image: url("~/assets/media/location-icon.svg");
          }

          a {
            color: $whiteColor;
          }
        }
      }
    }

    .bx-menu-item {
      &:not(.has-button) {
        a {
          color: inherit;
          font-size: 32px;
          font-weight: 600;
          transition: all 0.3s ease-in-out;

          @media (max-width: $mobileBreakpoint) {
            font-size: 28px;
          }

          &.router-link-exact-active,
          &:hover {
            color: $secondaryColor;
          }
        }
      }

      &.cta {
        width: $relativeWidth;
        margin: 0 auto 36px;

        @media (min-width: $mobileBreakpoint) {
          display: none;
        }

        .bx-contact-button {
          :deep(.bx-button-container) {
            gap: 12px;

            .bx-contact-image {
              height: 58px;
              width: 58px;
            }

            .bx-text {
              font-size: 18px;
              margin-bottom: 6px;
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
